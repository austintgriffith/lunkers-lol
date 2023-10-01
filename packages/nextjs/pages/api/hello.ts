import type { NextApiRequest, NextApiResponse } from "next";

let allStorage: string[] = [""];

//object with address as key and timestamp as value
const timestamps: { [key: string]: number } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  console.log("Checkin from ", req.body);
  if (allStorage.indexOf(req.body.address) <= -1) {
    allStorage = [...allStorage, req.body.address];
  }
  req.body.timestamp = new Date().getTime();
  console.log("allStorage", allStorage);

  for (let i = 0; i < allStorage.length; i++) {
    //check if time is older than 2 minutes
    if (timestamps[allStorage[i]] && req.body.timestamp - timestamps[allStorage[i]] > 120000) {
      allStorage.splice(i, 1);
      delete timestamps[allStorage[i]];
    }
  }

  res.status(200).json({ message: "Hello from Next.js!", allStorage });
}
