import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

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

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient();
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (id) {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (user !== null) {
      return new Response(
        JSON.stringify({ id: user.id, email: user.email, name: user.name }),
        {
          status: 200,
        }
      );
    }
  }

  return new Response("Not found", {
    status: 404,
  });
}
