"use server";

import { MessageService } from "../service/message.service";

export const createMessage = async (formData: any) => {
  const { data, error } = await MessageService.createMessage(formData);

  if (error) {
    return { error: error.message };
  }
  return { data };
};
