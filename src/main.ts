// Audio variables for use in game
const audioPress: HTMLAudioElement = new Audio("./assets/audio/press.mp3");
const audioFail: HTMLAudioElement = new Audio("./assets/audio/fail.mp3");

//Lowering volume to avoid blowing player's ears off (first-hand experience)
audioPress.volume = 0.25;
audioFail.volume = 0.25;

//Round variable object
type roundVariables = {
  colour: string;
  word: string;
};

class Game {
  //Variable for referencing game prompt parapgraph element
  private prompt = document.getElementById(
    "game-prompt",
  ) as HTMLParagraphElement;

  //Variable for referencing timer parapgraph element
  private timerDisplay = document.getElementById(
    "game-timer",
  )! as HTMLParagraphElement;

  private updateInterval: number | undefined; //Interval variable (can either be a number or undefined)
  private countdownValue: number = 20; //Amount of seconds for round
  private timer: number = Date.now() + 1000 * this.countdownValue; //Timer tracker
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
      const timeLeft: number = this.timer - currentTime; //Checks difference between current time and start time
      //While there is time left, update the timer
      if (timeLeft > 0) {
        this.setTimer(timeLeft / 1000);
        //Otherwise set game over state and clear interval
      } else {
        this.setTimer(0);
        console.log("Time is 0");
        this.manageGameOver();
        clearInterval(this.updateInterval);
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
    document.onkeydown = null; //Remove key listener
  };

  //Manages game round generation and display
  private manageGameRound = ({ colour, word }: roundVariables): void => {
    const isColourWordMatch: boolean = colour === word; //Boolean of if colour and word match or not
    //Display the correct word
    this.prompt.textContent = word;

    //Reset classes at start of each round
    this.prompt.className = "";

    //Add desired tailwind classes for font colour
    this.prompt.className = `stroke-black text-8xl text-${colour}-500`;

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
        this.score++;
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

const randomColour = (): string => {
  let random: number = Math.floor(Math.random() * 8);
  const colour: string[] = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "pink",
    "cyan",
    "purple",
  ];
  return colour[random];
};

const randomWord = (): string => {
  let random: number = Math.floor(Math.random() * 8);
  const word: string[] = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "pink",
    "cyan",
    "purple",
  ];
  return word[random];
};

//function for displaying game prompt.
const displayRound = (displayVariables: roundVariables) => {
  const colour = displayVariables.colour;
  const word = displayVariables.word;
  const prompt = document.getElementById("game-prompt") as HTMLParagraphElement;

  if (prompt) {
    // Remove all previous classes if they exist
    prompt.classList.remove(
      "text-red-500",
      "text-orange-500",
      "text-yellow-500",
      "text-green-500",
      "text-blue-500",
      "text-pink-500",
      "text-cyan-500",
      "text-purple-500",
    );

    // Set the prompt to the generated colour
    prompt.textContent = word;

    //Set the font colour of word to the generated colour
    switch (colour) {
      case "red":
        prompt.classList.add("text-red-500");
        break;
      case "orange":
        prompt.classList.add("text-orange-500");
        break;
      case "yellow":
        prompt.classList.add("text-yellow-500");
        break;
      case "green":
        prompt.classList.add("text-green-500");
        break;
      case "blue":
        prompt.classList.add("text-blue-500");
        break;
      case "pink":
        prompt.classList.add("text-pink-500");
        break;
      case "cyan":
        prompt.classList.add("text-cyan-500");
        break;
      case "purple":
        prompt.classList.add("text-purple-500");
        break;
    }
  }
};

//Generate game on script load
const game = new Game();
