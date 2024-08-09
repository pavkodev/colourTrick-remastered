// Audio variables for use in game
const audioPress = document.getElementById("press") as HTMLAudioElement;
const audioFail = document.getElementById("fail") as HTMLAudioElement;

//Round variable object
interface roundVariables {
  colour: string;
  word: string;
}

class Game {
  //Variable for referencing game prompt parapgraph element
  private prompt = document.getElementById(
    "game-prompt",
  ) as HTMLParagraphElement;

  //Variable for referencing timer parapgraph element
  private timer = document.getElementById("game-timer") as HTMLParagraphElement;

  private score = 0;
  private gameOver: number = 0;
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

  constructor() {
    this.manageGameRound(this.generateGameRound());
  }

  private generateRandomColour(): string {
    return this.colours[Math.floor(Math.random() * this.colours.length)];
  }

  private generateRandomWord(): string {
    return this.colours[Math.floor(Math.random() * this.colours.length)];
  }

  //Change to private after
  public generateGameRound(): roundVariables {
    return {
      colour: this.generateRandomColour(),
      word: this.generateRandomWord(),
    };
  }

  public manageGameRound = ({ colour, word }: roundVariables): void => {
    const variablesMatch: boolean = colour == word ? true : false;
    //Display the correct word
    this.prompt.textContent = word;

    //Reset classes at start of each round
    this.prompt.className = "";

    //Add desired tailwind classes for font colour
    this.prompt.className = `stroke-black text-${colour}-500`;

    document.onkeydown = (input) => {
      if (
        (input.key == "ArrowLeft" && variablesMatch) ||
        (input.key == "ArrowRight" && !variablesMatch)
      ) {
        this.score++;
        this.manageGameRound(this.generateGameRound());
      }
      //Add "if timer reaches 0" here too
      else if (
        (input.key == "ArrowLeft" && !variablesMatch) ||
        (input.key == "ArrowRight" && variablesMatch)
      ) {
        this.prompt.textContent = "Game Over";
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

//Timer function

const displayTimer = () => {
  const timerDisplay = document.getElementById(
    "game-timer",
  )! as HTMLParagraphElement;
  let timer: number = Date.now() + 1000 * 60;

  const updateInterval = setInterval(() => {
    const currentTime: number = Date.now();
    const timeLeft: number = timer - currentTime;
    if (timeLeft > 0) {
      timerDisplay.textContent = parseFloat(String(timeLeft / 1000)).toFixed(2);
    } else {
      timerDisplay.textContent = "meow";
      console.log("Time is 0");
      clearInterval(updateInterval);
    }
  }, 25);
};

const manageRound = () => {
  const checkRound = (): boolean => {
    return false;
  };
};

displayTimer();
const game = new Game();
