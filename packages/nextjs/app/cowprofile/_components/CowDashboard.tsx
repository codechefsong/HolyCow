"use client";

import Image from "next/image";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContractWithContractAddress } from "~~/hooks/scaffold-eth/useScaffoldReadContractWithContractAddress";
import { useScaffoldWriteContractWithContractAddress } from "~~/hooks/scaffold-eth/useScaffoldWriteContractWithContractAddress";

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

  const feedCow = async () => {
    try {
      await Game({
        functionName: "feedTheCow",
      });
    } catch (e) {
      console.error("Error feeding the cow", e);
    }
  };

  const massageCow = async () => {
    try {
      await Game({
        functionName: "massageTheCow",
      });
    } catch (e) {
      console.error("Error massaging the cow", e);
    }
  };

  const cureCow = async () => {
    try {
      await Game({
        functionName: "healTheCow",
      });
    } catch (e) {
      console.error("Error healing the cow", e);
    }
  };

  const putCowInBarn = () => {};

  const collectMilk = async () => {
    try {
      await Game({
        functionName: "collectMilks",
      });
    } catch (e) {
      console.error("Error collecting milk", e);
    }
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
