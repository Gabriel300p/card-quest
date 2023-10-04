"use client";

import { useStore } from "@/hooks/store";
import { useEffect, useMemo, useRef, useState } from "react";
import { EffectCards } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card, { CardProps } from "./Card";
import ViewedCardsList from "./ViewedCardsList";
import { Button } from "./ui/button";

interface CardCarouselProps {
  cards: CardProps[];
}

const CardCarousel = ({ cards }: CardCarouselProps) => {
  const { viewedCards, addToViewedCards, resetCards } = useStore();
  const swiperRef = useRef<any>(null);
  const slidesRef = useRef<any[]>([]);

  // UseMemo para armazenar o conjunto de cards não visualizados
  const memoizedUnviewedCards = useMemo(() => {
    return cards.filter(
      (card) => !viewedCards.some((viewedCard) => viewedCard.id === card.id)
    );
  }, [cards, viewedCards]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slides = slidesRef.current;
    }
  }, [memoizedUnviewedCards]);

  const handleRandomCardClick = () => {
    if (
      viewedCards.length < cards.length &&
      swiperRef.current &&
      swiperRef.current.swiper
    ) {
      const randomIndex = Math.floor(
        Math.random() * memoizedUnviewedCards.length
      );

      // Adicione uma classe de animação para girar o card
      swiperRef.current.swiper.slides[randomIndex].classList.add("rotate-card");

      // Deslize para o card aleatório com uma duração de 0.5 segundos
      swiperRef.current.swiper.slideTo(randomIndex, 600, true);

      // Remova a classe de animação após a animação de deslizar terminar
      setTimeout(() => {
        swiperRef.current.swiper.slides[randomIndex].classList.remove(
          "rotate-card"
        );
      }, 500);
    }
  };

  const handleResetClick = () => {
    resetCards();
    if (swiperRef.current) {
      swiperRef.current.slideTo(0, 300, false);
    }
  };

  return (
    <div className="relative">
      <div className="overflow-hidden py-8">
        {viewedCards.length === cards.length ? (
          <p className="text-center text-white">Todos os cards foram vistos.</p>
        ) : (
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            ref={swiperRef}
            className="mySwiper"
          >
            {cards.map((card) => {
              const isViewed = viewedCards.some(
                (viewedCard) => viewedCard.id === card.id
              );
              if (isViewed) {
                return null;
              }
              return (
                <SwiperSlide
                  key={card.id}
                  className={`bg-neutral-800 shadow-md p-4 flex items-center justify-center rounded-2xl h-96 w-40
                    ${
                      card.type === "Sorteado"
                        ? "border-[5px] border-emerald-700"
                        : ""
                    }
                    ${
                      card.type === "Crítico"
                        ? "border-[5px] border-pink-700"
                        : ""
                    }
                    ${
                      card.type === "Normal"
                        ? "border-[5px] border-neutral-700"
                        : ""
                    }
                    ${
                      card.type === "Votação"
                        ? "border-[5px] border-sky-700"
                        : ""
                    }
                  `}
                >
                  <Card {...card} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
      <div className="flex flex-col gap-4 justify-center items-center mt-5">
        <Button
          onClick={handleRandomCardClick}
          disabled={viewedCards.length === cards.length}
        >
          Escolha um card aleatório
        </Button>
        <Button variant="secondary" onClick={handleResetClick}>
          Começar do zero
        </Button>
        {viewedCards.length > 0 && (
          <ViewedCardsList viewedCards={viewedCards} />
        )}
      </div>
    </div>
  );
};

export default CardCarousel;
