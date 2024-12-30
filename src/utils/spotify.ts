/* eslint-disable @typescript-eslint/no-explicit-any */
export type SpotifyTopArtistsJSON = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
  items: Array<{
    external_urls: {
      spotify: string;
    };
    followers: {
      href: any;
      total: number;
    };
    genres: Array<string>;
    href: string;
    id: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }>;
};

export type SpotifyTopTracksJSON = {
  items: Array<{
    album: {
      album_type: string;
      artists: Array<{
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }>;
      available_markets: Array<string>;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: Array<{
        height: number;
        url: string;
        width: number;
      }>;
      is_playable: boolean;
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: Array<{
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: any;
    track_number: number;
    type: string;
    uri: string;
  }>;
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string;
  previous: any;
};

export type SpotifyTopItems = {
  artists: SpotifyTopArtistsJSON;
  tracks: SpotifyTopTracksJSON;
};

export const getContext = (topItems: SpotifyTopItems): string => {
  const artistsStr = topItems.artists.items.map((i) => i.name).toString();
  const tracksStr = topItems.tracks.items
    .map((t) => {
      const { name, artists } = t;
      const returnObj = {
        name,
        artists: artists.map((a) => a.name).join(","),
      };

      return JSON.stringify(returnObj, null, 2);
    })
    .toString();

  const context = `
  Given the following artists: ${artistsStr} and the following tracks (with artist names and track names) ${tracksStr},
  Have a conversation wherein you make recommendations to the person you're speaking to about their mood
  and based on their mood, create a playlist
  `;

  // console.log(context);
  return context;
};
