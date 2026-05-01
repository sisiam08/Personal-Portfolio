import { cookies } from "next/headers";
import { env } from "../env";
const AUTH_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`;
const API_URL = env.API_URL;

export const UserService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session == null) {
        return {
          data: null,
          error: {
            message: "Session is null",
          },
        };
      }

      return {
        data: session,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: "Something went wrong!",
        },
      };
    }
  },

  getUserProfile: async function () {
    try {
      const res = await fetch(`${API_URL}/users/me`);

      const data = await res.json();

      if (data.data == null) {
        return {
          data: null,
          error: {
            message: "User not found",
          },
        };
      }

      return {
        data: data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: "Something went wrong!",
        },
      };
    }
  },
};
