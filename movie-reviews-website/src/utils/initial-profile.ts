import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs";

export const initialProfile = async () => {
  const user = await currentUser();
  const prisma = new PrismaClient();

  if (!user) {
    return null;
  }

  const profile = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newUser = await prisma.user.create({
    data: {
      id: user.id,
      name: user.firstName || "",
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};
