import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Address, Balance } from "./scaffold-eth";
import { useInterval } from "usehooks-ts";
import { parseEther, stringToHex } from "viem";
import { useAccount, usePublicClient, useSendTransaction } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const Fisher = ({ playerAddress, fisherAddress }: { playerAddress?: string; fisherAddress?: string }) => {
  const router = useRouter();

  const bytesStringForRoom = stringToHex("" + router.query.fishingholes, { size: 32 });

  const publicClient = usePublicClient();

  const { sendTransaction } = useSendTransaction({
    to: fisherAddress,
    value: parseEther("0.01"),
  });

  const { data: allFishTypes } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getAllFishTypes",
    args: [fisherAddress, bytesStringForRoom],
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

  const [fishRender, setFishRender] = useState(<div></div>);

  console.log("allFishTypes", allFishTypes);
  useEffect(() => {
    if (allFishTypes) {
      const newFishRender = [];
      for (let i = 0; i < allFishTypes?.length; i++) {
        newFishRender.push(
          <img
            key={i}
            style={{ transform: "scale(0.5)", margin: "-3%" }}
            src={"/fish" + allFishTypes[i].toString() + ".svg"}
          />,
        );
      }
      setFishRender(<>{newFishRender}</>);
    }
  }, [allFishTypes]);

  return (
    <div
      key={fisherAddress}
      className={"p-6 " + (playerAddress == fisherAddress ? "border-dotted border-2 border-white" : "")}
    >
      <Address address={fisherAddress} />
      {balance >= parseEther("0.007") ? (
        <div className="flex pb-10">
          <Balance address={fisherAddress} />
          <div className="absolute flex flex-row mt-5">{fishRender}</div>
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
