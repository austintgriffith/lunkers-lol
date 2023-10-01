import { useEffect, useState } from "react";
import { Address, Balance } from "./scaffold-eth";
import { useInterval } from "usehooks-ts";
import { parseEther } from "viem";
import { useAccount, usePublicClient, useSendTransaction } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const Fisher = ({ fisherAddress }: { fisherAddress?: string }) => {
  const publicClient = usePublicClient();

  const { sendTransaction } = useSendTransaction({
    to: fisherAddress,
    value: parseEther("0.01"),
  });

  const { data: fishCaught } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "fishCaught",
    args: [fisherAddress],
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
          className="btn py-2 mb-2"
          onClick={async () => {
            sendTransaction();
          }}
        >
          ⛽️ gas em up
        </button>
      )}
    </div>
  );
};
