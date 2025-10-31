// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// List email yang diizinkan login
const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email && allowedEmails.includes(user.email)) {
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = "operator"; // Default role
        // Bisa ditambahkan logic untuk superuser berdasarkan email
        if (user.email === "admin@albashirah.sch.id") {
          token.role = "superuser";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
