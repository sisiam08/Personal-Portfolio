import ProjectsManager from "@/src/components/admin/ProjectsManager";

export const metadata = {
  title: "Projects",
  robots: { index: false, follow: false },
};

export default function AdminProjectsPage() {
  return <ProjectsManager />;
}
