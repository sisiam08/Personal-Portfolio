import EducationsManager from "@/src/components/admin/EducationsManager";

export const metadata = {
  title: "Educations",
  robots: { index: false, follow: false },
};

export default function AdminEducationsPage() {
  return <EducationsManager />;
}
