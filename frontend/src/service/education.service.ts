import { env } from "../env";

const API_URL = env.API_URL;

export const EducationService = {
  getEducations: async function () {
    try {
      const res = await fetch(`${API_URL}/educations`, { cache: "force-cache" });

      const data = await res.json();

      if (data.data == null) {
        return {
          data: null,
          error: {
            message: "Education not found",
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
