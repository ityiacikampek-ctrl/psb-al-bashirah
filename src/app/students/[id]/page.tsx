// src/app/students/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import StudentForm from "@/components/StudentForm";
import { Student } from "@/types/student";

export default function StudentDetail() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await fetch("/api/students");
        const allStudents = await response.json();

        console.log("📊 TOTAL DATA DI API:", allStudents.length);
        console.log("🎯 PARAMS ID:", params.id);

        if (allStudents.length > 0) {
          const studentIndex = Number(params.id);

          // Validasi: pastikan index valid
          // Sekarang tidak perlu +1 karena tidak ada header
          if (
            isNaN(studentIndex) ||
            studentIndex < 0 ||
            studentIndex >= allStudents.length
          ) {
            setError(
              `Data siswa tidak ditemukan. Index: ${studentIndex}, Total data: ${allStudents.length}`
            );
            setLoading(false);
            return;
          }

          const studentData = allStudents[studentIndex]; // Langsung ambil, tidak perlu +1

          // Validasi: pastikan studentData ada dan merupakan array
          if (!studentData || !Array.isArray(studentData)) {
            setError("Data siswa tidak valid");
            setLoading(false);
            return;
          }

          console.log("🎯 DATA YANG DIPROSES:", studentData);

          // Safe mapping dengan default values - SESUAI STRUCTUR DATA BARU
          const studentObj: Student = {
            // Data Pribadi - SESUAI DATA CONTOH
            timestamp: studentData[0] || "",
            alamatEmail: studentData[1] || "",
            namaLengkap: studentData[4] || "", // Index 4: "ADRIAN GIBRAN EVANO"
            namaPanggilan: studentData[5] || "", // Index 5: "Evano"
            nik: studentData[6] || "", // Index 6: "3215250801200003"
            jenisKelamin: studentData[7] || "", // Index 7: "Laki-laki(Ikhwan)"
            tempatLahir: studentData[8] || "", // Index 8: "Bekasi"
            tanggalLahir: studentData[9] || "", // Index 9: "08/01/2020"
            kewarganegaraan: studentData[10] || "", // Index 10: "WNI (Warga Negara Indonesia)"
            anakKe: studentData[11] || "", // Index 11: "Satu"
            saudaraKandung: studentData[12] || "", // Index 12: "2"
            saudaraTiri: studentData[13] || "", // Index 13: ""
            saudaraAngkat: studentData[14] || "", // Index 14: ""
            bahasa: studentData[15] || "", // Index 15: "Indonesia"
            beratBadan: studentData[16] || "", // Index 16: "18"
            tinggiBadan: studentData[17] || "", // Index 17: "119"
            golonganDarah: studentData[18] || "", // Index 18: "O"
            penyakit: studentData[19] || "", // Index 19: "Pneumonia (history kejang kalau demam)"
            alamat: studentData[20] || "", // Index 20: "perumahan buana kota baru raya blok C7 no.7"
            noTelepon: studentData[25] || "", // Index 25: "087870004761"
            tinggalDengan: studentData[26] || "", // Index 26: "Orang Tua"

            // Data Orang Tua
            namaAyah: studentData[27] || "", // Index 27: "Adnan muslimin"
            tglLahirAyah: studentData[28] || "", // Index 28: "02/06/1992"
            pendidikanAyah: studentData[29] || "", // Index 29: "Karyawan swasta"
            pekerjaanAyah: studentData[30] || "", // Index 30: "SMA/Sederajat"
            namaIbu: studentData[31] || "", // Index 31: "Diah mutiara azebfani"
            tglLahirIbu: studentData[32] || "", // Index 32: "01/09/1997"
            pendidikanIbu: studentData[33] || "", // Index 33: "Ibu rumah tangga"
            pekerjaanIbu: studentData[34] || "", // Index 34: "SMA/Sederajat"

            // Data Wali
            namaWali: studentData[35] || "", // Index 35: "SELANJUTNYA"
            pendidikanWali: studentData[36] || "", // Index 36: ""
            hubunganDenganAnak: studentData[37] || "", // Index 37: ""
            pekerjaanWali: studentData[38] || "", // Index 38: ""

            // Asal Sekolah
            masukSebagai: studentData[41] || "", // Index 41: "Siswa Baru Tingkat 1"
            asalSekolah: studentData[42] || "", // Index 42: "RA AL IKRAM"
            tahunLulus: studentData[47] || "", // Index 47: "2026"
            noIjazah: studentData[43] || "", // Index 43: "Rp. 300.000,-"
            noSkhun: studentData[44] || "", // Index 44: "https://drive.google.com/..."

            // Informasi Tambahan
            prestasi: studentData[45] || "", // Index 45: "https://drive.google.com/..."
            hobi: studentData[46] || "", // Index 46: "Sudah download"
            kebutuhanKhusus: studentData[39] || "", // Index 39: ""
            informasiDari: studentData[40] || "", // Index 40: ""

            // Dokumen
            foto: studentData[2] || "", // Index 2: "3209090340"?
            aktaKelahiran: studentData[3] || "", // Index 3: "SDIT2627-26"?
            kartuKeluarga: studentData[21] || "", // Index 21: "Pangulah selatan"
            ktpOrtu: studentData[22] || "", // Index 22: "Kotabaru"
            ijazah: studentData[23] || "", // Index 23: "Karawang"
            skhun: studentData[24] || "", // Index 24: "Jawa Barat"

            // Administrasi
            noPendaftaran: studentData[2] || "", // Index 2: "3209090340"?
            tanggalDaftar: studentData[0] || "", // Index 0: timestamp
            status: "Calon Siswa",
          };

          setStudent(studentObj);
          console.log("✅ DATA SISWA BERHASIL DIPROSES");
        } else {
          setError("Tidak ada data siswa");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Terjadi kesalahan saat memuat data");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchStudent();
    }
  }, [params.id]);

  // ... (kode loading, error, dan return tetap sama)
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <div className="text-red-600 text-lg font-semibold mb-2">
              ⚠️ {error}
            </div>
            <p className="text-gray-600 mb-4">
              Data siswa tidak dapat dimuat. Pastikan data tersedia di
              spreadsheet.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
              Kembali ke Daftar Siswa
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Data siswa tidak ditemukan</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
            Kembali ke Daftar Siswa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Tombol Action - Sembunyi saat print */}
      <div className="max-w-4xl mx-auto no-print">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {student.namaLengkap?.toUpperCase() || ""}
              </h1>
              <p className="text-gray-600">Detail Calon Siswa</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/")}
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
            margin: 20mm 0mm 15mm 0mm; /* atas, kanan, bawah, kiri */
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
