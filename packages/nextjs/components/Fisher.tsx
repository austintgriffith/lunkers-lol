import { useEffect, useState } from "react";
import { Address, Balance } from "./scaffold-eth";
import { useInterval } from "usehooks-ts";
import { parseEther } from "viem";
import { useAccount, usePublicClient, useSendTransaction } from "wagmi";

export const Fisher = ({ fisherAddress, fisherBalance }: { fisherAddress?: string; fisherBalance?: bigint }) => {
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

  const [gassingUp, setGassingUp] = useState(false);

  return (
    <div key={fisherAddress} className="p-1">
      <Address address={fisherAddress} />
      {balance >= parseEther("0.007") ? (
        <div className="flex">
          <Balance address={fisherAddress} />
          🐟{fisherBalance ? fisherBalance?.toString() : "..."}
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
