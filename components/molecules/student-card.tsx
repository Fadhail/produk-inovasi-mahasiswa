
import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLink, ZoomIn, FileText, Github, Globe } from "lucide-react";
import type { StudentProject } from "@/lib/student-data";

interface StudentCardProps {
  project: StudentProject;
  onOpenModal: (project: StudentProject) => void;
  onDesignDocClick: (e: React.MouseEvent) => void;
}

export default function StudentCard({ project, onOpenModal, onDesignDocClick }: StudentCardProps) {
  return (
    <Card
      key={project.id}
      className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => onOpenModal(project)}
    >
      <div className="relative overflow-hidden bg-gray-50">
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
          <Button
            variant="outline"
            className="w-full font-medium py-2.5 px-4 rounded-lg border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 bg-transparent"
            onClick={onDesignDocClick}
          >
            <FileText className="h-4 w-4 mr-2" />
            Dokumen Desain
          </Button>
          <div className="grid grid-cols-1 gap-3">
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
  );
}
