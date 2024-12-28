import { NextApiRequest, NextApiResponse } from "next";
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
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  });

  const message =
    chatCompletion.choices[0]?.message ?? "No message from Open AI!";

  res.status(200).json({
    message: message,
  });
}
const artists: string[] = [];
const tracksInfo: string[] = [];

const INITIAL_CONTEXT = `
Given the following artists: ${artists.join(", ")} and the following tracks (with artist names and track names) ${JSON.stringify(
  tracksInfo,
  null,
  2,
)},
Have a conversation wherein you make recommendations to the person you're speaking to about their mood
and based on their mood, create a playlist
`;

console.log(INITIAL_CONTEXT);

// Python SDK reference
/*
     completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": f"Speak as if you are a {role}."},
            {"role": "user", "content": content},
        ],
        max_tokens=100,
    )
 */

// Golang SDK reference
/*
    chatCompletion, err := client.Chat.Completions.New(context.TODO(), openai.ChatCompletionNewParams{
            Messages: openai.F([]openai.ChatCompletionMessageParamUnion{
                openai.UserMessage(userMessage),
            }),
            Model:     openai.F(openai.ChatModelGPT3_5Turbo),
            MaxTokens: openai.F(int64(100)),
        })
*/
