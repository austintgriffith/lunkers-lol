import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  const navLinks = <></>;

  const router = useRouter();

  if (router.query.fishingholes) {
    return (
      <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
        <div className="navbar-start w-auto lg:w-1/2">
          <Link
            href={"/" + router.query.fishingholes}
            passHref
            className="flex lg:flex items-center gap-2 ml-4 mr-6 shrink-0"
          >
            <div className="flex relative w-10 h-10 text-4xl">🐟</div>
            <div className="flex flex-col">
              <span className="font-bold leading-tight">{router.query.fishingholes}</span>
              <span className="text-xs">FishingParty.xyz</span>
            </div>
          </Link>
          <ul className="lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>
        <div className="navbar-end flex-grow mr-4">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>
    );
  } else {
    return (
      <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
        <div className="navbar-start w-auto lg:w-1/2">
          <Link href="/" passHref className="flex lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
            <div className="flex relative w-10 h-10 text-4xl">🐟</div>
            <div className="flex flex-col">
              <span className="font-bold leading-tight">FishingParty.xyz</span>
              <span className="text-xs">catching lunkers with friends onchain</span>
            </div>
          </Link>
          <ul className="lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>
        <div className="navbar-end flex-grow mr-4">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>
    );
  }
};
