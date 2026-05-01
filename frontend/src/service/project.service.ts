import { env } from "../env";
const API_URL = env.API_URL;

export const ProjectService = {
  getProjects: async function () {
    try {
      const res = await fetch(`${API_URL}/projects`);

      const data = await res.json();

      if (data.data == null) {
        return {
          data: null,
          error: {
            message: "Projects not found",
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
