import prisma from "@/lib/prisma";
import { Card } from "@prisma/client";

export async function GET() {
  // Procurando cards no banco de dados
  const cards = await prisma.card.findMany({});
  return new Response(JSON.stringify(cards));
}

export async function POST(request: Request) {
  const cards: Card = await request.json();
  // Cria um novo card no banco de dados
  const createCards = await prisma.card.create({
    data: {
      title: cards.title,
      challenge: cards.challenge,
      ifNot: cards.ifNot,
      themes: cards.themes,
      section: cards.section,
      points: cards.points,
      creation: "system",
    },
  });
  return new Response(JSON.stringify(createCards));
}
