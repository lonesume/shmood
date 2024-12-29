import { NextApiRequest, NextApiResponse } from "next";

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID ?? "";
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? "";

if (!spotifyClientId || !spotifyClientSecret) {
  const message = `Invalid for Spotify in environment variables :(\nclientID was <${spotifyClientId}>, clientSecret was <${spotifyClientSecret}>`;
  throw new Error(message);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: spotifyClientId,
      client_secret: spotifyClientSecret,
    }),
  });
  const data = await response.json();
  res.status(200).json(data);
}
