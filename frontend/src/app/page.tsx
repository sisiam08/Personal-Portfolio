import { EducationService } from "../service/education.service";
import { ProjectService } from "../service/project.service";
import { SkillService } from "../service/skill.service";
import { UserService } from "../service/user.service";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import EducationSection from "./components/EducationSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default async function Page() {
  const userRes = await UserService.getUserProfile();
  const skillRes = await SkillService.getSkills();
  const projectRes = await ProjectService.getProjects();
  const educationRes = await EducationService.getEducations();

  const user = userRes.data;
  const skills = skillRes.data;
  const projects = projectRes.data;
  const educations = educationRes.data;

  const projectCount =
    projects?.data?.data?.length ?? projects?.data?.length ?? 0;
  const skillCount = skills?.data?.length ?? 0;

  return (
    <>
      <Navbar />
      <main className="relative pt-15 px-margin-page max-w-container-max mx-auto">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-full h-screen overflow-hidden pointer-events-none">
          <div className="absolute top-10 -right-20 w-96 h-96 bg-primary-container/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-20 right-40 w-64 h-64 glass-panel rounded-3xl rotate-12 opacity-40"></div>
          <div className="absolute top-60 right-10 w-48 h-48 glass-panel rounded-full -rotate-12 opacity-30"></div>
          <div className="absolute top-80 right-60 w-32 h-32 glass-panel rounded-lg rotate-45 opacity-50"></div>
          <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-secondary-container/10 blur-[120px] rounded-full"></div>
        </div>

        <HeroSection
          user={user?.data}
          projectCount={projectCount}
          skillCount={skillCount}
        />

        <ProjectsSection projects={projects} />

        <AboutSection user={user?.data} />

        <SkillsSection skills={skills?.data} />

        <EducationSection educations={educations?.data} />

        <ContactSection user={user?.data} />
      </main>
      <Footer user={user?.data} />
    </>
  );
}
