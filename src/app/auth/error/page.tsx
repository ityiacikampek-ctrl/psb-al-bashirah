// src/app/auth/error/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

// Component utama yang pakai useSearchParams
function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/logo-sdit.png"
            alt="Logo Al Bashirah"
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            {error === "AccessDenied" ? "Akses Ditolak" : "Terjadi Kesalahan"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {error === "AccessDenied"
              ? "Email Anda tidak terdaftar sebagai operator sekolah."
              : "Terjadi kesalahan saat proses login."}
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            ← Kembali ke Login
          </Link>
        </div>

        <div className="text-center text-xs text-gray-500 mt-8">
          <p>Jika Anda adalah staf sekolah namun tidak bisa login,</p>
          <p>harap hubungi administrator sistem.</p>
        </div>
      </div>
    </div>
  );
}

// Loading component untuk suspense fallback
function ErrorLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Memuat...</p>
      </div>
    </div>
  );
}

// Main component dengan Suspense boundary
export default function AuthErrorPage() {
  return (
    <Suspense fallback={<ErrorLoading />}>
      <ErrorContent />
    </Suspense>
  );
}
