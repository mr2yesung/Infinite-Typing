import "./styles.css";
import { getRandomQuote } from "./API/getRandomQuote";
import { quoteCharacterClassName } from "./contants";
import { Timer } from "./Class/Timer";

const quoteAnswer = document.getElementById("quote-answer") as HTMLDivElement;
const quoteInput = document.getElementById(
  "quote-input"
) as HTMLTextAreaElement;
const timerElement = document.getElementById("timer") as HTMLDivElement;

const timer: Timer = new Timer(timerElement);

quoteInput.addEventListener("input", () => {
  if (checkAnswer()) setNewQuoteAnswer();
});
setNewQuoteAnswer();

async function setNewQuoteAnswer(): Promise<void> {
  try {
    const randomQuote: string | null = await getRandomQuote();
    if (!randomQuote) throw new Error("Failed to fetch new quote. Press F5.");

    quoteAnswer.innerHTML = "";
    quoteInput.value = "";

    const characterSpans: HTMLSpanElement[] = randomQuote
      .split("")
      .map<HTMLSpanElement>((char) => {
        const characterSpan: HTMLSpanElement = document.createElement("span");
        characterSpan.innerText = char;
        return characterSpan;
      });

    quoteAnswer.append(...characterSpans);

    timer.startTimer(new Date());
  } catch (err) {
    console.error(err);
    alert(err);
  }
}

function checkAnswer(): boolean {
  const quoteCharacterSpans: NodeListOf<HTMLSpanElement> =
    quoteAnswer.querySelectorAll<HTMLSpanElement>("span");
  const inputCharacterArray: string[] = quoteInput.value.split("");

  let correct: boolean = true;
  quoteCharacterSpans.forEach((characterSpan, index) => {
    if (!inputCharacterArray[index]) {
      characterSpan.classList.remove(quoteCharacterClassName.correct);
      characterSpan.classList.remove(quoteCharacterClassName.incorrect);
      correct = false;
    } else if (inputCharacterArray[index] === characterSpan.innerText) {
      characterSpan.classList.add(quoteCharacterClassName.correct);
      characterSpan.classList.remove(quoteCharacterClassName.incorrect);
    } else {
      characterSpan.classList.remove(quoteCharacterClassName.correct);
      characterSpan.classList.add(quoteCharacterClassName.incorrect);
      correct = false;
    }
  });

  return correct;
}
