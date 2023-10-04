"use client";

import { useState } from "react";
import { CardProps } from "./Card";

interface ViewedCardsListProps {
  viewedCards: CardProps[];
}

const ViewedCardsList = ({ viewedCards }: ViewedCardsListProps) => {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const handleListOpen = () => {
    setIsListOpen(true);
  };

  return (
    <>
      <button
        className="py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none"
        onClick={handleListOpen}
      >
        Viewed Cards
      </button>
      {isListOpen && (
        <ul className="list-none flex flex-col gap-3 p-5 rounded-md border border-neutral-700 mt-7">
          {viewedCards.map((card, index) => (
            <li
              key={card.id}
              className="text-sm font-semibold text-gray-100 flex items-center gap-1"
            >
              <span className="font-regular text-gray-300">{index + 1} - </span>
              {card.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ViewedCardsList;
