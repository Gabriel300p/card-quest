"use client";

import { useStore } from "@/hooks/store";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export interface CardProps {
  id: number;
  title: string;
  challenge: string;
  ifNot: string;
}

const Card = ({ id, title, challenge, ifNot }: CardProps) => {
  const { toast } = useToast();
  const { addToViewedCards } = useStore();

  const feito = () => {
    addToViewedCards({ id, title, challenge, ifNot });
    toast({
      title: "Você cumpriu com o desafio",
      description: "Ganhou 10 pontos",
    });
  };

  const desafio = () => {
    addToViewedCards({ id, title, challenge, ifNot });
    toast({
      title: "Você não cumpriu com o desafio",
      description: "Não ganhou pontos",
    });
  };

  return (
    <div className="flex flex-col justify-between  h-full">
      <div className="flex flex-col gap-7 py-3 px-2">
        <h2 className="text-xl font-bold mb-2 text-neutral-50 uppercase">
          {title}
        </h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="text-neutral-100 font-semibold text-base"
          >
            Faça:
          </label>
          <p className="text-base font-normal text-neutral-300">{challenge}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="text-neutral-100 font-semibold text-base"
          >
            Ou:
          </label>
          <p className="text-base font-normal text-neutral-300">{ifNot}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Button onClick={feito}>Vou fazer</Button>
        <Button variant="outline" onClick={desafio}>
          Não vou
        </Button>
      </div>
    </div>
  );
};

export default Card;
