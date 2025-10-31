// src/components/StudentForm.tsx
"use client";

import { Student } from "@/types/student";
import Image from "next/image";

interface StudentFormProps {
  student: Student;
}

export default function StudentForm({ student }: StudentFormProps) {
  const formatName = (text: string) => {
    return text ? text.toUpperCase() : "-";
  };

  const formatRegular = (text: string) => {
    if (!text) return "-";

    // Capitalize Each Word untuk text biasa
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatEmpty = (text: string) => {
    return text || "-";
  };

  return (
    <div
      className="bg-white p-5 form-container"
      style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Kop Surat - Persis seperti PDF */}

      <div className="text-center mb-6 border-b-2 border-black pb-2">
        {/* Logo di samping */}
        <div className="flex justify-center items-start mb-2">
          <div className="flex items-center justify-center">
            {/* Logo */}
            <Image
              src="/logo-sdit.png"
              width={100}
              height={100}
              alt="Logo Al Bashirah"
              className="object-contain mr-20"
            />

            {/* Text kop surat */}
            <div className="text-center">
              <h2 className="text-sm font-bold tracking-wide mb-1 leading-tight">
                SEKOLAH DASAR ISLAM TERPADU (SDIT) TAHFIZHUL QUR&apos;AN
              </h2>
              <h1 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                AL BASHIIRAH
              </h1>
              <div className="text-xs leading-tight">
                Kampung Rawasari RT012/RW002, Desa Jomin Timur, Kecamatan
                Kotabaru
              </div>
              <div className="text-xs leading-tight">
                Kabupaten Karawang, Jawa Barat
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Judul Formulir */}
      <div className="text-center mb-6">
        <h3 className="text-sm font-bold underline mb-1">
          FORMULIR PENDAFTARAN SISWA BARU
        </h3>
        <h4 className="text-sm font-bold mb-1">
          SEKOLAH DASAR ISLAM TERPADU AL BASHIIRAH
        </h4>
        <p className="text-sm font-bold">TAHUN PELAJARAN 2026/2027</p>
      </div>

      {/* Section A: KETERANGAN SISWA */}
      <div className="mb-6">
        <h5 className="font-bold text-sm mb-3 border-b border-black pb-1">
          A. KETERANGAN SISWA :
        </h5>

        <div className="space-y-2 text-sm">
          {/* Baris 1-3 */}
          <div className="flex">
            <span className="w-6">1.</span>
            <span className="w-48 mr-4">NISN</span>
            <span className="flex-1 border-b border-black">
              : {formatEmpty(student.nisn)}
            </span>
          </div>
          <div className="flex">
            <span className="w-6">2.</span>
            <span className="w-48 mr-4">Nama Lengkap</span>
            <span className="flex-1 border-b border-black font-bold uppercase">
              : {formatName(student.namaLengkap)}
            </span>
          </div>

          <div className="flex">
            <span className="w-6">3.</span>
            <span className="w-48 mr-4">Nama Panggilan</span>
            <span className="flex-1 border-b border-black font-bold uppercase">
              : {formatName(student.namaPanggilan)}
            </span>
          </div>

          {/* Baris 4-5 */}
          <div className="flex">
            <span className="w-6">4.</span>
            <span className="w-48 mr-4">Nomor Induk Kependudukan (NIK)</span>
            <span className="flex-1 border-b border-black">
              : {formatEmpty(student.nik)}
            </span>
          </div>

          <div className="flex">
            <span className="w-6">5.</span>
            <span className="w-48 mr-4">Jenis Kelamin</span>
            <span className="flex-1 border-b border-black">
              : {formatRegular(student.jenisKelamin)}
            </span>
          </div>

          {/* Baris 5-6 */}
          <div className="flex">
            <span className="w-6">6.</span>
            <span className="w-48 mr-4">Tempat Lahir</span>
            <span className="flex-1 border-b border-black">
              : {formatRegular(student.tempatLahir)}
            </span>
          </div>

          <div className="flex">
            <span className="w-6">7.</span>
            <span className="w-48 mr-4">Tanggal Lahir</span>
            <span className="flex-1 border-b border-black">
              : {formatEmpty(student.tanggalLahir)}
            </span>
          </div>

          {/* Baris 7-8 */}
          <div className="flex">
            <span className="w-6">8.</span>
            <span className="w-48 mr-4">Kewarganegaraan</span>
            <span className="flex-1 border-b border-black">
              : {formatRegular(student.kewarganegaraan)}
            </span>
          </div>

          <div className="flex">
            <span className="w-6">9.</span>
            <span className="w-48 mr-4">Anak Nomor Ke</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.anakKe)}
            </span>
          </div>

          {/* Baris 9-11 */}
          <div className="flex">
            <span className="w-6">10.</span>
            <span className="w-48 mr-4">Banyak Saudara Kandung</span>
            <span className="flex-1 border-b border-black">
              : {formatRegular(student.saudaraKandung)}
            </span>
          </div>

          <div className="flex">
            <span className="w-6">11.</span>
            <span className="w-48 mr-4">Banyak Saudara Tiri</span>
            <span className="flex-1 border-b border-black">
              : {formatRegular(student.saudaraTiri)}
            </span>
          </div>

          <div className="flex">
            <span className="w-6">12.</span>
            <span className="w-48 mr-4">Banyak Saudara Angkat</span>
            <span className="flex-1 border-b border-black">
              : {formatRegular(student.saudaraAngkat)}
            </span>
          </div>

          {/* Baris 12-17 */}
          <div className="flex">
            <span className="w-6">13.</span>
            <span className="w-48 mr-4">Bahasa Sehari-hari</span>
            <span className="flex-1 border-b border-black">
              : {formatRegular(student.bahasa)}
            </span>
          </div>

          <div className="flex">
            <span className="w-6">14.</span>
            <span className="w-48 mr-4">Berat Badan</span>
            <span className="flex-1 border-b border-black">
              : {formatEmpty(student.beratBadan)} Kg
            </span>
          </div>

          <div className="flex">
            <span className="w-6">15.</span>
            <span className="w-48 mr-4">Tinggi Badan</span>
            <span className="flex-1 border-b border-black">
              : {formatEmpty(student.tinggiBadan)} Cm
            </span>
          </div>

          <div className="flex">
            <span className="w-6">16.</span>
            <span className="w-48 mr-4">Golongan Darah</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatName(student.golonganDarah)}
            </span>
          </div>

          <div className="flex">
            <span className="w-6">17.</span>
            <span className="w-48 mr-4">Penyakit Yang Pernah Diderita</span>
            <span className="flex-1 border-b border-black">
              : {formatRegular(student.penyakit)}
            </span>
          </div>

          <div className="flex">
            <span className="w-6">18.</span>
            <span className="w-48 mr-4">Alamat Lengkap</span>
            <span className="flex-1 border-b border-black">
              : {formatRegular(student.alamat)}, Desa{" "}
              {formatRegular(student.desaKelurahan)}, Kec.{" "}
              {formatRegular(student.kecamatan)}, Kab.{" "}
              {formatRegular(student.kabupatenKota)}, Prov.{" "}
              {formatRegular(student.provinsi)}
            </span>
          </div>

          {/* Baris 18-19 */}
          <div className="flex">
            <span className="w-6">19.</span>
            <span className="w-48 mr-4">Nomor Handphone/Telepon</span>
            <span className="flex-1 border-b border-black">
              : {formatEmpty(student.noTelepon)}
            </span>
          </div>

          <div className="flex">
            <span className="w-6">20.</span>
            <span className="w-48 mr-4">Bertempat Tinggal Pada</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.tinggalDengan)}
            </span>
          </div>
        </div>
      </div>

      {/* Section B: ORANGTUA/WALI */}
      <div className="mb-6">
        <h5 className="font-bold text-sm mb-3 border-b border-black pb-1">
          B. ORANGTUA/WALI :
        </h5>

        <div className="space-y-2 text-sm">
          {/* Data Ayah */}
          <div className="flex">
            <span className="w-8">20.</span>
            <span className="w-40 mr-4">Nama Ayah</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.namaAyah)}
            </span>
          </div>

          <div className="flex">
            <span className="w-8">21.</span>
            <span className="w-40 mr-4">Tanggal Lahir</span>
            <span className="flex-1 border-b border-black">
              : {formatEmpty(student.tglLahirAyah)}
            </span>
          </div>

          <div className="flex">
            <span className="w-8">22.</span>
            <span className="w-40 mr-4">Pendidikan Terakhir</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.pendidikanAyah)}
            </span>
          </div>

          <div className="flex">
            <span className="w-8">23.</span>
            <span className="w-40 mr-4">Pekerjaan Ayah</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.pekerjaanAyah)}
            </span>
          </div>

          {/* Data Ibu */}
          <div className="flex">
            <span className="w-8">24.</span>
            <span className="w-40 mr-4">Nama Ibu</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.namaIbu)}
            </span>
          </div>

          <div className="flex">
            <span className="w-8">25.</span>
            <span className="w-40 mr-4">Tanggal Lahir</span>
            <span className="flex-1 border-b border-black">
              : {formatEmpty(student.tglLahirIbu)}
            </span>
          </div>

          <div className="flex">
            <span className="w-8">26.</span>
            <span className="w-40 mr-4">Pendidikan Terakhir</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.pendidikanIbu)}
            </span>
          </div>

          <div className="flex">
            <span className="w-8">27.</span>
            <span className="w-40 mr-4">Pekerjaan Ibu</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.pekerjaanIbu)}
            </span>
          </div>

          {/* Data Wali */}
          <div className="flex">
            <span className="w-8">28.</span>
            <span className="w-40 mr-4">Nama Wali Siswa (Jika ada)</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.namaWali)}
            </span>
          </div>

          <div className="flex">
            <span className="w-8">29.</span>
            <span className="w-40 mr-4">Pendidikan Terakhir</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.pendidikanWali)}
            </span>
          </div>

          <div className="flex">
            <span className="w-8">30.</span>
            <span className="w-40 mr-4">Hubungan Terhadap Anak</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.hubunganDenganAnak)}
            </span>
          </div>

          <div className="flex">
            <span className="w-8">31.</span>
            <span className="w-40 mr-4">Pekerjaan/Jabatan</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.pekerjaanWali)}
            </span>
          </div>
        </div>
      </div>

      {/* Section C: ASAL MULA SISWA */}
      <div className="mb-8">
        <h5 className="font-bold text-sm mb-3 border-b border-black pb-1">
          C. ASAL MULA SISWA :
        </h5>

        <div className="space-y-2 text-sm">
          <div className="flex">
            <span className="w-8">32.</span>
            <span className="w-48 mr-4">Masuk Sekolah Ini Sebagai</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.sebagai)}
            </span>
          </div>

          <div className="flex">
            <span className="w-8">33.</span>
            <span className="w-48 mr-4">Asal Sekolah</span>
            <span className="flex-1 border-b border-black uppercase">
              : {formatRegular(student.asalSekolah)}
            </span>
          </div>

          <div className="flex">
            <span className="w-8">34.</span>
            <span className="w-48 mr-4">Tahun Lulus</span>
            <span className="flex-1 border-b border-black">
              : {formatEmpty(student.tahunLulus)}
            </span>
          </div>
        </div>
      </div>

      {/* Tanda Tangan & Footer */}
      <div className="mt-12 text-sm">
        <div className="flex justify-between mb-8">
          <div className="text-center">
            <div className="border-t border-black w-48 mx-auto mb-1"></div>
            <span>Diterima / Ditolak *</span>
          </div>

          <div className="text-center">
            <div className="border-t border-black w-48 mx-auto mb-1"></div>
            <span>Orang Tua / Wali *</span>
          </div>
        </div>

        <div className="text-center mb-4">
          <span>
            Alasan :
            ..........................................................................
          </span>
        </div>

        <div className="text-center">
          <div className="border-t border-black w-48 mx-auto mb-1"></div>
          <span>Kepala Sekolah</span>
          <div className="text-xs font-bold mt-1">
            Yudin Dindin Cahyudin, S.Pd.
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-xs text-gray-500">
        <p>Catatan :</p>
      </div>
    </div>
  );
}
