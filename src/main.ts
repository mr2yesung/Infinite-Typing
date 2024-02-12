import "./styles.css";
import { getRandomQuote } from "./API/getRandomQuote";

const quoteAnswer = document.getElementById(
  "quote-answer"
) as HTMLDivElement | null;
const quoteInput = document.getElementById(
  "quote-input"
) as HTMLTextAreaElement | null;

quoteInput?.addEventListener("input", () => {});

async function setNewQuoteAnswer() {
  try {
    const randomQuote: string | null = await getRandomQuote();
    if (!randomQuote) throw new Error("Failed to fetch new quote. Press F5.");
    if (quoteAnswer?.innerHTML == null || quoteInput?.value == null)
      throw new Error(
        "HTML Element required for this web application is null or undefined."
      );

    quoteAnswer.innerHTML = randomQuote;
    quoteInput.value = "";
  } catch (err) {
    console.error(err);
    alert(err);
  }
}
