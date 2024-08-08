var randomColour = function () {
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
};
var randomWord = function () {
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
};
//function for generating game prompt.
var gameRound = function (colour, word) {
    var prompt = document.getElementById("game-prompt");
    if (prompt) {
        // Remove all previous classes if they exist
        prompt.classList.remove("text-red-500", "text-orange-500", "text-yellow-500", "text-green-500", "text-blue-500", "text-pink-500", "text-cyan-500", "text-purple-500");
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
var displayTimer = function () {
    var timerDisplay = document.getElementById("game-timer");
    var timer = Date.now() + 1000 * 60;
    var updateInterval = setInterval(function () {
        var currentTime = Date.now();
        var timeLeft = timer - currentTime;
        if (timeLeft > 0) {
            timerDisplay.textContent = parseFloat(String(timeLeft / 1000)).toFixed(2);
        }
        else {
            timerDisplay.textContent = "meow";
            console.log("Time is 0");
            clearInterval(updateInterval);
        }
    }, 25);
};
displayTimer();
gameRound(randomColour(), randomWord());
