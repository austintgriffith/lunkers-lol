import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "react-qr-code";
import { useAccount, useBlockNumber } from "wagmi";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { Fisher } from "~~/components/Fisher";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const FishingHoleCatchAll: NextPage = () => {
  const router = useRouter();

  const { address } = useAccount();

  const { data: blockNumber } = useBlockNumber({
    onBlock(blockNumber) {
      console.log("⛓ New Block 📦", blockNumber);
    },
  });

  const [accountDisplay, setAccountDisplay] = useState(<div></div>);

  const { data: castedOut } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "castedOut",
    args: [BigInt(0), address],
  });

  const { data: fishCaught } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "fishCaught",
    args: [address],
  });

  const { writeAsync: castOut } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "castOut",
    args: [BigInt(0)],
  });

  const { data: castedOutBlock } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "castedOut",
    args: [BigInt(0), address],
  });

  const [foundBlockWithBite, setFoundBlockWithBite] = useState(0n);
  const [checkedUpToBlock, setCheckedUpToBlock] = useState(0n);

  const { writeAsync: reelIn } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "reelIn",
    args: [BigInt(0), foundBlockWithBite],
  });

  const { data: yourContract } = useScaffoldContract({
    contractName: "YourContract",
  });

  const checkBlocksForBite = async () => {
    console.log("👀 castedOutBlock", castedOutBlock, "blockNumber", blockNumber);
    if (yourContract && castedOutBlock && blockNumber) {
      for (let b = blockNumber - 1n; b > castedOutBlock; b--) {
        if (b > checkedUpToBlock) {
          console.log("INSPECTING BLOCK ", b);
          const bite = await yourContract?.read?.checkForBite([0n, address || "0", b]);
          console.log(" bite", bite);
          if (bite) {
            setFoundBlockWithBite(b);
            break;
          }
        } else {
          //console.log("already checked ", b);
        }
      }
      setCheckedUpToBlock(blockNumber - 1n);
    }
  };

  useEffect(() => {
    checkBlocksForBite();
  }, [castedOutBlock, blockNumber, checkBlocksForBite]);

  const executeFunction = async () => {
    console.log("✅ Checked in!");
    console.log("router.query.fishingholes", router.query.fishingholes);
    const outgoingString = JSON.stringify({ fishingHole: router.query.fishingholes, address: address });
    console.log("outgoingString", outgoingString);
    // Your code here
    const res = fetch("/api/checkin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: outgoingString,
    });
    const data = await (await res).json();
    const { allStorage } = data;

    const newAccountDisplay = allStorage?.map((fisherAddress: any) => {
      if (fisherAddress) {
        return <Fisher key={fisherAddress} fisherAddress={fisherAddress} />;
      }
    });
    setAccountDisplay(newAccountDisplay);
  };

  // yo chat gpt gimme a function that runs at start and every 5 s checking in with my address
  useEffect(() => {
    if (!address) {
      return;
    }
    // Function to be executed on page load and every 5 seconds

    // Execute the function immediately upon page load
    executeFunction();

    // Set an interval to execute the function every 5 seconds
    const intervalId = setInterval(executeFunction, 5000);

    // Cleanup: clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [address, router]); // The empty dependency array ensures that the effect runs only once when the component mounts

  const [castingOut, setCastingOut] = useState(false);

  const castOutButton = (
    <button
      disabled={castingOut}
      className={"btn btn-primary " + (castingOut ? "animate-pulse" : "")}
      onClick={() => {
        setCastingOut(true);
        castOut();
        setTimeout(() => {
          setCastingOut(false);
        }, 15000);
      }}
    >
      🪱 CAST OUT
    </button>
  );

  const [reelingIn, setReelingIn] = useState(false);

  const reelInButton = (
    <button
      disabled={reelingIn}
      className={"btn btn-primary " + (reelingIn ? "animate-pulse" : "")}
      onClick={() => {
        setReelingIn(true);
        reelIn();
        setTimeout(() => {
          setReelingIn(false);
        }, 15000);
        setFoundBlockWithBite(0n);
      }}
    >
      🎣 REEL IN!!!
    </button>
  );

  const [copied, setCopied] = useState(false);

  const domain = "https://fishingparty.xyz/";

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10 text-4xl">🐟{fishCaught?.toString()}</div>
      <div className="flex items-center flex-col flex-grow pt-10">
        {castedOut && castedOutBlock
          ? castedOutBlock == blockNumber
            ? "casting..."
            : foundBlockWithBite > 0n && foundBlockWithBite > castedOutBlock
            ? reelInButton
            : "waiting for a bite..."
          : castOutButton}
      </div>

      <div className="flex items-center flex-col flex-grow pt-10">{accountDisplay}</div>
      <div className="flex items-center flex-col flex-grow pt-10 ">
        <div className="text-xs p-1">scan this fishing party to join:</div>
        <QRCode size={128} value={domain + router.query.fishingholes} />
        <div className="flex text-xs p-1">
          {domain + router.query.fishingholes}
          {copied ? (
            <CheckCircleIcon
              className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
          ) : (
            <CopyToClipboard
              text={domain + router.query.fishingholes}
              onCopy={() => {
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 800);
              }}
            >
              <DocumentDuplicateIcon
                className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            </CopyToClipboard>
          )}
        </div>
      </div>
      <div className="flex items-center flex-col flex-grow pt-10 ">block: {blockNumber?.toString()}</div>
      <div className="flex items-center flex-col flex-grow pt-10 ">
        {" "}
        <button
          className={"btn " + (castingOut ? "animate-pulse" : "")}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          👈 exit to main menu
        </button>
      </div>
    </>
  );
};

export default FishingHoleCatchAll;
