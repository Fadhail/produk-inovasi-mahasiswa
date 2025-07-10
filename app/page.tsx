"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ExternalLink, ZoomIn, FileText, Github, Globe } from "lucide-react"
import ImageModal from "@/components/image-modal"
import Swal from "sweetalert2"

// Data mahasiswa dan website mereka (Data Asli)
const studentProjects = [
  // Students with deployed websites (prioritized)
  {
    id: 1,
    studentId: "714230001",
    name: "Viola Septianti Elsiana",
    project: "EmotiDiary",
    description: "Platform digital diary dengan analisis emosi untuk tracking mood harian",
    websiteUrl: "https://emotidiary.irc-enter.tech/",
    githubUrl: "https://github.com/violasptntels/EmotiDiary",
    thumbnail: "/images/Viola.jpeg",
    hasWebsite: true,
    hasCustomImage: true,
  },
  {
    id: 2,
    studentId: "714230027",
    name: "Muhamad Haekal Syukur",
    project: "TeamTune",
    description: "Aplikasi kolaborasi tim dengan fitur mood synchronization untuk produktivitas",
    websiteUrl: "https://teamtune.irc-enter.tech",
    githubUrl: "https://github.com/Haekalss/TeamTune",
    thumbnail: "/images/Haekal.jpg",
    hasWebsite: true,
    hasCustomImage: false,
  },
  {
    id: 3,
    studentId: "714230059",
    name: "Moch Restu Agis Burhanudin",
    project: "MoodTrack",
    description: "Sistem deteksi mood menggunakan kamera dengan teknologi computer vision",
    websiteUrl: "https://moodtrack.irc-enter.tech",
    githubUrl: "https://github.com/mrestuab/kamera_deteksi",
    thumbnail: "/images/Restu.PNG",
    hasWebsite: true,
    hasCustomImage: false,
  },
  {
    id: 4,
    studentId: "714230047",
    name: "Dina Oktafiani",
    project: "EmoTeam",
    description: "Platform sinkronisasi emosi tim untuk meningkatkan kolaborasi kerja",
    websiteUrl: "https://emoteamsync.irc-enter.tech/",
    githubUrl: "https://github.com/cinnong/EmoTeam_Sync",
    thumbnail: "/images/Dina.png",
    hasWebsite: true,
    hasCustomImage: false,
  },
  {
    id: 5,
    studentId: "714230062",
    name: "Rizqi Iqmal Fauzan",
    project: "Moodly",
    description: "Aplikasi mood tracker dengan interface yang user-friendly dan analytics",
    websiteUrl: "https://moodly.irc-enter.tech/index.html",
    githubUrl: "https://github.com/rizqiiqmal/Moodly",
    thumbnail: "/images/Iqmal.png",
    hasWebsite: true,
    hasCustomImage: false,
  },
  // Students with GitHub repositories
  {
    id: 6,
    studentId: "714230068",
    name: "Aqila Zafira",
    project: "CollabMood",
    description: "Platform kolaborasi dengan fitur mood-based team management",
    websiteUrl: "https://github.com/aqilazafira/collab_mood",
    githubUrl: "https://github.com/aqilazafira/collab_mood",
    thumbnail: "/images/Aqila.png",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 7,
    studentId: "714230065",
    name: "Dwi Puspa Firdaus",
    project: "Scrummood",
    description: "Aplikasi scrum management dengan integrasi mood tracking untuk tim agile",
    websiteUrl: "https://github.com/DwiFirdaus08/scrummood-fe",
    githubUrl: "https://github.com/DwiFirdaus08/scrummood-fe",
    thumbnail: "/images/Dwi.jpg",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 8,
    studentId: "714230051",
    name: "Indra Agustin",
    project: "MoodVis",
    description: "Sistem visualisasi mood dengan dashboard analytics yang komprehensif",
    websiteUrl: "https://github.com/indraagstin025/Moodvis-Mood_Visualization",
    githubUrl: "https://github.com/indraagstin025/Moodvis-Mood_Visualization",
    thumbnail: "/images/Indra.png",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 9,
    studentId: "714230064",
    name: "A.M. Faraziftan",
    project: "RoiyanApp",
    description: "Aplikasi mobile untuk tracking dan analisis mood dengan fitur AI",
    websiteUrl: "https://github.com/FARAZIFTAN/RoiyanApp",
    githubUrl: "https://github.com/FARAZIFTAN/RoiyanApp",
    thumbnail: "/images/Razif.png",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 10,
    studentId: "714230060",
    name: "Muhammad Ferdy Leoza",
    project: "TemanSuasana",
    description: "Platform social untuk berbagi dan tracking suasana hati bersama teman",
    websiteUrl: "https://github.com/ferdyleoza/TemanSuasana",
    githubUrl: "https://github.com/ferdyleoza/TemanSuasana",
    thumbnail: "/images/Ferdy.png",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 11,
    studentId: "714230069",
    name: "Aghni Hasna Mufida",
    project: "Well Check",
    description: "Aplikasi wellbeing check untuk monitoring kesehatan mental harian",
    websiteUrl: "https://github.com/aghniihsn/wellbeing-check.git",
    githubUrl: "https://github.com/aghniihsn/wellbeing-check.git",
    thumbnail: "/images/Aghni.png",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 12,
    studentId: "714230038",
    name: "Reyhan Dwiyan Nugraha",
    project: "CoEmotion",
    description: "Platform collaborative emotion sharing untuk team building",
    websiteUrl: "https://github.com/ReyhanDwiyan/NewRPL",
    githubUrl: "https://github.com/ReyhanDwiyan/NewRPL",
    thumbnail: "/images/Reyhan.png",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 13,
    studentId: "714230057",
    name: "Muhamad Hilmi Romadoni",
    project: "EmoSync",
    description: "Sistem sinkronisasi emosi real-time untuk komunikasi tim yang efektif",
    websiteUrl: "https://github.com/hilmibotak/EmoSync",
    githubUrl: "https://github.com/hilmibotak/EmoSync",
    thumbnail: "/images/Hilmi.png",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 14,
    studentId: "714230053",
    name: "Ahmad Lahay Mahendra",
    project: "Reflectify",
    description: "Platform refleksi diri dengan fitur journaling dan mood analytics",
    websiteUrl: "https://github.com/Mobius0263/Reflectify",
    githubUrl: "https://github.com/Mobius0263/Reflectify",
    thumbnail: "/images/Ahmad.png",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 15,
    studentId: "714230061",
    name: "Iqbal Herlambang",
    project: "CombatSense",
    description: "Aplikasi sensor emosi untuk gaming dan competitive environment",
    websiteUrl: "https://github.com/qibal/combatsense",
    githubUrl: "https://github.com/qibal/combatsense",
    thumbnail: "/images/Iqbal.png",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 16,
    studentId: "714230055",
    name: "Muhammad Hisyam Najwan",
    project: "Kolabempati",
    description: "Platform kolaborasi dengan empati menggunakan WebRTC dan Face API",
    websiteUrl: "https://github.com/HisyamSamAm/LiveKit-WebRTC-FaceApi",
    githubUrl: "https://github.com/HisyamSamAm/LiveKit-WebRTC-FaceApi",
    thumbnail: "/images/Hisyam.png",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 17,
    studentId: "714230056",
    name: "Raihan Aditya H",
    project: "Emobuddy",
    description: "Aplikasi companion untuk support emosional dan mental health",
    websiteUrl: "https://github.com/rrq-dev/RPL-II",
    githubUrl: "https://github.com/rrq-dev/RPL-II",
    thumbnail: "/images/Raihan.png",
    hasWebsite: false,
    hasCustomImage: false,
  },
  // Students without repositories (coming soon)
  {
    id: 18,
    studentId: "714230034",
    name: "Sarah Yohana",
    project: "Coming Soon",
    description: "Proyek sedang dalam tahap pengembangan",
    websiteUrl: "#",
    githubUrl: "#",
    thumbnail: "/images/Sarah.jpg",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 19,
    studentId: "714230044",
    name: "Mochammad Fadhail Fijratullah",
    project: "Coming Soon",
    description: "Proyek sedang dalam tahap pengembangan",
    websiteUrl: "#",
    githubUrl: "#",
    thumbnail: "/images/Fadhail.png",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 20,
    studentId: "714230070",
    name: "Muhammad Farid Al Mustofa",
    project: "Coming Soon",
    description: "Proyek sedang dalam tahap pengembangan",
    websiteUrl: "#",
    githubUrl: "#",
    thumbnail: "/images/Farid.jpg",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 21,
    studentId: "714230058",
    name: "Muhammad Okta Toriq Gunawan",
    project: "Coming Soon",
    description: "Proyek sedang dalam tahap pengembangan",
    websiteUrl: "#",
    githubUrl: "#",
    thumbnail: "/images/Octa.jpeg",
    hasWebsite: false,
    hasCustomImage: false,
  },
  {
    id: 22,
    studentId: "714230037",
    name: "Muhamad Saladin Eka Septian",
    project: "Coming Soon",
    description: "Proyek sedang dalam tahap pengembangan",
    websiteUrl: "#",
    githubUrl: "#",
    thumbnail: "/images/Eka.png",
    hasWebsite: false,
    hasCustomImage: false,
  },
]

export default function ModernStudentGallery() {
  const [selectedProject, setSelectedProject] = useState<(typeof studentProjects)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: (typeof studentProjects)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const handleDesignDocClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    Swal.fire({
      title: "Dokumen Desain",
      text: "Dokumen dalam proses submit",
      icon: "info",
      confirmButtonText: "OK",
      confirmButtonColor: "#3b82f6",
      customClass: {
        popup: "rounded-2xl",
        title: "text-xl font-bold",
        confirmButton: "rounded-lg px-6 py-2"
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative container mx-auto px-6 py-24 md:py-32 text-center">
          {/* IRC Gateway Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/gateway.png"
              alt="IRC Gateway"
              width={300}
              height={120}
              className="h-20 md:h-24 w-auto object-contain drop-shadow-lg"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Galeri Produk
            <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Inovasi Informatika
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            Karya-karya rintisan kreatif dari mahasiswa Teknik Informatika.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {studentProjects.map((project) => (
            <Card
              key={project.id}
              className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => openModal(project)}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden bg-gray-50">
                {/* A4 Portrait Layout for all thumbnails */}
                <div className="relative w-full" style={{ aspectRatio: "210 / 297" }}>
                  <Image
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={`Website ${project.name} - ${project.project}`}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <ZoomIn className="h-5 w-5 text-gray-700" />
                  </div>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {project.studentId}
                  </span>
                  {project.hasWebsite && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      Live Website
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {project.name}
                </h3>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">{project.project}</h4>
                <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>
              </CardContent>

              <CardFooter className="px-8 pb-8">
                <div className="w-full space-y-4">
                  {/* Design Document Button - Always first */}
                  <Button
                    variant="outline"
                    className="w-full font-medium py-2.5 px-4 rounded-lg border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 bg-transparent"
                    onClick={handleDesignDocClick}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Dokumen Desain
                  </Button>

                  {/* Repository and Website Buttons - Side by side */}
                  <div className="grid grid-cols-1 gap-3">
                    {/* GitHub Repository Button */}
                    {project.githubUrl !== "#" ? (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full font-medium py-2.5 px-4 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 bg-transparent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Github className="h-4 w-4" />
                          Repository Github
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        disabled
                        variant="outline"
                        className="w-full font-medium py-2.5 px-4 rounded-lg border-2 border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Repository Github
                      </Button>
                    )}

                    {/* Live Website Button - Only show for projects with live websites */}
                    {project.hasWebsite && project.websiteUrl !== "#" ? (
                      <Button
                        asChild
                        className="w-full font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group/button bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Globe className="h-4 w-4" />
                          Lihat Website
                          <ExternalLink className="h-3 w-3 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 transition-transform duration-300" />
                        </Link>
                      </Button>
                    ) : project.websiteUrl === "#" ? (
                      <Button
                        disabled
                        className="w-full bg-gray-300 text-gray-500 font-medium py-3 px-6 rounded-lg cursor-not-allowed"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Coming Soon
                      </Button>
                    ) : null}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg font-light">Copyright IRC 2025 - All Right Reserved</p>
        </div>
      </footer>

      {/* Image Modal */}
      {selectedProject && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={selectedProject.thumbnail}
          imageAlt={`Website ${selectedProject.name} - ${selectedProject.project}`}
        />
      )}
    </div>
  )
}
