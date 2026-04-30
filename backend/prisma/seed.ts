import config from "../src/config";
import { UserRole } from "../src/generated/prisma/enums";
import { prisma } from "../src/lib/prisma";

export async function seedAdmin() {
  try {
    // Check required admin config
    if (!config.admin.email || !config.admin.name || !config.admin.password) {
      console.warn(
        "Admin credentials not set in .env. Skipping admin creation.",
      );
      return;
    }

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: config.admin.email,
      },
    });

    if (existingAdmin) {
      console.log("✓ Admin user already exists");
      return;
    }

    const authUrl = `${config.betterAuth.betterAuthUrl}/api/auth/sign-up/email`;

    const signUpResponse = await fetch(authUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: config.appUrl || "http://localhost:3000",
      },
      body: JSON.stringify({
        name: config.admin.name,
        email: config.admin.email,
        password: config.admin.password,
        role: UserRole.ADMIN,
      }),
    });

    if (!signUpResponse.ok) {
      const errorText = await signUpResponse.text();
      console.error("API Error Response:", errorText);
      throw new Error(
        `Better-auth API failed with status ${signUpResponse.status}: ${errorText}`,
      );
    }

    // Mark email as verified and set role to ADMIN
    await prisma.user.update({
      where: {
        email: config.admin.email,
      },
      data: {
        emailVerified: true,
      },
    });

    console.log("Admin user created successfully");
  } catch (error: any) {
    console.error("Admin seeding error:", error.message || error);
    throw error;
  }
}

// Only run seed if this file is executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    await seedAdmin();
    process.exit(0);
  })().catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
}
