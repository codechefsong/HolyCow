"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useReadContract, useWriteContract } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import DeployedContracts from "~~/contracts/deployedContracts";
import { notification } from "~~/utils/scaffold-eth";

type cowContract = {
  cowContractAddress: string;
};

interface CowStats {
  health: number;
  hunger: number;
  happiness: number;
}

const CHAIN_ID = "31337";

export const CowDashboard = ({ cowContractAddress }: cowContract) => {
  const [cowStats, setCowStats] = useState<CowStats>({
    health: 80,
    hunger: 50,
    happiness: 60,
  });

  const { data: hash, writeContract } = useWriteContract();

  const { data: happyPoint } = useReadContract({
    address: cowContractAddress,
    abi: DeployedContracts[CHAIN_ID].Cow.abi,
    functionName: "getHappyPoint",
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
    writeContract({
      address: cowContractAddress,
      abi: DeployedContracts[CHAIN_ID].Cow.abi,
      functionName: "feedTheCow",
    });
    notification.success(hash);
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

  const collectMilk = async () => {
    writeContract({
      address: cowContractAddress,
      abi: DeployedContracts[CHAIN_ID].Cow.abi,
      functionName: "collectMilks",
    });
    notification.success(hash);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1>
          <Address address={cowContractAddress} />
        </h1>
        <Image alt="Wagyu" className="mr-2" width={30} height={30} src="/icons/wagyu.png" />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {(Object.keys(cowStats) as Array<keyof CowStats>).map(stat => (
          <div
            key={stat}
            className={`
              p-4 rounded-lg ${stat === "health" ? "bg-green-100" : stat === "hunger" ? "bg-yellow-100" : "bg-blue-100"}
            `}
          >
            <p
              className={`text-sm 
              ${stat === "health" ? "text-green-800" : stat === "hunger" ? "text-yellow-800" : "text-blue-800"}
            `}
            >
              {stat.charAt(0).toUpperCase() + stat.slice(1)} {happyPoint?.toString()}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className={`
                  h-2.5 rounded-full 
                  ${stat === "health" ? "bg-green-600" : stat === "hunger" ? "bg-yellow-600" : "bg-blue-600"}
                `}
                style={{ width: `${happyPoint}% ` }}
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
          <Image alt="Feeding Cow" className="mr-2" width={30} height={30} src="/icons/feedingCow.png" /> Feed Cow
        </button>

        <button
          onClick={massageCow}
          className="flex items-center justify-center bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition"
        >
          <Image alt="Massage Cow" className="mr-2" width={30} height={30} src="/icons/massage.png" /> Massage Cow
        </button>

        <button
          onClick={cureCow}
          className="flex items-center justify-center bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
        >
          <Image alt="Medicine Cow" className="mr-2" width={30} height={30} src="/icons/medicine.png" /> Cure Cow
        </button>

        <button
          onClick={putCowInBarn}
          className="flex items-center justify-center bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition"
        >
          <Image alt="Barn Cow" className="mr-2" width={30} height={30} src="/icons/barn.png" /> Put in Barn
        </button>

        <button
          onClick={collectMilk}
          className="flex items-center justify-center bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          <Image alt="Milk Cow" className="mr-2" width={30} height={30} src="/icons/milk.png" /> Collect Milk
        </button>
      </div>
    </div>
  );
};
