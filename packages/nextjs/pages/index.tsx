import { useEffect, useState } from "react";
import type { NextPage } from "next";
import QRCode from "react-qr-code";
import { parseEther } from "viem";
import { useAccount, useBlockNumber, useSendTransaction } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address } = useAccount();

  const [validBlocks, setValidBlocks] = useState<bigint[]>([]);

  const { data: blockNumber } = useBlockNumber({
    onBlock(blockNumber) {
      console.log("New block: ", blockNumber);

      //TODO: damn i need to check if we catch a fish each blocknumber

      setValidBlocks(validBlocks => [...validBlocks, blockNumber]);
    },
  });
  console.log("validBlocks", validBlocks);

  const [accountDisplay, setAccountDisplay] = useState(<div></div>);

  const [sendTipTo, setSendTipTo] = useState("");

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
  const { writeAsync: reelIn } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "reelIn",
    args: [BigInt(0), blockNumber],
  });

  //TODO: I couldn't ever get this to work because of declaritive stuff :(

  /*
  const { writeAsync: sendTip } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "sendTip",
    args: [sendTipTo, BigInt(0)],
    value: "0.01",
  });*/

  const triggerSendTip = () => {
    //sendTip();
    console.log("sending tip to", sendTipTo);
    sendTransaction();

    setTimeout(() => {
      setSendTipTo("");
    }, 500);
  };

  const doSendTip = async (fisherAddress: any) => {
    console.log("fund", fisherAddress);
    setSendTipTo(fisherAddress);
    setTimeout(triggerSendTip, 500);
  };

  const { sendTransaction } = useSendTransaction({
    to: sendTipTo,
    value: parseEther("0.01"),
  });

  const executeFunction = async () => {
    console.log("✅ Checked in!");
    // Your code here
    const res = fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: address }),
    });
    const data = await (await res).json();
    const { allStorage } = data;

    const newAccountDisplay = allStorage?.map((fisherAddress: any) => {
      if (fisherAddress) {
        return (
          <div key={fisherAddress}>
            <Address address={fisherAddress} />
            <Balance address={fisherAddress} />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                doSendTip(fisherAddress);
              }}
            ></button>
          </div>
        );
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
  }, [address]); // The empty dependency array ensures that the effect runs only once when the component mounts

  const castOutButton = (
    <button
      className="btn btn-primary"
      onClick={() => {
        castOut();
      }}
    >
      CAST OUT
    </button>
  );

  const reelInButton = (
    <button
      className="btn btn-primary"
      onClick={() => {
        reelIn();
      }}
    >
      REEL IN
    </button>
  );

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">fish caught:{fishCaught?.toString()}</div>
      <div className="flex items-center flex-col flex-grow pt-10">{castedOut ? reelInButton : castOutButton}</div>

      <div className="flex items-center flex-col flex-grow pt-10">{accountDisplay}</div>
      <div className="flex items-center flex-col flex-grow pt-10 ">
        <QRCode size={128} value={"https://fishingparty.xyz/"} />
      </div>
      <div className="flex items-center flex-col flex-grow pt-10 ">block: {blockNumber?.toString()}</div>
    </>
  );
};

export default Home;
