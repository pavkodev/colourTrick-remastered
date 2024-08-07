function randomColour() {
    var random = Math.floor(Math.random() * 8);
    var colour = [
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
    var random = Math.floor(Math.random() * 8);
    var word = [
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
    var colour = randomColour();
    var word = randomWord();
    var round = [colour, word];
    return round;
}
