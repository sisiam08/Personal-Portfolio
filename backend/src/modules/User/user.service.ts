import { UserUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const getMyProfile = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id }
  });
  return result;
};

const updateMyProfile = async (id: string, payload: UserUpdateInput) => {
  const result = await prisma.user.update({
    where: { id },
    data: payload
  });
  return result;
};

export const UserService = {
  getMyProfile,
  updateMyProfile
};
