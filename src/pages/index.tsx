import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export type SpotifyToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export type SpotifyUserProfile = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  product: string;
  type: string;
  uri: string;
};

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const { data: session } = useSession();

  // const [message, setMessage] = useState("");
  const [userProfile, setUserProfile] = useState({} as SpotifyUserProfile);
  const router = useRouter();

  // useEffect(() => {
  //   fetch("/api/openai")
  //     .then((res) => res.json())
  //     .then((data: { message: { content: string; role: string } }) => {
  //       console.log(data);
  //       setMessage(data.message.content);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const getProfile = useCallback(async () => {
    // let accessToken = localStorage.getItem("access_token");

    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    });

    const data = await response.json();
    console.log("User profile", data);
    setUserProfile(data);
  }, [session?.accessToken]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>

          <p className="text-2xl text-white">
            {/* {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
            {/* {`From GPT: ${message}`} */}
          </p>

          {/* TODO(steevejoseph): simplify */}
              Issue URL: https://github.com/lonesume/shmood/issues/7
          <div className="text-white">
            {!session ? (
              <button onClick={() => signIn("spotify")}>
                Sign in with Spotify
              </button>
            ) : (
              <>
                <button onClick={() => signOut()}>Sign out</button>
                <button onClick={getProfile} disabled={!session}>
                  Get User Profile
                </button>
                {userProfile && Object.keys(userProfile).length > 0 && (
                  <pre>{JSON.stringify(userProfile, null, 2)}</pre>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
