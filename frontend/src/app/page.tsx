import type { Metadata } from "next";
import { cache } from "react";
import { TriangleAlert } from "lucide-react";
import { UserService } from "../service/user.service";
import { SkillService } from "../service/skill.service";
import { ProjectService } from "../service/project.service";
import { EducationService } from "../service/education.service";
import { ExperienceService } from "../service/experience.service";
import Navbar from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import AboutSection from "./_components/AboutSection";
import TechTree from "./_components/TechTree";
import ProjectsStack from "./_components/ProjectsStack";
import ExperienceSection from "./_components/ExperienceSection";
import EducationSection from "./_components/EducationSection";
import ContactSection from "./_components/ContactSection";
import Footer from "./_components/Footer";
import type {
  Education,
  Experience,
  ProfileUser,
  Project,
  Skill,
} from "./_components/types";

const getUserProfile = cache(() => UserService.getUserProfile());

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getUserProfile();
  const user = data?.data as ProfileUser | undefined;
  return {
    title: "Shahariar Siam",
    description:
      user?.bio ||
      "Full-stack developer building fast, scalable products end to end.",
  };
}

export default async function Page() {
  const [userRes, skillRes, projectRes, educationRes, experienceRes] =
    await Promise.all([
      getUserProfile(),
      SkillService.getSkills(),
      ProjectService.getProjects(),
      EducationService.getEducations(),
      ExperienceService.getExperiences(),
    ]);

  const user = (userRes.data?.data as ProfileUser) ?? null;
  const skills = (skillRes.data?.data as Skill[]) ?? [];
  const projectPayload = projectRes.data?.data as
    | { meta?: { total?: number }; data?: Project[] }
    | undefined;
  const projects = projectPayload?.data ?? [];
  const educations = (educationRes.data?.data as Education[]) ?? [];
  const experiences = (experienceRes.data?.data as Experience[]) ?? [];

  const projectCount = projectPayload?.meta?.total ?? projects.length;
  const skillCount = skills.length;

  const hasError = Boolean(
    userRes.error ||
      skillRes.error ||
      projectRes.error ||
      educationRes.error ||
      experienceRes.error,
  );

  return (
    <>
      <Navbar resumeUrl={user?.resumeUrl} />
      <main className="relative z-10">
        {hasError ? (
          <div className="mx-auto mt-24 flex w-full max-w-(--container-page) items-center gap-3 rounded-2xl border border-line bg-surface/60 px-5 py-4 text-sm text-muted">
            <TriangleAlert className="h-4 w-4 shrink-0 text-accent-2" />
            Some content couldn&apos;t be loaded right now. Sections below may be
            temporarily empty.
          </div>
        ) : null}

        <HeroSection
          user={user}
          skills={skills}
          projectCount={projectCount}
          skillCount={skillCount}
        />
        <ProjectsStack projects={projects} />
        <TechTree skills={skills} />
        <ExperienceSection experiences={experiences} />
        <EducationSection educations={educations} />
        <AboutSection user={user} />
        <ContactSection user={user} />
      </main>
      <Footer user={user} />
    </>
  );
}
