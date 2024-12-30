import { type NextApiRequest, type NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import {
  type SpotifyTopArtistsJSON,
  type SpotifyTopTracksJSON,
} from "~/utils/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const spotifyToken = session.accessToken;

    // use token to call spotify api
    const init = {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    } as RequestInit;
    const topArtistsUrl = "https://api.spotify.com/v1/me/top/artists";
    const topTracksUrl = "https://api.spotify.com/v1/me/top/tracks";

    const topArtistsCall = await fetch(topArtistsUrl, init);
    const topTracksCall = await fetch(topTracksUrl, init);

    const artists = (await topArtistsCall.json()) as SpotifyTopArtistsJSON;
    const tracks = (await topTracksCall.json()) as SpotifyTopTracksJSON;

    // console.log("topArtists:", artists);
    // console.log("topTracks:", tracks);

    res.status(200).json({ artists, tracks });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Internal Server Error:", err });
  }
}
