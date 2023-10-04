"use client";

import CardCarousel from "@/components/CardCarousel";
import { useQuery } from "react-query";

const fetchCards = async () => {
  const response = await fetch("/api/cards");
  if (!response.ok) {
    throw new Error("Failed to fetch cards.");
  }
  return response.json();
};

const FetchCards = () => {
  const { isLoading, error, data } = useQuery("cards", fetchCards);

  if (isLoading) {
    return <p className="text-gray-100">Carregando...</p>;
  }

  if (error) {
    return <p className="text-gray-100">Erro ao carregar os cards.</p>;
  }

  return (
    <div className="mt-4">
      <CardCarousel cards={data} />
    </div>
  );
};

export default FetchCards;
