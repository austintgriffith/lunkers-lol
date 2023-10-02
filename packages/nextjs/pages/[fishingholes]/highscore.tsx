import { useRouter } from "next/router";
import { NextPage } from "next";

const Highscore: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">{router.query.fishingholes}</h1>
    </div>
  );
};

export default Highscore;
