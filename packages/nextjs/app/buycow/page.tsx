"use client";

import React, { useState } from "react";
import type { NextPage } from "next";
import { CubeIcon, SparklesIcon } from "@heroicons/react/24/solid";

interface CowNFT {
  id: number;
  name: string;
  breed: string;
  price: number;
  traits: string[];
}

const CowNFTPage: NextPage = () => {
  const [selectedCow, setSelectedCow] = useState<CowNFT | null>(null);

  const cowNFTs: CowNFT[] = [
    {
      id: 1,
      name: "Moo-na Lisa",
      breed: "Holstein",
      price: 0.5,
      traits: ["Artistic", "Milky Way Champion"],
    },
    {
      id: 2,
      name: "Beef-casso",
      breed: "Angus",
      price: 0.75,
      traits: ["Creative", "Champion Grazer"],
    },
    {
      id: 3,
      name: "Van Gogh-gh",
      breed: "Jersey",
      price: 1.0,
      traits: ["Starry Night Winner", "Rare Coat"],
    },
  ];

  const handlePurchase = (cow: CowNFT): void => {
    alert(`Purchasing ${cow.name} for ${cow.price} ETH`);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-4">
          <CubeIcon className="text-green-700" width={48} height={48} />
          Cow Marketplace
          <SparklesIcon className="text-green-700" width={48} height={48} />
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {cowNFTs.map(cow => (
            <div
              key={cow.id}
              className={`bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                selectedCow?.id === cow.id ? "ring-4 ring-green-500" : ""
              }`}
              onClick={() => setSelectedCow(cow)}
            >
              <h2 className="text-2xl font-semibold mb-2">{cow.name}</h2>
              <div className="text-gray-600 mb-4">
                <p>Breed: {cow.breed}</p>
                <p>Price: {cow.price} ETH</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold mb-2">Traits:</h3>
                <div className="flex flex-wrap gap-2">
                  {cow.traits.map(trait => (
                    <span key={trait} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  handlePurchase(cow);
                }}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Purchase NFT
              </button>
            </div>
          ))}
        </div>

        {selectedCow && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Selected Cow Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <strong>Name:</strong> {selectedCow.name}
              </div>
              <div>
                <strong>Breed:</strong> {selectedCow.breed}
              </div>
              <div>
                <strong>Price:</strong> {selectedCow.price} ETH
              </div>
              <div>
                <strong>Traits:</strong> {selectedCow.traits.join(", ")}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CowNFTPage;
