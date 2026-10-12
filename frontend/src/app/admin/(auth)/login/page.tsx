import { redirect } from "next/navigation";
import { UserService } from "@/src/service/user.service";
import LoginForm from "@/src/components/admin/LoginForm";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { data } = await UserService.getSession();
  const user = data?.user as
    | { role?: string; emailVerified?: boolean }
    | undefined;

  // Only an authenticated ADMIN bypasses the login page.
  if (user?.role === "ADMIN" && user?.emailVerified) {
    redirect("/admin");
  }

  const params = await searchParams;
  const initialError =
    params.error === "forbidden"
      ? "Your account does not have admin access."
      : undefined;

  return <LoginForm initialError={initialError} />;
}
