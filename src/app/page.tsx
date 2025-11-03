// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "next-auth/react";
import Image from "next/image";

// Type untuk data siswa (array of strings)
type StudentRow = string[];

export default function Home() {
  const { session, status } = useAuth();
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch("/api/students");
        const data = await response.json();

        console.log("📊 TOTAL DATA ROWS:", data.length);
        console.log("🎯 CONTOH DATA SISWA:", data[0]);

        if (data.length > 0) {
          // Skip row pertama (header Google Forms), pakai custom headers
          const customHeaders = [
            "No",
            "Nama Lengkap",
            "Nama Panggilan",
            "Jenis Kelamin",
            "Asal Sekolah",
            "No Telepon",
            "Tanggal Daftar",
            "Aksi",
          ];

          setHeaders(customHeaders);

          // Data dimulai dari row 1 (skip header Google Forms) dengan safe mapping
          const studentsData = data
            // .slice(1)
            // .filter((row: StudentRow) => row && row.length > 0) // Filter baris yang kosong
            .map((row: StudentRow, index: number) => {
              return [
                (index + 1).toString(), // No
                row[4] || "", // Nama Lengkap
                row[5] || "", // Nama Panggilan
                row[7] || "", // Jenis Kelamin
                row[42] || "", // Asal Sekolah
                row[25] || "", // No Telepon
                row[0] || "", // Timestamp (Tanggal Daftar)
                "Detail", // Aksi
              ];
            });

          setStudents(studentsData);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  // Filter students berdasarkan search term
  const filteredStudents = students.filter(
    (student: StudentRow) =>
      (student[1]?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || // Nama Lengkap
      (student[2]?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || // Nama Panggilan
      (student[4]?.toLowerCase() || "").includes(searchTerm.toLowerCase()) // Asal Sekolah
  );

  // Redirect ke login jika belum authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect via useAuth hook
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data siswa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header dengan logout */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/logo-sdit.png"
                alt="Logo Al Bashirah"
                width={32}
                height={32}
                className="mr-3"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  PSB SDIT Al Bashiirah
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

      {/* Konten utama */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Calon Siswa
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {students.length}
                </dd>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Ditampilkan
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {filteredStudents.length}
                </dd>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Tahun Ajaran
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  2026/2027
                </dd>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari berdasarkan nama atau asal sekolah..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Tabel Siswa */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {row.map((cell: string, cellIndex: number) => (
                        <td
                          key={cellIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {cellIndex === 1 ? ( // Kolom Nama Lengkap
                            <a
                              href={`/students/${rowIndex}`}
                              className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                              {cell || "-"}
                            </a>
                          ) : cellIndex === 7 ? ( // Kolom Aksi
                            <a
                              href={`/students/${rowIndex}`}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              Lihat Detail
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

            {/* Empty State */}
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Tidak ada data
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm
                    ? "Coba ubah kata kunci pencarian"
                    : "Belum ada data calon siswa"}
                </p>
              </div>
            )}
          </div>

          {/* Info Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              SDIT Al Bashiirah - Tahun Pelajaran 2026/2027
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
