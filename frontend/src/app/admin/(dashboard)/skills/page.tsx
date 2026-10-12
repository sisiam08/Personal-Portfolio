import SkillsManager from "@/src/components/admin/SkillsManager";

export const metadata = {
  title: "Skills",
  robots: { index: false, follow: false },
};

export default function AdminSkillsPage() {
  return <SkillsManager />;
}
