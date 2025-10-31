// src/app/students/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import StudentForm from "@/components/StudentForm";
import { Student } from "@/types/student";

export default function StudentDetail() {
  const params = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await fetch("/api/students");
        const allStudents = await response.json();

        if (allStudents.length > 1) {
          const headers = allStudents[0];
          const studentData = allStudents[Number(params.id) + 1];

          // Mapping data dari Google Sheets ke interface Student
          // Dalam useEffect fetchStudent, ganti mapping dengan ini:
          const studentObj: Student = {
            // Data Pribadi
            timestamp: studentData[0] || "",
            alamatEmail: studentData[1] || "",
            namaLengkap: studentData[2] || "",
            namaPanggilan: studentData[3] || "",
            nik: studentData[4] || "",
            jenisKelamin: studentData[5] || "",
            tempatLahir: studentData[6] || "",
            tanggalLahir: studentData[7] || "",
            kewarganegaraan: studentData[8] || "",
            anakKe: studentData[9] || "",
            saudaraKandung: studentData[10] || "",
            saudaraTiri: studentData[11] || "",
            saudaraAngkat: studentData[12] || "",
            bahasa: studentData[13] || "",
            beratBadan: studentData[14] || "",
            tinggiBadan: studentData[15] || "",
            golonganDarah: studentData[16] || "",
            penyakit: studentData[17] || "",
            alamat: studentData[18] || "",
            noTelepon: studentData[19] || "",
            tinggalDengan: studentData[20] || "",

            // Data Orang Tua
            namaAyah: studentData[21] || "",
            tglLahirAyah: studentData[22] || "",
            pendidikanAyah: studentData[23] || "",
            pekerjaanAyah: studentData[24] || "",
            namaIbu: studentData[25] || "",
            tglLahirIbu: studentData[26] || "",
            pendidikanIbu: studentData[27] || "",
            pekerjaanIbu: studentData[28] || "",

            // Data Wali
            namaWali: studentData[29] || "",
            pendidikanWali: studentData[30] || "",
            hubunganDenganAnak: studentData[31] || "",
            pekerjaanWali: studentData[32] || "",

            // Asal Sekolah
            masukSebagai: studentData[33] || "",
            asalSekolah: studentData[34] || "",
            tahunLulus: studentData[35] || "",
            noIjazah: studentData[36] || "",
            noSkhun: studentData[37] || "",

            // Informasi Tambahan
            prestasi: studentData[38] || "",
            hobi: studentData[39] || "",
            kebutuhanKhusus: studentData[40] || "",
            informasiDari: studentData[41] || "",

            // Dokumen
            foto: studentData[42] || "",
            aktaKelahiran: studentData[43] || "",
            kartuKeluarga: studentData[44] || "",
            ktpOrtu: studentData[45] || "",
            ijazah: studentData[46] || "",
            skhun: studentData[47] || "",

            // Administrasi (jika ada kolom tambahan)
            noPendaftaran: studentData[48] || "",
            tanggalDaftar: studentData[49] || "",
            status: studentData[50] || "",
          };

          setStudent(studentObj);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, [params.id]);

  const formatForPDF = (text: string) => {
    return text.toUpperCase();
  };

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

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Data siswa tidak ditemukan</p>
        </div>
      </div>
    );
  }

  // Ganti bagian return dengan yang ini:
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Tombol Action - Sembunyi saat print */}
      <div className="max-w-4xl mx-auto no-print">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {formatForPDF(student.namaLengkap)}
              </h1>
              <p className="text-gray-600">Detail Calon Siswa</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => window.history.back()}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium">
                ← Kembali
              </button>
              <button
                onClick={() => window.print()}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                📄 Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Formulir - Tampil saat print dan screen */}
      <div className="max-w-4xl mx-auto">
        <StudentForm student={student} />
      </div>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page:first {
            size: A4;
            margin: 0mm 0mm 15mm 0mm; /* atas, kanan, bawah, kiri */
          }

          @page {
            size: A4;
            margin: 20mm 5mm 15mm 10mm; /* atas, kanan, bawah, kiri */
          }

          body {
            margin: 0;
            padding: 0;
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          /* Hanya tampilkan kontainer form */
          body * {
            visibility: hidden;
          }

          .form-container,
          .form-container * {
            visibility: visible;
          }

          .form-container {
            position: relative;
            width: 100%;
            margin: 0 auto;
            padding: 10mm;
            background: white !important;
            box-shadow: none !important;
            border: none !important;
            page-break-inside: avoid;
          }

          /* Hilangkan elemen non-print */
          .no-print,
          .no-print * {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
