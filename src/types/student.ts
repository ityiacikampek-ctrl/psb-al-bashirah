// src/types/student.ts
export interface Student {
  // Data Pribadi (sesuai Google Forms)
  timestamp: string;
  alamatEmail: string;
  namaLengkap: string;
  namaPanggilan: string;
  nik: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  kewarganegaraan: string;
  anakKe: string;
  saudaraKandung: string;
  saudaraTiri: string;
  saudaraAngkat: string;
  bahasa: string;
  beratBadan: string;
  tinggiBadan: string;
  golonganDarah: string;
  penyakit: string;
  alamat: string;
  noTelepon: string;
  tinggalDengan: string;

  // Data Orang Tua
  namaAyah: string;
  tglLahirAyah: string;
  pendidikanAyah: string;
  pekerjaanAyah: string;
  namaIbu: string;
  tglLahirIbu: string;
  pendidikanIbu: string;
  pekerjaanIbu: string;

  // Data Wali
  namaWali: string;
  pendidikanWali: string;
  hubunganDenganAnak: string;
  pekerjaanWali: string;

  // Asal Sekolah
  masukSebagai: string;
  asalSekolah: string;
  tahunLulus: string;
  noIjazah: string;
  noSkhun: string;

  // Informasi Tambahan
  prestasi: string;
  hobi: string;
  kebutuhanKhusus: string;
  informasiDari: string;

  // Dokumen
  foto: string;
  aktaKelahiran: string;
  kartuKeluarga: string;
  ktpOrtu: string;
  ijazah: string;
  skhun: string;

  // Administrasi
  noPendaftaran: string;
  tanggalDaftar: string;
  status: string;

  // Field tambahan untuk extensibility
  [key: string]: string;
}
