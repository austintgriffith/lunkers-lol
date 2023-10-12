import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  const [knownFishingHoles] = useLocalStorage("knownFishingHoles", [""]);

  const defaultElements: JSX.Element[] = [];
  const [allFishingHolesDisplay, setAllFishingHolesDisplay] = useState(defaultElements);

  useEffect(() => {
    const allHoles: JSX.Element[] = [];
    for (let i = 0; i < knownFishingHoles.length; i++) {
      if (knownFishingHoles[i] !== "") {
        console.log("knownFishingHoles[]", i, knownFishingHoles[i]);
        allHoles.push(
          <div className="p-4">
            <a href={"/" + knownFishingHoles[i]}></a>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => {
                window.location.href = "/" + knownFishingHoles[i];
              }}
            >
              {"💾 load "}
              {knownFishingHoles[i]}
            </button>
          </div>,
        );
      }
    }
    setAllFishingHolesDisplay(allHoles);
  }, [knownFishingHoles]);

  return (
    <>
      <MetaHeader />

      <div
        className="absolute bg-cover h-screen w-screen bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/background.png')" }}
      ></div>

      <div className="flex items-center flex-col flex-grow pt-10 text-4xl p-10 z-20">
        <div className="p-10">
          <button
            className="btn btn-primary btn-lg "
            onClick={async () => {
              window.location.href = "/" + Math.random().toString(36).substring(7);
            }}
          >
            🎣 Create Game
          </button>
        </div>

        <div className="p-10 text-xs">
          {" "}
          <b>🤳 or scan QR with camera to join</b>
        </div>

        <div className="p-10">{allFishingHolesDisplay}</div>
      </div>
    </>
  );
};

export default Home;
