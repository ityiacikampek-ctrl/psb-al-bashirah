// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "next-auth/react";
import { stat } from "fs";
import Image from "next/image";

interface StudentData {
  [key: string]: string;
}

export default function Home() {
  const { session, status } = useAuth();
  const [students, setStudents] = useState<StudentData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch("/api/students");
        const data = await response.json();

        if (data.length > 0) {
          setHeaders(Object.keys(data[0])); // Ambil nama kolom dari objek pertama
          setStudents(data); // Simpan seluruh array siswa
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data siswa...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header dengan logout */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/logo-sdit.png"
                width={40}
                height={40}
                alt="Logo"
                className="h-8 w-8 mr-3"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  PSB Al Bashirah
                </h1>
                <p className="text-sm text-gray-600">
                  Selamat datang, {session.user?.name}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Keluar
            </button>
          </div>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Data Calon Siswa - SDIT Al Bashirah
          </h1>
          <p className="text-gray-600 mb-6">Tahun Pelajaran 2026/2027</p>
          {/* <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="py-3 px-4 border-b text-sm text-gray-600">
                        {cellIndex === 4 ? (
                          <a
                            href={`/students/${rowIndex}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                            {cell || "-"}
                          </a>
                        ) : (
                          cell || "-"
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  {headers.map((header: string, index: number) => (
                    <th
                      key={index}
                      className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="py-3 px-4 border-b text-sm text-gray-600">
                        {cellIndex === 4 ? (
                          <a
                            href={`/students/${rowIndex}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                            {cell || "-"}
                          </a>
                        ) : (
                          cell || "-"
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 font-medium">
              Total Data: <span className="font-bold">{students.length}</span>{" "}
              calon siswa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
