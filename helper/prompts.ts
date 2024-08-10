// prompts.ts

export const PROMPTS = {
  TOP_40_SONGS: `
    create short list of this week's UK top 3 songs, only give me the list
  `,
  TIKTOK_TRENDING: `Create a list of trending TikTok video URLs. Only give me the list.`,

  BILLBOARD_HOT_100: `
    create short list of this week's Billboard Hot 100 top 3 songs, only give me the list
  `,
  IMPOSSIBLE_TRIVIA: `
    as an example for trivia: One in five couples do this every night? (Sleep in separate rooms), here's another example: "Can you name three consecutive days without using the words Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, or Sunday? (Answer: Yesterday, Today and Tomorrow)"
    continue and give me 5 random trivia with answers', only give me the list
  `,
  TODAY_IN_HISTORY: (date: Date) => `
    give a brief bullet point list of what has happened on day ${date.getDate()}, month ${
    date.getMonth() + 1
  } in the history 5 years ago, 10 years ago, 15 years ago, and 20 years ago
  `,
  BIRTHDAYS: (date: Date) => `
    List the famous birthdays for ${date.toDateString()} in the following format:

- [Profession/Role] **[Name]** turns [Age]
- [Profession/Role] **[Name]** turns [Age]
- [Profession/Role] **[Name]** turns [Age]

Ensure that each entry follows this structure without any additional characters or symbols. The list should be easy to read and consistent.

  `,
  PHONE_TOPICS: `
    pretend that you're a radio presenter and want to encourage people to call in, list 5 conversation topics that are observations or inspiring
  `,
  PUBLIC_HOLIDAYS: (date: Date) => `
    list 5 public and funny holidays for day ${date.getDate()} month ${
    date.getMonth() + 1
  } around the world, only give me the list
  `,
  NEW_MUSIC: `
    list 5 most trending new music releases of today, only give me the list
  `,
  WOULD_YOU_RATHER: `
    generate one random and creative 'would you rather' question, example: "Would you rather be able to play any instrument you pick up or learn any language you want in a matter of days?"
  `,
  GUESS_THE_MOVIE_QUOTE: `
    give me the short quote from a famous movie from the past 30 years and list the answer in (brackets like this) example: "I like that boulder, that is a nice boulder." (Answer: Shrek 1)
  `,
  OUR_STUDY_SAYS: `
    give me a similar funny study result like example: (only give the study, not the assistant answer)
    - According to a new study, three out of ten people don’t actually know this about their partner. What is it?
    - A) How much they weigh
    - B) How much they earn - ANSWER
    - C) How much they drink
  `,
  WEEKLY_BOX_OFFICE: `
    list 5 most watched movies and tv shows this week, only give me the list
  `,
  ENTERTAINMENT_HEADLINES: `
    get 5 entertainment headlines from today
  `,
  ENTERTAINMENT_STORY: (headline: string) => `
    get the entertainment story from headline: ${headline}
  `,
  WEIRD_NEWS: `
   get 5 weird news headlines from today

	example

	- New Study Has Found The Best Alarm Clock Sound To Use
	or NEW STUDY FINDS STAR SIGNS MOST LIKELY TO WIN THE LOTTERY
  `,
  WEIRD_NEWS_STORY: (headline: string) => `
    get the weird entertainment story from headline: ${headline}
    example

	A new study has concluded that Pisces were the luckiest people last year with more lottery wins than any other star sign on the charts.
	Data crunched by experts shows which star sign took home the most division one prizes in 2020, and it’s not looking great for Sagittarius.
	Those born between February 19 and March 20 won 11.6 per cent of top lottery prizes during the study period analyzed.
	Not far behind Pisces were Gemini players who scored 9.9 per cent of division one wins, with Virgo following closely with 8.9 per cent.
	Just after that was the Aquarius star sign, with 8.5 per cent.
	Only 6 per cent of division one winners were Sagittarians, making them the unluckiest star sign if you want to win big.
	Lott spokesperson Lauren Cooney said it would be interesting to see if these winning trends continued for the different star signs.
	“Pisces are typically considered to be generous and empathetic in nature, with a deep sense of kindness and compassion” she explained.
	“It would be interesting to know if these traits transcended with their lottery windfalls and they shared their prizes with their loved ones.
  `,
  AI_FLASHBACK: `
    act as a radio presenter and prepare a short talk break for the following:
    find out one popular song from the billboard top 100, random year between 1980 and 2024 and create a talk break about this song, use no more than 80 words
  `,
};
