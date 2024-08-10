import { db } from "@/Firebase/firebaseClient";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import axios from "axios";
import { PROMPTS } from "@/helper/prompts";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const SERP_API_KEY = process.env.NEXT_PUBLIC_SERP_API;
const GNEWS_API_KEY = process.env.GNEWS_API_KEY; // GNews API Key
const TMDB_API_KEY = process.env.TMDB_API_KEY; // TMDB API Key

type Item = {
  type: string;
  content: string;
  date: string;
  headline?: string; // Optional field for headlines
};

const fetchPromptForType = (type: string, date: Date) => {
  console.log(`Fetching prompt for type: ${type} and date: ${date}`);
  switch (type) {
    case "top_songs":
      return PROMPTS.TOP_40_SONGS;
    case "billboard":
      return PROMPTS.BILLBOARD_HOT_100;
    case "impossible_trivia":
      return PROMPTS.IMPOSSIBLE_TRIVIA;
    case "today_in_history":
      return PROMPTS.TODAY_IN_HISTORY(date);
    case "birthdays":
      return PROMPTS.BIRTHDAYS(date);
    case "phone_topics":
      return PROMPTS.PHONE_TOPICS;
    case "public_holidays":
      return PROMPTS.PUBLIC_HOLIDAYS(date);
    case "new_music":
      return PROMPTS.NEW_MUSIC;
    case "would_you_rather":
      return PROMPTS.WOULD_YOU_RATHER;
    case "guess_the_movie_quote":
      return PROMPTS.GUESS_THE_MOVIE_QUOTE;
    case "our_study_says":
      return PROMPTS.OUR_STUDY_SAYS;
    case "weekly_box_office":
      return PROMPTS.WEEKLY_BOX_OFFICE;
    case "entertainment_headlines":
      return PROMPTS.ENTERTAINMENT_HEADLINES;
    case "weird_news":
      return PROMPTS.WEIRD_NEWS;
    case "ai_flashback":
      return PROMPTS.AI_FLASHBACK;
    case "tiktok_trending":
      return PROMPTS.TIKTOK_TRENDING;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

// Fetch Weekly Box Office Chart using TMDB API
const getMovieChart = async (): Promise<string | null> => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        headers: { Authorization: `Bearer ${TMDB_API_KEY}` },
        timeout: 100000,
      }
    );

    const data = response.data;
    let chart = "";
    let i = 1;

    for (const movie of data.results) {
      chart += `Title: ${movie.original_title}, Description: ${movie.overview}, Position: ${i}\n`;
      i++;
    }

    return chart;
  } catch (error) {
    console.error("Error occurred:", error);
    return "Top Box Office Movies";
  }
};

const getHeadlines = async (type: string): Promise<string[]> => {
  console.log(`Fetching ${type} headlines from GNews API...`);
  const category = type === "weird_news" ? "weird" : "entertainment";
  const baseUrl = `https://gnews.io/api/v4/top-headlines?lang=en&category=${category}&apikey=${GNEWS_API_KEY}`;

  try {
    const response = await axios.get(baseUrl);
    console.log(`GNews API Response for ${type} headlines:`, response.data);
    const data = response.data;
    const headlines: string[] = [];

    for (let i = 0; i < Math.min(5, data.articles.length); i++) {
      headlines.push(data.articles[i].title);
    }

    console.log(`Fetched ${type} headlines:`, headlines);
    return headlines;
  } catch (error) {
    console.error(`Error fetching ${type} headlines:`, error);
    return [];
  }
};

const getNews = async (title: string): Promise<string | null> => {
  console.log(`Fetching story for title: ${title}`);
  const baseUrl = `https://gnews.io/api/v4/search?lang=en&q=${title}&apikey=${GNEWS_API_KEY}`;

  try {
    const response = await axios.get(baseUrl);
    console.log("GNews API Response for story:", response.data);
    const data = response.data;

    const story = data.articles[0]?.description || `Latest Buzz on ${title}`;
    console.log(`Fetched story: ${story}`);
    return story;
  } catch (error) {
    console.error("Error occurred while fetching story:", error);
    return `Latest Buzz on ${title}`;
  }
};

const fetchDataFromSerpAPI = async (query: string): Promise<any[]> => {
  console.log(`Fetching data from SerpAPI with query: ${query}`);
  const searchUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(
    query
  )}&api_key=${SERP_API_KEY}`;

  try {
    const response = await axios.get(searchUrl);
    console.log("SerpAPI Response:", response.data);
    return response.data.organic_results || [];
  } catch (error) {
    console.error("Error performing web search on SerpAPI:", error);
    return [];
  }
};

const fetchDataFromOpenAI = async (type: string): Promise<Item[]> => {
  const date = new Date();

  const openAIDirectTypes = [
    "impossible_trivia",
    "today_in_history",
    "birthdays",
    "phone_topics",
    "public_holidays",
    "would_you_rather",
    "guess_the_movie_quote",
    "our_study_says",
    "ai_flashback",
  ];

  if (openAIDirectTypes.includes(type)) {
    console.log(`Fetching data for type: ${type} directly from OpenAI...`);
    const prompt = fetchPromptForType(type, date);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const content = response.choices?.[0].message?.content?.trim();
    console.log("OpenAI Response:", content);

    if (!content)
      throw new Error(`No content received from OpenAI for type: ${type}`);

    return [{ type, content, date: date.toISOString().split("T")[0] }];
  }

  if (type === "entertainment_headlines" || type === "weird_news") {
    console.log(`Fetching ${type}...`);
    const headlines = await getHeadlines(type);

    if (headlines.length === 0) {
      throw new Error(`No ${type} found`);
    }

    const data: Item[] = [];

    for (const headline of headlines) {
      const storyContent = await getNews(headline);

      data.push({
        type,
        content: headline,
        date: date.toISOString().split("T")[0],
      });

      data.push({
        type: `${type}_story`,
        content: storyContent || "No content available",
        headline,
        date: date.toISOString().split("T")[0],
      });
    }
    return data;
  }

  if (type === "weekly_box_office") {
    console.log(`Fetching weekly box office data...`);
    const movieChart = await getMovieChart();

    if (!movieChart) {
      throw new Error("No box office data found");
    }

    return [
      {
        type: "weekly_box_office",
        content: movieChart,
        date: date.toISOString().split("T")[0],
      },
    ];
  }

  const query =
    type === "top_songs"
      ? "site:https://www.officialcharts.com/charts/singles-chart/ Top songs this week"
      : type;

  console.log(`Fetching data from SerpAPI for type: ${type}`);
  const searchResults = await fetchDataFromSerpAPI(query);

  if (searchResults.length === 0) {
    throw new Error(`No search results found for type: ${type}`);
  }

  const prompt = fetchPromptForType(type, date);
  const inputText = searchResults
    .map((result: any) => result.snippet)
    .join("\n\n");

  console.log("Prompt:", prompt);
  console.log("Input text for OpenAI:", inputText);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `${prompt}\n\n${inputText}` }],
    max_tokens: 150,
  });

  const content = response.choices?.[0].message?.content?.trim();
  console.log("OpenAI Response:", content);

  if (!content)
    throw new Error(`No content received from OpenAI for type: ${type}`);

  return [{ type, content, date: new Date().toISOString().split("T")[0] }];
};

export async function GET(
  req: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const { type } = params;

    if (!type) {
      console.error("Type is required");
      return NextResponse.json({ error: "Type is required" }, { status: 400 });
    }

    console.log(`Processing GET request for type: ${type}`);

    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", type));
    const querySnapshot = await getDocs(q);

    console.log(
      `Found ${querySnapshot.docs.length} existing documents of type ${type}. Deleting...`
    );

    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    console.log("Existing documents deleted. Fetching new data...");

    const newData = await fetchDataFromOpenAI(type);

    console.log("New data fetched:", newData);

    const addPromises = newData.map((item, index) => {
      const docRef = doc(itemsRef, `${item.type}_${item.date}_${index}`);
      console.log(`Saving document with ID: ${docRef.id}`);
      return setDoc(docRef, item);
    });
    await Promise.all(addPromises);

    console.log(`${type} updated successfully`);
    return NextResponse.json({ message: `${type} updated successfully` });
  } catch (error: any) {
    console.error("Error updating items:", error);
    return NextResponse.json(
      { error: `Failed to update : ${error.message}` },
      { status: 500 }
    );
  }
}
