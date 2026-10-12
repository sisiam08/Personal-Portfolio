import DashboardView from "@/src/components/admin/DashboardView";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return <DashboardView />;
}
