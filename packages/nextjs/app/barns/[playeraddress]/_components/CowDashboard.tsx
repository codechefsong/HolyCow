"use client";

import Image from "next/image";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContractWithContractAddress } from "~~/hooks/scaffold-eth/useScaffoldReadContractWithContractAddress";
import { useScaffoldWriteContractWithContractAddress } from "~~/hooks/scaffold-eth/useScaffoldWriteContractWithContractAddress";
import { formatTime } from "~~/utils/time";

type cowContract = {
  cowContractAddress: string;
};

export const CowDashboard = ({ cowContractAddress }: cowContract) => {
  const { writeContractAsync: Game } = useScaffoldWriteContractWithContractAddress("Cow", cowContractAddress);

  const { data: happyPoint } = useScaffoldReadContractWithContractAddress({
    contractName: "Cow",
    // @ts-ignore
    contractAddress: cowContractAddress,
    functionName: "getHappyPoint",
  });

  const { data: isSick } = useScaffoldReadContractWithContractAddress({
    contractName: "Cow",
    // @ts-ignore
    contractAddress: cowContractAddress,
    functionName: "getIsSick",
  });

  const { data: lastTimeCowAte } = useScaffoldReadContractWithContractAddress({
    contractName: "Cow",
    // @ts-ignore
    contractAddress: cowContractAddress,
    functionName: "getLastTimeCowAte",
  });

  const stealMilk = async () => {
    try {
      await Game({
        functionName: "stealMilks",
      });
    } catch (e) {
      console.error("Error stealing milk", e);
    }
  };

  const timeLeft = Math.floor(Date.now() / 1000) - Number(lastTimeCowAte);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1>
          <Address address={cowContractAddress} />
        </h1>
        <Image alt="Wagyu" className="mr-2" width={30} height={30} src="/icons/wagyu.png" />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-green-100">
          <p className="text-sm text-green-800">Health</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="h-2.5 rounded-full bg-green-600" style={{ width: isSick ? "20%" : "100%" }}></div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-yellow-100">
          <p className="text-sm text-yellow-800">Hunger</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="h-2.5 rounded-full bg-yellow-600" style={{ width: `${100}% ` }}></div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-blue-100">
          <p className="text-sm text-blue-800">Happiness {happyPoint?.toString()}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${happyPoint}% ` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={stealMilk}
          className="flex items-center justify-center bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          <Image alt="Milk Cow" className="mr-2" width={30} height={30} src="/icons/milk.png" /> Steal Milk
        </button>
      </div>
      <p>{formatTime(timeLeft)} Last time to collect milk</p>
    </div>
  );
};
