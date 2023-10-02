import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />

      <div
        className="absolute bg-cover h-screen w-screen bg-no-repeat z-10 opacity-30"
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
      </div>
    </>
  );
};

export default Home;
