import { env } from "../env";
const API_URL = env.API_URL;

export const MessageService = {
  createMessage: async function (messageData: {
    name: string;
    email: string;
    message: string;
  }) {
    try {
      const res = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      const data = await res.json();

      if (data.data == null) {
        return {
          data: null,
          error: {
            message: "Message not created",
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
