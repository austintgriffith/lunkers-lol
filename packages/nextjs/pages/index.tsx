import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10 text-4xl p-10">
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
          <b>🤳 or scan game QR with phone camera to join</b>
        </div>
      </div>
    </>
  );
};

export default Home;
