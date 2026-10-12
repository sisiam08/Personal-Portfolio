"use server";

import { MessageService } from "../service/message.service";

export const createMessage = async (formData: {
  name: string;
  email: string;
  message: string;
}) => {
  const { data, error } = await MessageService.createMessage(formData);

  if (error) {
    return { error: error.message };
  }
  return { data };
};
