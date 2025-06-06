import OpenAI from "openai";
import { URL_PERPLEXITY } from "../constants/openia/openia.constant";

const OPENIA_API_KEY = Bun.env.OPENIA_API_KEY;

if (!OPENIA_API_KEY) {
  throw new Error("Perplexity API_KEY must be provided in .env file");
}

export const openaiClient = new OpenAI({
  apiKey: OPENIA_API_KEY,
  baseURL: URL_PERPLEXITY,
});
