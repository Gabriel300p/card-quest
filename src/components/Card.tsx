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
  type: string;
  points: number;
}

const Card = ({ id, title, challenge, ifNot, type, points }: CardProps) => {
  const { toast } = useToast();
  const { addToViewedCards } = useStore();

  const feito = () => {
    addToViewedCards({ id, title, challenge, ifNot, type, points });
    toast({
      title: "Você cumpriu com o desafio",
      description: `Ganhou ${points} pontos`,
    });
  };

  const desafio = () => {
    addToViewedCards({ id, title, challenge, ifNot, type, points });
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
          {type !== "Sorteado" && (
            <label
              htmlFor=""
              className="text-neutral-100 font-semibold text-base"
            >
              Faça:
            </label>
          )}

          <p className="text-base font-normal text-neutral-300">{challenge}</p>
        </div>
        {type !== "Sorteado" && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="text-neutral-100 font-semibold text-base"
            >
              Ou:
            </label>
            <p className="text-base font-normal text-neutral-300">{ifNot}</p>
          </div>
        )}
      </div>
      <div className="flex flex-row gap-2 mb-2">
        <Button
          variant="outline"
          onClick={feito}
          className={`  w-full
          ${
            type === "Sorteado"
              ? "border-2 bg-emerald-700 border-transparent text-white"
              : ""
          }
          ${
            type === "Crítico"
              ? "border-2 border-pink-600 text-pink-600 font-bold"
              : ""
          }
          ${
            type === "Normal"
              ? "border-2 border-pink-600 text-pink-600 font-bold"
              : ""
          }
          ${
            type === "Votação"
              ? "border-2 border-sky-600 text-sky-600 font-bold"
              : ""
          }`}
        >
          {type === "Sorteado" ? "Prosseguir" : "Vou fazer"}
        </Button>
        {type !== "Sorteado" && (
          <Button onClick={desafio} variant="outline" className="w-full">
            Não vou
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
