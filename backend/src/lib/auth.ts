import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { UserRole } from "../generated/prisma/enums";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.APP_URL!,
  trustedOrigins: [process.env.APP_URL!, process.env.BETTER_AUTH_URL!],
  advanced: {
    useSecureCookies: true,
    defaultCookieAttributes: {
      secure: true,
      sameSite: "lax",
      httpOnly: true,
      path: "/",
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.ADMIN,
      },
      designation: {
        type: "string",
        required: true,
      },
      bio: {
        type: "string",
        required: true,
      },
      about: {
        type: "string",
        required: true,
      },
      phone: {
        type: "string",
        required: false,
      },
      whatsapp: {
        type: "string",
        required: false,
      },
      github: {
        type: "string",
        required: false,
      },
      linkedin: {
        type: "string",
        required: false,
      },
      x: {
        type: "string",
        required: false,
      },
      resumeUrl: {
        type: "string",
        required: true,
      },
    },
  },
});