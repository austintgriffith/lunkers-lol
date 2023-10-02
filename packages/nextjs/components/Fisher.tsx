import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Address, Balance } from "./scaffold-eth";
import { useInterval } from "usehooks-ts";
import { parseEther, stringToHex } from "viem";
import { useAccount, usePublicClient, useSendTransaction } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const Fisher = ({ fisherAddress }: { fisherAddress?: string }) => {
  const router = useRouter();

  const publicClient = usePublicClient();

  const { sendTransaction } = useSendTransaction({
    to: fisherAddress,
    value: parseEther("0.01"),
  });

  const [balance, setBalance] = useState(0n);

  const { address } = useAccount();

  const checkBalance = async () => {
    const loadedBalance = await publicClient?.getBalance({
      address: fisherAddress || "",
    });
    setBalance(loadedBalance);
  };

  useEffect(() => {
    checkBalance();
  }, [fisherAddress]);

  useInterval(() => {
    checkBalance();
  }, 5000);
  //console.log("ROOM NAMe", router.query.fishingholes);

  const bytesStringForRoom = stringToHex("" + router.query.fishingholes, { size: 32 });

  //console.log("bytesStringForRoom", bytesStringForRoom);

  const { data: fishCaught } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "balanceOf",
    args: [fisherAddress, bytesStringForRoom],
  });

  const [gassingUp, setGassingUp] = useState(false);

  return (
    <div key={fisherAddress} className="p-1">
      <Address address={fisherAddress} />
      {balance >= parseEther("0.007") ? (
        <div className="flex">
          <Balance address={fisherAddress} />
          🐟{fishCaught?.toString()}
        </div>
      ) : address?.toLowerCase() === fisherAddress?.toLowerCase() ? (
        "🥹 waiting for gas..."
      ) : (
        <button
          className={"btn btn-secondary py-2 mb-4 mt-2  " + (gassingUp ? "animate-pulse" : "")}
          disabled={gassingUp}
          onClick={async () => {
            setGassingUp(true);
            sendTransaction();
            await new Promise(resolve => setTimeout(resolve, 16000));
            setGassingUp(false);
          }}
        >
          ⛽️ gas em up
        </button>
      )}
    </div>
  );
};
