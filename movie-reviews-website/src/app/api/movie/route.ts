import prisma from "@/dbContext";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id")?.toString();
  const { userId } = auth();

  const movieData = await prisma.movie.findFirst({
    where: {
      id: parseInt(id as string),
    },
    include: {
      reviews: {
        where: { authorId: userId as string },
        select: {
          text: true,
          summarization: true,
          sentiment: true,
          positiveProbability: true,
        },
      },
    },
  });
  return new Response(JSON.stringify(movieData));
}
