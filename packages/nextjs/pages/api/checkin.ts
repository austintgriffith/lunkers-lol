import type { NextApiRequest, NextApiResponse } from "next";

const localMemory: { [key: string]: any[] } = {};
//object with address as key and timestamp as value
const timestamps: { [key: string]: number } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  console.log("/api/checkin from ", req.body);
  const fishingHole = req.body.fishingHole || "DEFAULTFISHINGHOLE?";
  if (!localMemory[fishingHole]) {
    localMemory[fishingHole] = [];
  }
  if (localMemory[fishingHole].indexOf(req.body.address) <= -1) {
    localMemory[fishingHole] = [...localMemory[fishingHole], req.body.address];
  }
  const currentTime = new Date().getTime();
  //console.log("currentTime", currentTime);
  //console.log("allStorage", allStorage);

  timestamps[req.body.address] = currentTime;

  //github.com/austintgriffith/scaffold-eth
  https: for (let i = 0; i < localMemory[fishingHole].length; i++) {
    //check if time is older than 2 minutes
    //console.log("timestamp is ", timestamps[allStorage[i]]);
    //console.log("time diff is ", currentTime - timestamps[allStorage[i]]);
    //console.log("looking up allStorage[i]", i, allStorage[i]);
    if (timestamps[localMemory[fishingHole][i]] && currentTime - timestamps[localMemory[fishingHole][i]] > 30000) {
      //console.log("CUTTING OUT ", allStorage[i]);
      localMemory[fishingHole].splice(i, 1);
      delete timestamps[localMemory[fishingHole][i]];
    }
  }

  res.status(200).json({ message: "Hello from Next.js!", allStorage: localMemory[fishingHole] });
}
