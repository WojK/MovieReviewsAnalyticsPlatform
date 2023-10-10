import { PrismaClient } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const prisma = new PrismaClient();
  try {
    await prisma.user.create({
      data: {
        id: body.id,
        name: body.name,
        email: body.email,
      },
    });

    return new Response("Added user", {
      status: 200,
    });
  } catch {
    return new Response("Cannot add new user with given properties", {
      status: 400,
    });
  }
}
