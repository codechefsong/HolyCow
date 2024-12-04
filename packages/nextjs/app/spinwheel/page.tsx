"use client";

import React, { useState } from "react";
import { formatEther } from "viem";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import {
  useScaffoldReadContract,
  useScaffoldWatchContractEvent,
  useScaffoldWriteContract,
} from "~~/hooks/scaffold-eth";

const SpinWheel: NextPage = () => {
  const { address } = useAccount();

  const [highlightedSections, setHighlightedSections] = useState([]);
  const [winningSection, setWinningSection] = useState(null);
  const [showOnlyWinningColor, setShowOnlyWinningColor] = useState(false);

  const wheelSections = ["Prize 1", "Prize 2", "Prize 3", "Prize 4", "Prize 5", "Prize 6"];

  const { data: mooTokenBalance } = useScaffoldReadContract({
    contractName: "M000Token",
    functionName: "balanceOf",
    args: [address],
  });

  const { writeContractAsync: Game } = useScaffoldWriteContract("CowFactory");

  useScaffoldWatchContractEvent({
    contractName: "CowFactory",
    eventName: "SpinWheelResult",
    onLogs: logs => {
      logs.map(log => {
        const { player, wheelNumber } = log.args;
        console.log(player, wheelNumber);
        if (address === player) {
          // @ts-ignore
          setWinningSection(+wheelNumber?.toString() - 1);
          setShowOnlyWinningColor(true);
        }
      });
    },
  });

  const spinWheel = async () => {
    try {
      await Game({
        functionName: "spinWheel",
      });
    } catch (e) {
      console.error("Error spinning the wheel", e);
    }

    setHighlightedSections([]);
    setWinningSection(null);
    setShowOnlyWinningColor(false);

    const highlightSequence = [];
    for (let i = 0; i < wheelSections.length; i++) {
      highlightSequence.push(i);
    }

    highlightSequence.forEach((sectionIndex, index) => {
      setTimeout(() => {
        // @ts-ignore
        setHighlightedSections(prev => [...prev, sectionIndex]);
      }, index * 200);
    });
  };

  // @ts-ignore
  const getBackgroundClass = index => {
    if (showOnlyWinningColor) {
      return index === winningSection ? "bg-green-500 text-white" : "bg-white bg-opacity-20 text-gray-500";
    }
    if (highlightedSections.includes(index)) {
      return "bg-yellow-500 text-white";
    }
    return "bg-white bg-opacity-20 text-gray-500";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-xl mb-10">M00 Token: {parseFloat(formatEther(BigInt(mooTokenBalance || 0n)))}</div>
      <div className="relative w-80 h-80">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl">
          {wheelSections.map((section, index) => {
            const sectionAngle = 360 / wheelSections.length;
            const rotationAngle = index * sectionAngle;
            return (
              <div
                key={index}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${rotationAngle}deg)`,
                  transformOrigin: "center center",
                }}
              >
                <div
                  className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    px-4 py-2 rounded-md font-bold transition-colors duration-500 ease-in-out
                    ${getBackgroundClass(index)}`}
                  style={{
                    transform: `rotate(90deg) translateX(120px)`,
                    width: "120px",
                    textAlign: "center",
                  }}
                >
                  {section}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={spinWheel}
        className="mt-8 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Spin Wheel
      </button>

      {winningSection !== null && (
        <div className="mt-4 text-xl font-bold text-green-600">Won: {wheelSections[winningSection]}</div>
      )}
    </div>
  );
};

export default SpinWheel;