import ExperiencesManager from "@/src/components/admin/ExperiencesManager";

export const metadata = {
  title: "Experiences",
  robots: { index: false, follow: false },
};

export default function AdminExperiencesPage() {
  return <ExperiencesManager />;
}
