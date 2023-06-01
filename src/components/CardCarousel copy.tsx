"use client";

import { useState } from "react";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import Card, { CardProps } from "./Card";
import ViewedCardsList from "./ViewedCardsList";

interface CardCarouselProps {
  cards: CardProps[];
}

const CardCarousel = ({ cards }: CardCarouselProps) => {
  const [viewedCards, setViewedCards] = useState<CardProps[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(-1);

  const handleRandomCardClick = () => {
    // Verifica se ainda há cards não vistos
    if (viewedCards.length < cards.length) {
      const unviewedCards = cards.filter(
        (card) =>
          !viewedCards.some((viewedCard) => viewedCard.title === card.title)
      );
      const randomIndex = Math.floor(Math.random() * unviewedCards.length);
      setViewedCards([...viewedCards, unviewedCards[randomIndex]]);
      setActiveIndex(randomIndex);
    }
  };

  const handleResetClick = () => {
    setViewedCards([]);
    setActiveIndex(0);
  };

  return (
    <div className="relative">
      {/* {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <Card
            title={randomCard?.title || ""}
            challenge={randomCard?.challenge || ""}
            ifNot={randomCard?.ifNot || ""}
            id={randomCard?.id || 1}
          />
        </Modal>
      )} */}
      <div className="overflow-hidden py-8">
        {viewedCards.length === cards.length ? (
          <p className="text-center">All cards have been viewed.</p>
        ) : (
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className={`mySwiper ${selectedCardIndex !== -1 ? "active" : ""}`}
          >
            {cards.map((card, index) => {
              const isViewed = viewedCards.some(
                (viewedCard) => viewedCard.title === card.title
              );
              if (isViewed) {
                return null;
              }
              return (
                <SwiperSlide
                  key={`${card.id}${isViewed}`}
                  className={`bg-neutral-800 border-[5px] border-pink-800 shadow-md p-4 flex items-center justify-center rounded-2xl h-80 w-40 ${
                    index === selectedCardIndex ? "active" : ""
                  }`}
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
          onClick={
            viewedCards.length < cards.length
              ? handleRandomCardClick
              : undefined
          }
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
