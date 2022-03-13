export default class Timer {
  private el: {
    minutes: HTMLSpanElement;
    seconds: HTMLSpanElement;
    control: HTMLButtonElement;
    reset: HTMLButtonElement;
  };
  private interval: number | undefined;
  private remainingSeconds: number;

  constructor(root: HTMLDivElement) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector<HTMLSpanElement>(".timer__part--minutes")!,
      seconds: root.querySelector<HTMLSpanElement>(".timer__part--seconds")!,
      control: root.querySelector<HTMLButtonElement>(".timer__btn--control")!,
      reset: root.querySelector<HTMLButtonElement>(".timer__btn--reset")!,
    };

    this.interval = undefined;
    this.remainingSeconds = 0;

    this.el.control.addEventListener("click", () => {
      if (!this.interval) {
        this.start();
      } else {
        this.stop();
      }
    });
    this.el.reset.addEventListener("click", () => {
      const inputMinutes = prompt("Enter number of minutes:");
      if (!inputMinutes) return;
      if (parseInt(inputMinutes) < 60) {
        this.stop();
        this.remainingSeconds = parseInt(inputMinutes) * 60;
        this.updateInterfaceTime();
      }
    });
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (!this.interval) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer__btn--start");
      this.el.control.classList.remove("timer__btn--stop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timer__btn--stop");
      this.el.control.classList.remove("timer__btn--start");
    }
  }

  start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = undefined;

    this.updateInterfaceControls();
  }

  static getHTML() {
    return `
      <span class="timer__part timer__part--minutes">00</span>
      <span class="timer__part">:</span>
      <span class="timer__part timer__part--seconds">00</span>
      <button type="button" class="timer__btn timer__btn--control timer__btn--start">
        <span class="material-icons">play_arrow</span>
      </button>
      <button type="button" class="timer__btn timer__btn--reset">
        <span class="material-icons-outlined">timer</span>
      </button>
    `;
  }
}
