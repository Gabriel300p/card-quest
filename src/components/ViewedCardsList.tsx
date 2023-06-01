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

  const handleListClose = () => {
    setIsListOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none"
        onClick={handleListOpen}
      >
        Viewed Cards
      </button>
      {isListOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-1/2 p-4">
            <h2 className="text-lg font-bold mb-4">Viewed Cards</h2>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={handleListClose}
            >
              {/* <FontAwesomeIcon icon={faTimes} /> */}
              Teste
            </button>
            <ul className="list-none p-0">
              {viewedCards.map((card) => (
                <li key={card.title} className="mb-2">
                  {card.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewedCardsList;
