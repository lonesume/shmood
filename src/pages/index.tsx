import { error } from "console";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/openai")
      .then((res) => res.json())
      .then((data: { message: { content: string; role: string } }) => {
        console.log(data);
        setMessage(data.message.content);
      })
      .catch((err) => console.log(err));
  }, []);

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
            {`From GPT: ${message}`}
          </p>
        </div>
      </main>
    </>
  );
}
