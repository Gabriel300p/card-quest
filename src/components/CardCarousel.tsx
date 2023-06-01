"use client";

import { useEffect, useState } from "react";
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
  const [isCardSelected, setIsCardSelected] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRandomCardClick = () => {
    if (viewedCards.length < cards.length) {
      const unviewedCards = cards.filter(
        (card) =>
          !viewedCards.some((viewedCard) => viewedCard.title === card.title)
      );
      const randomIndex = Math.floor(Math.random() * unviewedCards.length);
      setSelectedCardIndex(randomIndex);
      setIsModalOpen(true);
    }
  };

  const handleResetClick = () => {
    setViewedCards([]);
    setActiveIndex(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isCardSelected) {
      const timer = setTimeout(() => {
        setIsCardSelected(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCardSelected]);

  return (
    <div className="relative">
      {isModalOpen && (
        <div className="absolute top-0 right-0 left-0 bottom-0 inset-0 flex items-center justify-center bg-black/80  z-50">
          <SwiperSlide
            className={`bg-neutral-800 border-[5px] border-pink-800 shadow-md p-4 flex items-center justify-center rounded-2xl h-80 w-40 `}
          >
            <Card {...cards[selectedCardIndex]} />
            <button
              className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-400 focus:outline-none"
              onClick={handleCloseModal}
            >
              Começar do zero
            </button>
          </SwiperSlide>
        </div>
      )}
      <div className="overflow-hidden py-8">
        {viewedCards.length === cards.length ? (
          <p className="text-center">All cards have been viewed.</p>
        ) : (
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
            initialSlide={
              selectedCardIndex !== -1 ? selectedCardIndex : undefined
            }
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
