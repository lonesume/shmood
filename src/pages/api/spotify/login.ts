import { NextApiRequest, NextApiResponse } from "next";

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID ?? "";
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const spotifyRedirectUri = process.env.SPOTIFY_REDIRECT_URI ?? "";
const spotifyScope = process.env.SPOTIFY_SCOPE ?? "";
// TODO(lonesume): Need to add redirect url for production url for spotify portal!!!!!!
if (
  !spotifyClientId ||
  !spotifyClientSecret ||
  !spotifyRedirectUri ||
  !spotifyScope
) {
  const message = `Invalid for Spotify in environment variables :(
  \nclientID was <${spotifyClientId}>
  ,\nclientSecret was <${spotifyClientSecret}>
  ,\nspotifyRedirectUri was <${spotifyRedirectUri}>
  ,\nspotifyScope was <${spotifyScope}> `;
  throw new Error(message);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //   var state = generateRandomString(16);

  //   const scope = "user-top-read user-read-recently-played user-library-modify";

  const response = res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: spotifyClientId,
        client_secret: spotifyClientSecret,
        scope: spotifyScope,
        redirect_uri: spotifyRedirectUri,
        response_type: "code",
      }),
  );
}
