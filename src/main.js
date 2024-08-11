// Audio variables for use in game
var audioPress = new Audio("./assets/audio/press.mp3");
var audioFail = new Audio("./assets/audio/fail.mp3");
audioPress.volume = 0.25;
audioFail.volume = 0.25;
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        //Variable for referencing game prompt parapgraph element
        this.prompt = document.getElementById("game-prompt");
        //Variable for referencing timer parapgraph element
        this.timerDisplay = document.getElementById("game-timer");
        this.countdownValue = 20;
        this.timer = Date.now() + 1000 * this.countdownValue;
        this.score = 0;
        this.gameOver = 0;
        this.colours = [
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "pink",
            "cyan",
            "purple",
        ];
        this.generateRandomColour = function () {
            return _this.colours[Math.floor(Math.random() * _this.colours.length)];
        };
        this.generateRandomWord = function () {
            return _this.colours[Math.floor(Math.random() * _this.colours.length)];
        };
        this.generateGameRound = function () {
            return {
                colour: _this.generateRandomColour(),
                word: _this.generateRandomWord(),
            };
        };
        this.setTimer = function (value) {
            _this.timerDisplay.textContent = parseFloat(String(value)).toFixed(2);
        };
        this.manageTimer = function () {
            _this.updateInterval = setInterval(function () {
                var currentTime = Date.now();
                var timeLeft = _this.timer - currentTime;
                if (timeLeft > 0) {
                    _this.setTimer(timeLeft / 1000);
                }
                else {
                    _this.setTimer(0);
                    console.log("Time is 0");
                    _this.manageGameOver();
                    clearInterval(_this.updateInterval);
                }
            }, 25);
        };
        this.increaseTimer = function (addedSeconds) {
            clearInterval(_this.updateInterval);
            _this.timer += addedSeconds * 1000;
            _this.manageTimer();
        };
        this.manageGameOver = function () {
            clearInterval(_this.updateInterval);
            audioFail.play();
            _this.prompt.textContent = "Game Over";
            console.log("Game over");
            document.onkeydown = null;
        };
        this.manageGameRound = function (_a) {
            var colour = _a.colour, word = _a.word;
            var isColourWordMatch = colour == word ? true : false;
            //Display the correct word
            _this.prompt.textContent = word;
            //Reset classes at start of each round
            _this.prompt.className = "";
            //Add desired tailwind classes for font colour
            _this.prompt.className = "stroke-black text-8xl text-".concat(colour, "-500");
            document.onkeydown = function (input) {
                if ((input.key == "ArrowLeft" && isColourWordMatch) ||
                    (input.key == "ArrowRight" && !isColourWordMatch)) {
                    audioPress.pause();
                    audioPress.currentTime = 0;
                    audioPress.play();
                    _this.score++;
                    _this.increaseTimer(0.75);
                    _this.manageGameRound(_this.generateGameRound());
                }
                //Add "if timer reaches 0" here too
                else if ((input.key == "ArrowLeft" && !isColourWordMatch) ||
                    (input.key == "ArrowRight" && isColourWordMatch)) {
                    _this.manageGameOver();
                }
            };
        };
        this.manageGameRound(this.generateGameRound());
        this.manageTimer();
    }
    return Game;
}());
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
//function for displaying game prompt.
var displayRound = function (displayVariables) {
    var colour = displayVariables.colour;
    var word = displayVariables.word;
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
var game = new Game();
