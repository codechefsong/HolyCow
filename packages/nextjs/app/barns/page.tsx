"use client";

import { useRouter } from "next/navigation";
import { HeartIcon, HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const PlayersBarnPage: React.FC = () => {
  const router = useRouter();

  const { data: players } = useScaffoldReadContract({
    contractName: "CowFactory",
    functionName: "getPlayers",
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Barns</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players &&
            players.map(player => (
              <div
                key={player}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      <Address address={player} />
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <HomeIcon className="h-5 w-5 mr-2 text-green-500" />
                      <span>Barn Level: 1</span>
                    </div>
                    <div className="flex items-center">
                      <HeartIcon className="h-5 w-5 mr-2 text-red-500" />
                      <span>Cows: 1</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrophyIcon className="h-5 w-5 mr-2 text-blue-500" />
                      <span className="font-semibold text-gray-700">1</span>
                    </div>
                    <button
                      className="
                      bg-green-500 text-white 
                      px-4 py-2 rounded-lg 
                      hover:bg-green-600 
                      transition-colors
                    "
                      onClick={() => router.push("/barns/" + player)}
                    >
                      View Barn
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlayersBarnPage;
