import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { public_token } = req.body;

  const response = await fetch("http://localhost:5000/api/exchange_public_token", {
    // Replace with your backend URL
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ public_token }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
