import type React from "react";
import Image from "next/image";
import StudentGallery from "@/components/organisms/student-gallery";

export default function ModernStudentGallery() {
  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      <section className="relative bg-gradient-to-br from-indigo-700 via-blue-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative container mx-auto px-6 py-10 md:py-14 text-center">
            <div className="flex justify-center mb-12">
            <Image
              src="/images/gateway.png"
              alt="IRC Gateway"
              width={900}
              height={360}
              className="h-32 md:h-40 w-auto object-contain drop-shadow-lg"
              priority
            />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Galeri Produk Inovasi 
            <span
              className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent"
            >
              Informatika Sekolah Vokasi ULBI
            </span>
            </h1>

          <p className="text-xl mb-16 md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            Karya-karya rintisan kreatif Mahasiswa Teknik Informatika.
          </p>
        </div>
      </section>

      <StudentGallery />

      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg font-light">Copyright IRC 2025 - All Right Reserved</p>
        </div>
      </footer>
    </div>
  );
}