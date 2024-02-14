const TIMER_UPDATE_INTERVAL = 1000;

class Timer {
  timerElement: HTMLDivElement;
  timer: number | null;

  constructor(timerElement: HTMLDivElement) {
    this.timerElement = timerElement;
    this.timer = null;
  }

  startTimer(startDate: Date): void {
    this.timerElement.innerText = "0";
    this.clearTimer();

    this.timer = setInterval(() => {
      const currentDate: Date = new Date();
      this.timerElement.innerText = `${Math.floor(
        (currentDate.getTime() - startDate.getTime()) / 1000
      )}`;
    }, TIMER_UPDATE_INTERVAL);
  }

  clearTimer(): void {
    if (this.timer != null) console.log("delete tiemr");
  }
}

export { Timer };
