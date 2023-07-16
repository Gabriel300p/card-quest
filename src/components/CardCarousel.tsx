"use client";

import { useStore } from "@/hooks/store";
import { useState } from "react";
import { EffectCards } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card, { CardProps } from "./Card";
import ViewedCardsList from "./ViewedCardsList";

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
      // const card = unviewedCards[randomIndex];
      // addToViewedCards(card);
      swiper.slideTo(randomIndex, 300, false);
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
          <p className="text-center">All cards have been viewed.</p>
        ) : (
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
            onSwiper={handleSwiperInit}
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
                  className="bg-neutral-800 border-[5px] border-pink-800 shadow-md p-4 flex items-center justify-center rounded-2xl h-80 w-40"
                >
                  <Card {...card} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
      <div className="flex flex-col gap-3 justify-between items-center mt-5">
        <button
          className="py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none disabled:bg-neutral-400"
          onClick={handleRandomCardClick}
          disabled={viewedCards.length === cards.length}
        >
          Escolha um card aleatório
        </button>
        <button
          className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-400 focus:outline-none"
          onClick={handleResetClick}
        >
          Começar do zero
        </button>
        {viewedCards.length > 0 && (
          <ViewedCardsList viewedCards={viewedCards} />
        )}
      </div>
    </div>
  );
};

export default CardCarousel;
