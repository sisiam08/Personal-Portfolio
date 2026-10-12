import ProfileManager from "@/src/components/admin/ProfileManager";

export const metadata = {
  title: "Profile",
  robots: { index: false, follow: false },
};

export default function AdminProfilePage() {
  return <ProfileManager />;
}
