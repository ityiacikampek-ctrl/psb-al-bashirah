// src/app/api/students/route.ts
import { getStudents } from "@/lib/google-sheets";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await getStudents();
    return NextResponse.json(students);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
