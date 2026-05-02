"use client";

import { useState } from "react";

interface Project {
  id: string | number;
  title: string;
  slug?: string;
  description: string;
  problem?: string;
  solution?: string;
  challenges?: string;
  futurePlan?: string;
  githubUrl?: string;
  liveUrl?: string;
  status?: string;
  image: string;
  skills?: any[]; // Replaced technologies with skills based on the Prisma schema
  [key: string]: any;
}

interface ProjectShowcaseProps {
  projects: Project[];
}

export default function ProjectShowcase({ projects = [] }: ProjectShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Fallback to ensure projects is safely mapped
  const validProjects = Array.isArray(projects)
    ? projects
    : (projects as any)?.data?.data
      ? (projects as any).data.data
      : [];

  // Helper to extract skill name safely since we don't know the exact Skill object structure
  const getSkillName = (skill: any) => {
    if (typeof skill === 'string') return skill;
    return skill?.name || skill?.title || 'Unknown';
  };

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {validProjects.map((project: Project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="relative cursor-pointer rounded-2xl overflow-hidden glass-panel group hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <img
              src={project.image}
              className="w-full h-[240px] object-cover opacity-80 group-hover:opacity-100 transition duration-500 group-hover:scale-105"
              alt={project.title}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-4 left-5 right-5 z-10 flex flex-col justify-end">
              {project.status && (
                <span className="mb-2 w-max px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-[10px] text-primary font-bold uppercase tracking-wider backdrop-blur-md">
                  {project.status}
                </span>
              )}
              <h3 className="text-on-surface font-bold text-xl mb-1">{project.title}</h3>
              <p className="text-xs text-on-surface-variant line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Box */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-xl animate-fade-in"
            onClick={() => setSelectedProject(null)}
          />

          <div className="relative w-full max-w-5xl max-h-full rounded-3xl glass-panel-high overflow-hidden shadow-2xl shadow-indigo-500/10 animate-fade-in flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface hover:text-primary hover:bg-primary/5 z-50 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="overflow-y-auto no-scrollbar relative w-full h-full flex flex-col md:flex-row">
              
              {/* Left Column: Visuals & Core Info */}
              <div className="w-full md:w-5/12 bg-surface-container-high/80 flex flex-col">
                <div className="relative h-64 md:h-80 w-full shrink-0">
                  <img
                    src={selectedProject.image}
                    className="w-full h-full object-cover"
                    alt={selectedProject.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {selectedProject.status && (
                    <div className="absolute top-6 left-6 px-3 py-1 rounded-full glass-panel-high border-outline-variant/20 text-xs font-bold uppercase tracking-wider text-on-surface backdrop-blur-md shadow-lg">
                      {selectedProject.status}
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h2 className="font-h2 text-3xl text-on-surface mb-4 leading-tight">
                    {selectedProject.title}
                  </h2>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-8 flex-1">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-4 shrink-0">
                    <h4 className="text-xs font-label-caps text-primary tracking-widest uppercase">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.skills?.map((skill: any, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-xs text-on-surface-variant font-medium"
                        >
                          {getSkillName(skill)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-8 shrink-0">
                    {selectedProject.liveUrl && (
                      <a
                         href={selectedProject.liveUrl}
                         target="_blank"
                         rel="noreferrer"
                         className="flex-1 text-center py-3 rounded-full bg-white text-black font-bold text-sm hover:scale-[1.02] hover:bg-primary transition-all duration-300"
                      >
                         Live Preview
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                         href={selectedProject.githubUrl}
                         target="_blank"
                         rel="noreferrer"
                         className="flex-1 text-center py-3 rounded-full glass-panel text-on-surface font-bold text-sm hover:bg-primary/10 transition-colors"
                      >
                         Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: In-depth Details */}
              <div className="w-full md:w-7/12 p-6 md:p-10 lg:p-12 space-y-10">
                {selectedProject.problem && (
                  <div>
                    <h3 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-error">warning</span>
                      The Problem
                    </h3>
                    <div className="p-4 rounded-2xl bg-error/5 border border-error/10">
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        {selectedProject.problem}
                      </p>
                    </div>
                  </div>
                )}

                {selectedProject.solution && (
                  <div>
                    <h3 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">emoji_objects</span>
                      The Solution
                    </h3>
                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>
                  </div>
                )}

                {selectedProject.challenges && (
                  <div>
                    <h3 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary">extension</span>
                      Key Challenges
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {selectedProject.challenges}
                    </p>
                  </div>
                )}

                {selectedProject.futurePlan && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary">rocket_launch</span>
                      Future Plan
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {selectedProject.futurePlan}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
