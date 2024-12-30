import { type NextApiRequest, type NextApiResponse } from "next";
import OpenAI from "openai";

const apiKey = process.env.SHMOOD_V2_OPENAI_KEY;

if (!apiKey) {
  throw new Error("No API key found for OpenAI in environment variables :(");
}

const client = new OpenAI({
  apiKey,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let query = req.query;
  let context = query.context as string;
  // console.log("query:", query);

  const chatCompletion = await client.chat.completions.create({
    messages: [
      { role: "user", content: "Say this is a test" },
      { role: "user", content: context },
    ],

    model: "gpt-3.5-turbo",
  });

  const message =
    chatCompletion.choices[0]?.message ?? "No message from Open AI!";

  res.status(200).json({
    message: message,
  });
}
