"use client";

import { CowDashboard } from "./_components/CowDashboard";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const CowProfile: React.FC = () => {
  const { address } = useAccount();

  const { data: userCowAddresses } = useScaffoldReadContract({
    contractName: "CowFactory",
    functionName: "getUserCowAddresses",
    args: [address],
  });

  const { data: mooTokenBalance } = useScaffoldReadContract({
    contractName: "M000Token",
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-xl text-right">M00 Token: {parseFloat(formatEther(BigInt(mooTokenBalance || 0n)))}</div>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {userCowAddresses?.length && <CowDashboard cowContractAddress={userCowAddresses[0]} />}
      </div>
    </div>
  );
};

export default CowProfile;
