const URL_RANDOM_QUOTE = "http://api.quotable.io/random";

async function getRandomQuote(): Promise<string | null> {
  try {
    const response: Response = await fetch(URL_RANDOM_QUOTE);
    if (!response.ok) throw new Error("fetch failed");
    const data: { content: string } = await response.json();
    return data.content;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { getRandomQuote };
