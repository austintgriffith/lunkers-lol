import { useEffect, useState } from "react";
import type { NextPage } from "next";
import QRCode from "react-qr-code";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address } = useAccount();

  const [accountDisplay, setAccountDisplay] = useState(<div></div>);

  const [sendTipTo, setSendTipTo] = useState("");

  const { writeAsync: sendTip } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "sendTip",
    args: [sendTipTo, BigInt(0)],
    value: "0.01",
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
              onClick={
                //send eth to this address
                async () => {
                  console.log("fund", fisherAddress);
                  setSendTipTo(fisherAddress);
                  setTimeout(() => {
                    sendTip();
                    setSendTipTo("");
                  }, 500);
                }
              }
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

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">{accountDisplay}</div>
      <div className="flex items-center flex-col flex-grow pt-10 ">
        <QRCode size={128} value={"https://eth-fish-nextjs.vercel.app/"} />
      </div>
    </>
  );
};

export default Home;
