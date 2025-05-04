import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch("http://localhost:5000/api/create_link_token", {
    // Replace with your backend URL
    method: "POST",
  });

  const data = await response.json();
  res.status(200).json(data);
}
