import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { stringToHex } from "viem";
import { useAccount } from "wagmi";
import { Fisher } from "~~/components/Fisher";
import { useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const AccountDisplay: NextPage = () => {
  const router = useRouter();

  const { address } = useAccount();

  const [accountDisplay, setAccountDisplay] = useState(<div></div>);

  const [accountList, setAccountList] = useState([]);

  const bytesStringForRoom = stringToHex("" + router.query.fishingholes, { size: 32 });

  const { data: yourContractInfo } = useDeployedContractInfo("YourContract");

  console.log("yourContractInfo", yourContractInfo);

  const { data: balanceInfo } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "balancesOf",
    args: [bytesStringForRoom, accountList],
  });

  const balances = balanceInfo && balanceInfo[0];
  const weights = balanceInfo && balanceInfo[1];

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
    setAccountList(allStorage);
  };

  useEffect(() => {
    if (!address) {
      return;
    }
    executeFunction();
    const intervalId = setInterval(executeFunction, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [address, router]); // The empty dependency array ensures that the effect runs only once when the component mounts

  useEffect(() => {
    if (!accountList) {
      return;
    }

    const accountsWithBalances = accountList.map((account: any, index: number) => {
      // @ts-ignore
      return { account: account, balance: balances ? balances[index] : 0, weight: weights ? weights[index] : 0 };
    });

    const sortedAccountsWithBalances = accountsWithBalances.sort((a: any, b: any) => {
      return b.weight > a.weight ? 1 : -1;
    });

    const newAccountDisplay = sortedAccountsWithBalances
      ?.map((item: any) => {
        if (item) {
          console.log("ITERM WEITH", item);
          return (
            <Fisher
              key={item.account}
              playerAddress={address}
              fisherAddress={item.account}
              fisherTotalWeight={item.weight.toString()}
            />
          );
        }
      })
      .filter(Boolean); // filter out any undefined values

    if (newAccountDisplay) {
      // @ts-ignore
      setAccountDisplay(newAccountDisplay);
    }
  }, [accountList, balances]);

  return <div className="flex flex-col items-center justify-center p-10">{accountDisplay}</div>;
};

export default AccountDisplay;
