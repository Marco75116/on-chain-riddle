import { openaiClient } from "../../clients/openia.client";
import {
  MODEL_AI,
  messageUser,
  systemInstructions,
} from "../../constants/openia/openia.constant";

export const getMessageOpenAI = (messageUser: string) => {
  return [
    {
      role: "system",
      content: systemInstructions,
    },
    {
      role: "user",
      content: messageUser,
    },
  ];
};

export const getOpenAIResponse = async () => {
  const messages = getMessageOpenAI(messageUser);

  const responseOpenai = await openaiClient.chat.completions.create({
    model: MODEL_AI,
    messages: messages as never,
    temperature: 1.99,
    max_tokens: 150,
    frequency_penalty: 0.5,
  });

  return responseOpenai.choices[0].message.content;
};
