function randomColour() {
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
}

function randomWord() {
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
}

function gameRound() {
  let colour: string = randomColour();
  let word: string = randomWord();

  let round: string[] = [colour, word];

  return round;
}
