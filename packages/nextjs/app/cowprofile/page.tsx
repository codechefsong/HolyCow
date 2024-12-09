"use client";

import React, { useState } from "react";
import { HandRaisedIcon, HeartIcon, HomeIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";

interface CowStats {
  health: number;
  hunger: number;
  happiness: number;
}

const CowProfile: React.FC = () => {
  const [cowStats, setCowStats] = useState<CowStats>({
    health: 80,
    hunger: 50,
    happiness: 60,
  });

  const updateStats = (updates: Partial<CowStats>) => {
    setCowStats(prevStats => ({
      ...prevStats,
      ...Object.fromEntries(
        Object.entries(updates).map(([key, value]) => [
          key,
          Math.min(Math.max(prevStats[key as keyof CowStats] + value, 0), 100),
        ]),
      ),
    }));
  };

  const feedCow = () => {
    updateStats({
      hunger: 20,
      happiness: 10,
    });
  };

  const massageCow = () => {
    updateStats({
      happiness: 25,
      health: 5,
    });
  };

  const cureCow = () => {
    updateStats({
      health: 100 - cowStats.health,
    });
  };

  const putCowInBarn = () => {
    updateStats({
      happiness: 15,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-4">Bessie the Cow</h1>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {(Object.keys(cowStats) as Array<keyof CowStats>).map(stat => (
              <div
                key={stat}
                className={`
                  p-4 rounded-lg ${
                    stat === "health" ? "bg-green-100" : stat === "hunger" ? "bg-yellow-100" : "bg-blue-100"
                  }
                `}
              >
                <p
                  className={`text-sm 
                  ${stat === "health" ? "text-green-800" : stat === "hunger" ? "text-yellow-800" : "text-blue-800"}
                `}
                >
                  {stat.charAt(0).toUpperCase() + stat.slice(1)}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className={`
                      h-2.5 rounded-full 
                      ${stat === "health" ? "bg-green-600" : stat === "hunger" ? "bg-yellow-600" : "bg-blue-600"}
                    `}
                    style={{ width: `${cowStats[stat]}% ` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={feedCow}
              className="flex items-center justify-center bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
            >
              <ShoppingBagIcon className="mr-2 h-5 w-5" /> Feed Cow
            </button>

            <button
              onClick={massageCow}
              className="flex items-center justify-center bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition"
            >
              <HandRaisedIcon className="mr-2 h-5 w-5" /> Massage Cow
            </button>

            <button
              onClick={cureCow}
              className="flex items-center justify-center bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
            >
              <HeartIcon className="mr-2 h-5 w-5" /> Cure Cow
            </button>

            <button
              onClick={putCowInBarn}
              className="flex items-center justify-center bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition"
            >
              <HomeIcon className="mr-2 h-5 w-5" /> Put in Barn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CowProfile;
