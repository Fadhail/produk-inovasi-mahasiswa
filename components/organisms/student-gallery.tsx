
"use client";

import type React from "react";
import { useState } from "react";
import { studentProjects, type StudentProject } from "@/lib/student-data";
import StudentCard from "@/components/molecules/student-card";
import ImageModal from "@/components/image-modal";
import Swal from "sweetalert2";

export default function StudentGallery() {
  const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;
  const totalPages = Math.ceil(studentProjects.length / cardsPerPage);
  const paginatedProjects = studentProjects.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const openModal = (project: StudentProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleDesignDocClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    Swal.fire({
      title: "Dokumen Desain",
      text: "Dokumen dalam proses submit",
      icon: "info",
      confirmButtonText: "OK",
      confirmButtonColor: "#3b82f6",
      customClass: {
        popup: "rounded-2xl",
        title: "text-xl font-bold",
        confirmButton: "rounded-lg px-6 py-2",
      },
    });
  };

  return (
    <>
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedProjects.map((project) => (
            <StudentCard
              key={project.id}
              project={project}
              onOpenModal={openModal}
              onDesignDocClick={handleDesignDocClick}
            />
          ))}
        </div>
        <div className="flex justify-center mt-12 gap-2">
          <button
            className="px-4 py-2 rounded-lg border bg-white text-gray-700 font-semibold disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg border font-semibold mx-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 rounded-lg border bg-white text-gray-700 font-semibold disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div className="mt-24 text-center">
          <div className="inline-flex items-center justify-center bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {studentProjects.length}
              </div>
              <div className="text-gray-600 text-lg font-medium">Produk Inovasi Dipublikasikan</div>
            </div>
          </div>
        </div>
      </section>
      {selectedProject && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={selectedProject.thumbnail}
          imageAlt={`Website ${selectedProject.name} - ${selectedProject.project}`}
        />
      )}
    </>
  );
}
