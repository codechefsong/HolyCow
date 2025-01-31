"use client";

import React, { useState } from "react";
import type { NextPage } from "next";
import { CubeIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface CowNFT {
  id: number;
  name: string;
  breed: string;
  price: number;
  traits: string[];
}

const CowNFTPage: NextPage = () => {
  const [selectedCow, setSelectedCow] = useState<CowNFT | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isNamingModalOpen, setIsNamingModalOpen] = useState(false);
  const [cowName, setCowName] = useState("");

  const { writeContractAsync: Game } = useScaffoldWriteContract("CowFactory");

  const cowNFTs: CowNFT[] = [
    {
      id: 1,
      name: "Moo-na Lisa",
      breed: "Holstein",
      price: 0.001,
      traits: ["Artistic", "Milky Way Champion"],
    },
    {
      id: 2,
      name: "Beef-casso",
      breed: "Angus",
      price: 0.002,
      traits: ["Creative", "Champion Grazer"],
    },
    {
      id: 3,
      name: "Van Gogh-gh",
      breed: "Jersey",
      price: 0.003,
      traits: ["Starry Night Winner", "Rare Coat"],
    },
  ];

  const handleNameSubmit = async () => {
    if (!cowName) return;
    setIsNamingModalOpen(false);
    setIsPurchasing(true);

    try {
      await Game({
        functionName: "buyCow",
        args: [cowName],
      });
      setIsPurchasing(false);
      setShowSuccess(true);
    } catch (e) {
      console.error("Error spinning the wheel", e);
    }
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
                onClick={() => setIsNamingModalOpen(true)}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                {isPurchasing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <span>Purchase NFT</span>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              🎉 Congratulations! Your NFT purchase was successful. {cowName && `Your cow "${cowName}" is now yours!`}
              {"·"}Check your wallet for the transaction details.
            </p>
          </div>
        )}

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

        {isNamingModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">Name Your Cow</h2>
              <div className="mb-6">
                <label htmlFor="cowName" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a name for your new cow:
                </label>
                <input
                  id="cowName"
                  type="text"
                  value={cowName}
                  onChange={e => setCowName(e.target.value)}
                  placeholder="Enter a name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsNamingModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNameSubmit}
                  disabled={!cowName.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                  Confirm Purchase
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CowNFTPage;
