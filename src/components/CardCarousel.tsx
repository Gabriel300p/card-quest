"use client";

import { useStore } from "@/hooks/store";
import { useState } from "react";
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
  const [swiper, setSwiper] = useState<any>(null);
  const handleRandomCardClick = () => {
    if (viewedCards.length < cards.length && swiper) {
      const unviewedCards = cards.filter(
        (card) => !viewedCards.some((viewedCard) => viewedCard.id === card.id)
      );
      const randomIndex = Math.floor(Math.random() * unviewedCards.length);

      // Adicione uma animação de rotação aleatória aos cards com uma duração de 1 segundo
      swiper.slides.forEach((slide: any) => {
        slide.transform = `rotate(${Math.random() * 360}deg)`;
      });

      // Deslize para o card aleatório com uma duração de 0.5 segundos
      swiper.slideTo(randomIndex, 500, true);

      // Adicione um efeito de vibração aos cards enquanto eles estão sendo girados
      swiper.slides.forEach((slide: any) => {
        slide.addEventListener("transitionEnd", () => {
          slide.classList.add("shake");
        });
      });

      // Remova o efeito de vibração dos cards após a animação de deslizar terminar
      swiper.on("transitionEnd", () => {
        swiper.slides.forEach((slide: any) => {
          slide.classList.remove("shake");
        });
      });

      // Adicione um movimento de vai e volta aos cards
      swiper.slides.forEach((slide: any) => {
        slide.addEventListener("transitionEnd", () => {
          slide.style.transform = `translateX(${Math.random() * 100}px)`;
        });
      });
    }
  };

  const handleResetClick = () => {
    resetCards();
    if (swiper) {
      swiper.slideTo(0, 300, false);
    }
  };

  const handleSwiperInit = (swiperInstance: any) => {
    setSwiper(swiperInstance);
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
            onSwiper={handleSwiperInit}
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
    ${card.type === "Sorteado" ? "border-[5px] border-emerald-700" : ""}
    ${card.type === "Crítico" ? "border-[5px] border-pink-700" : ""}
    ${card.type === "Normal" ? "border-[5px] border-neutral-700" : ""}
    ${card.type === "Votação" ? "border-[5px] border-sky-700" : ""}

  `}
                  // className="bg-neutral-800 border-[5px] border-pink-800  shadow-md p-4 flex items-center justify-center rounded-2xl h-80 w-40"
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
