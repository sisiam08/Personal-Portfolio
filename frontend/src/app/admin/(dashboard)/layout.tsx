import { redirect } from "next/navigation";
import { UserService } from "@/src/service/user.service";
import AdminShell from "@/src/components/admin/AdminShell";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await UserService.getSession();
  const user = data?.user as
    | { name?: string; email?: string; role?: string; emailVerified?: boolean }
    | undefined;

  // Frontend gate only (UX); the backend remains the authority.
  if (!user || user.role !== "ADMIN" || !user.emailVerified) {
    redirect("/admin/login");
  }

  return (
    <AdminShell user={{ name: user.name, email: user.email }}>
      {children}
    </AdminShell>
  );
}
