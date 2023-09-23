import type { NextApiRequest, NextApiResponse } from "next";

let allStorage = [""];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Checkin from ", req.body);
  if (allStorage.indexOf(req.body.address) <= -1) {
    allStorage = [...allStorage, req.body.address];
  }
  console.log("allStorage", allStorage);

  res.status(200).json({ message: "Hello from Next.js!", allStorage });
}
