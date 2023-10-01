import type { NextApiRequest, NextApiResponse } from "next";

let allStorage: string[] = [""];

//object with address as key and timestamp as value
const timestamps: { [key: string]: number } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  console.log("Checkin from ", req.body);
  if (allStorage.indexOf(req.body.address) <= -1) {
    allStorage = [...allStorage, req.body.address];
  }
  const currentTime = new Date().getTime();
  //console.log("currentTime", currentTime);
  //console.log("allStorage", allStorage);

  timestamps[req.body.address] = currentTime;

  //github.com/austintgriffith/scaffold-eth
  https: for (let i = 0; i < allStorage.length; i++) {
    //check if time is older than 2 minutes
    //console.log("timestamp is ", timestamps[allStorage[i]]);
    //console.log("time diff is ", currentTime - timestamps[allStorage[i]]);
    //console.log("looking up allStorage[i]", i, allStorage[i]);
    if (timestamps[allStorage[i]] && currentTime - timestamps[allStorage[i]] > 30000) {
      //console.log("CUTTING OUT ", allStorage[i]);
      allStorage.splice(i, 1);
      delete timestamps[allStorage[i]];
    }
  }

  res.status(200).json({ message: "Hello from Next.js!", allStorage });
}
