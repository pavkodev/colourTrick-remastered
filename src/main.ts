// Audio variables for use in game
const audioPress: HTMLAudioElement = new Audio("./assets/audio/press.mp3");
const audioFail: HTMLAudioElement = new Audio("./assets/audio/fail.mp3");

//If a highscore doesn't exist, set it to 0.
if (localStorage.getItem("highscore") === null) {
  localStorage.setItem("highscore", "0");
}

const soundToggle = document.getElementById(
  "setting-sound",
) as HTMLInputElement;

if (soundToggle) {
  soundToggle.addEventListener("change", () => {
    if (soundToggle.checked) {
      localStorage.setItem("soundOption", "sound");
    } else {
      localStorage.setItem("soundOption", "nosound");
    }
  });
}

const soundOption: string = localStorage.getItem("soundOption")!;

if (soundOption == "sound") {
  //Lowering volume to avoid blowing player's ears off (first-hand experience)
  audioPress.volume = 0.25;
  audioFail.volume = 0.25;
} else {
  audioPress.volume = 0.0;
  audioFail.volume = 0.0;
}

//Round variable object
type roundVariables = {
  colour: string;
  word: string;
};

class Game {
  //Variable for referencing game prompt parapgraph element
  private prompt = document.getElementById(
    "game-prompt",
  )! as HTMLParagraphElement;

  //Variable for referencing timer parapgraph element
  private timerDisplay = document.getElementById(
    "game-timer",
  )! as HTMLParagraphElement;

  //Variable for referencing score parapgraph element
  private scoreDisplay = document.getElementById(
    "game-score",
  )! as HTMLParagraphElement;

  //Variable for referencing post-game buttons
  private gameButtons = document.getElementById(
    "game-buttons",
  )! as HTMLDivElement;

  private updateInterval: number | undefined; //Interval variable (can either be a number or undefined)
  private countdownValue: number = 20; //Amount of seconds for round
  private timer: number = Date.now() + 1000 * this.countdownValue; //Timer tracker
  private highscore = localStorage.getItem("highscore") as string;
  private addedTime = 0.75; //Time added on correct input
  private score: number = 0; //Score tracker
  private gameOver: boolean = false; //Flag to check if game is over or not
  //Array of colours used
  private colours: string[] = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "pink",
    "cyan",
    "purple",
  ];

  //Class constructor generates initial game round and starts timer
  constructor() {
    this.manageGameRound(this.generateGameRound());
    this.manageTimer();
    this.scoreDisplay.textContent = "Score: 0";
  }

  //Methods for generating random colour and word
  private generateRandomColour = (): string => {
    return this.colours[Math.floor(Math.random() * this.colours.length)];
  };

  private generateRandomWord = (): string => {
    return this.colours[Math.floor(Math.random() * this.colours.length)];
  };

  //Method combining word and colour generators
  private generateGameRound = (): roundVariables => {
    return {
      colour: this.generateRandomColour(),
      word: this.generateRandomWord(),
    };
  };

  //Method to set timer <p> element to display timer value
  private setTimer = (value: number) => {
    this.timerDisplay.textContent = parseFloat(String(value)).toFixed(2);
  };

  //Method for updating timer
  private manageTimer = () => {
    this.updateInterval = setInterval(() => {
      const currentTime: number = Date.now(); //Stores current time to compare to start time
      const timeLeft: number = (this.timer - currentTime) / 1000; //Checks difference between current time and start time
      //While there is time left, update the timer
      if (timeLeft > 0) {
        this.setTimer(timeLeft);
        //Otherwise set game over state and clear interval
      } else {
        this.setTimer(0);
        console.log("Time is 0");
        this.manageGameOver();
        clearInterval(this.updateInterval);
      }

      if (timeLeft < 5) {
        this.timerDisplay.classList.add("animate-low-time");
      }
    }, 25);
  };

  //Method for adding time to timer for correct guesses
  private increaseTimer = (addedSeconds: number) => {
    clearInterval(this.updateInterval);
    this.timer += addedSeconds * 1000;
    this.manageTimer();
  };

  //Manages game state when user loses
  private manageGameOver = () => {
    clearInterval(this.updateInterval);
    audioFail.play();
    this.prompt.textContent = "Game Over";
    console.log("Game over");
    //Remove key listener
    document.onkeydown = null;

    if (this.score > Number(this.highscore)) {
      localStorage.setItem("highscore", this.score.toString());
    }
    //show post-game buttons
    this.gameButtons.style.visibility = "visible";

    //Remove prompt display animation so that it can be played again
    this.prompt.classList.remove("animate-prompt");
  };

  //Manages game round generation and display
  private manageGameRound = ({ colour, word }: roundVariables): void => {
    //Hide post-game buttons
    this.gameButtons.style.visibility = "hidden";
    const isColourWordMatch: boolean = colour === word; //Boolean of if colour and word match or not
    //Display the correct word
    this.prompt.textContent = word.toUpperCase();

    this.prompt.classList.add("animate-prompt");
    //Reset classes at start of each round
    this.prompt.classList.remove(
      "text-red-500",
      "text-orange-500",
      "text-yellow-500",
      "text-green-500",
      "text-blue-500",
      "text-pink-500",
      "text-cyan-500",
      "text-purple-500",
    );

    //Add desired tailwind classes for font colour
    this.prompt.classList.add(`text-${colour}-500`);

    document.onkeydown = (input) => {
      //If user enters the right inputs for match and mismatch in word-colour combos,
      //increase score and time, and generate new round
      if (
        (input.key == "ArrowLeft" && isColourWordMatch) ||
        (input.key == "ArrowRight" && !isColourWordMatch)
      ) {
        audioPress.pause();
        audioPress.currentTime = 0;
        audioPress.play();

        //Remove prompt display animation so that it can be played again
        this.prompt.classList.remove("animate-prompt");
        this.prompt.offsetHeight;

        this.score++;
        this.scoreDisplay.textContent = `Score: ${this.score}`;
        this.increaseTimer(this.addedTime);
        this.manageGameRound(this.generateGameRound());
      }
      //If the user enters wrong input, call game-over manager method
      //(also happens if user runs out of time, managed by manageTimer())
      else if (
        (input.key == "ArrowLeft" && !isColourWordMatch) ||
        (input.key == "ArrowRight" && isColourWordMatch)
      ) {
        this.manageGameOver();
      }
    };
  };
}

const loadSettings = () => {
  switch (localStorage.getItem("soundOption")) {
    case "sound":
      soundToggle.checked = true;
      break;
    case "nosound":
      soundToggle.checked = false;
      break;
  }
};

const loadHighscore = () => {
  document.getElementById("highscore")!.textContent =
    `Highscore: ${localStorage.getItem("highscore")}`;
};

const loadData = () => {
  loadSettings();
  loadHighscore();
};

const toggleDisplayOptions = () => {
  const settings = document.getElementById("game-settings") as HTMLDivElement;
  const visibility = window.getComputedStyle(settings).visibility;
  console.log(settings.style.visibility + "-desu");
  if (visibility === "hidden") {
    settings.style.visibility = "visible";
  } else if (visibility === "visible") {
    settings.style.visibility = "hidden";
  }
};

const startGame = () => {
  const game = new Game();
};
