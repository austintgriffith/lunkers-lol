import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Address, Balance } from "./scaffold-eth";
import { useInterval } from "usehooks-ts";
import { parseEther, stringToHex } from "viem";
import { useAccount, usePublicClient, useSendTransaction } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const Fisher = ({
  playerAddress,
  fisherAddress,
  fisherTotalWeight,
}: {
  playerAddress?: string;
  fisherAddress?: string;
  fisherTotalWeight?: string;
}) => {
  const router = useRouter();

  const bytesStringForRoom = stringToHex("" + router.query.fishingholes, { size: 32 });

  const publicClient = usePublicClient();

  const { sendTransaction } = useSendTransaction({
    to: fisherAddress,
    value: parseEther("0.01"),
  });

  const { data: getAllFishInfo } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getAllFishInfo",
    args: [fisherAddress, bytesStringForRoom],
  });
  console.log("getAllFishInfo", getAllFishInfo);

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

  const allFishTypes = getAllFishInfo && getAllFishInfo[0];
  const allFishWeights = getAllFishInfo && getAllFishInfo[1];

  console.log("allFishTypes", allFishTypes);
  useEffect(() => {
    if (allFishTypes) {
      const newFishRender = [];
      // @ts-ignore
      for (let i = 0; i < allFishTypes?.length; i++) {
        // @ts-ignore
        const thisFishWeight = allFishWeights && allFishWeights[i];
        console.log("thisFishWeight", thisFishWeight);
        // @ts-ignore
        const thisFishSvg = "/fish" + allFishTypes[i].toString() + ".svg";
        newFishRender.push(
          <div className="relative flex flex-row mt-2">
            <div className="absolute">{thisFishWeight.toString()}</div>
            <img
              key={i}
              style={{ transform: "scale(1)", marginRight: 10, marginLeft: "calc(4% + 6px)" }}
              src={thisFishSvg}
            />
          </div>,
        );
      }
      setFishRender(<>{newFishRender}</>);
    }
  }, [allFishTypes]);

  console.log("playerAddress", playerAddress);

  return (
    <div key={fisherAddress} className={"p-6 "}>
      <Address address={fisherAddress} />
      {balance >= parseEther("0.007") ? (
        <div className="flex pb-10">
          <div>
            <Balance address={fisherAddress} />
          </div>
          <div>score: {fisherTotalWeight}</div>
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
