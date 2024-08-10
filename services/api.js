import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
}));

export const fetchOpenAIResponse = async (prompt) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 100,
  });
  return response.data.choices[0].text;
};

export const fetchGoogleSearchResults = async (query) => {
  const apiKey = process.env.REACT_APP_GOOGLE_SEARCH_API_KEY;
  const cx = process.env.REACT_APP_GOOGLE_SEARCH_CX;
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`;

  try {
    const response = await axios.get(url);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching Google search results", error);
    throw error;
  }
};