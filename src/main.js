// Audio variables for use in game
var audioPress = new Audio("./assets/audio/press.mp3");
var audioFail = new Audio("./assets/audio/fail.mp3");
//Lowering volume to avoid blowing player's ears off (first-hand experience)
audioPress.volume = 0.25;
audioFail.volume = 0.25;
var Game = /** @class */ (function () {
    //Class constructor generates initial game round and starts timer
    function Game() {
        var _this = this;
        //Variable for referencing game prompt parapgraph element
        this.prompt = document.getElementById("game-prompt");
        //Variable for referencing timer parapgraph element
        this.timerDisplay = document.getElementById("game-timer");
        //Variable for referencing score parapgraph element
        this.scoreDisplay = document.getElementById("game-score");
        //Variable for referencing post-game buttons
        this.gameButtons = document.getElementById("game-buttons");
        this.countdownValue = 20; //Amount of seconds for round
        this.timer = Date.now() + 1000 * this.countdownValue; //Timer tracker
        this.addedTime = 0.75; //Time added on correct input
        this.score = 0; //Score tracker
        this.gameOver = false; //Flag to check if game is over or not
        //Array of colours used
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
        //Methods for generating random colour and word
        this.generateRandomColour = function () {
            return _this.colours[Math.floor(Math.random() * _this.colours.length)];
        };
        this.generateRandomWord = function () {
            return _this.colours[Math.floor(Math.random() * _this.colours.length)];
        };
        //Method combining word and colour generators
        this.generateGameRound = function () {
            return {
                colour: _this.generateRandomColour(),
                word: _this.generateRandomWord(),
            };
        };
        //Method to set timer <p> element to display timer value
        this.setTimer = function (value) {
            _this.timerDisplay.textContent = parseFloat(String(value)).toFixed(2);
        };
        //Method for updating timer
        this.manageTimer = function () {
            _this.updateInterval = setInterval(function () {
                var currentTime = Date.now(); //Stores current time to compare to start time
                var timeLeft = (_this.timer - currentTime) / 1000; //Checks difference between current time and start time
                //While there is time left, update the timer
                if (timeLeft > 0) {
                    _this.setTimer(timeLeft);
                    //Otherwise set game over state and clear interval
                }
                else {
                    _this.setTimer(0);
                    console.log("Time is 0");
                    _this.manageGameOver();
                    clearInterval(_this.updateInterval);
                }
                if (timeLeft < 5) {
                    _this.timerDisplay.classList.add("animate-low-time");
                }
            }, 25);
        };
        //Method for adding time to timer for correct guesses
        this.increaseTimer = function (addedSeconds) {
            clearInterval(_this.updateInterval);
            _this.timer += addedSeconds * 1000;
            _this.manageTimer();
        };
        //Manages game state when user loses
        this.manageGameOver = function () {
            clearInterval(_this.updateInterval);
            audioFail.play();
            _this.prompt.textContent = "Game Over";
            console.log("Game over");
            document.onkeydown = null; //Remove key listener
            //show post-game buttons
            _this.gameButtons.style.visibility = "visible";
            //Remove prompt display animation so that it can be played again
            _this.prompt.classList.remove("animate-prompt");
        };
        //Manages game round generation and display
        this.manageGameRound = function (_a) {
            var colour = _a.colour, word = _a.word;
            //Hide post-game buttons
            _this.gameButtons.style.visibility = "hidden";
            var isColourWordMatch = colour === word; //Boolean of if colour and word match or not
            //Display the correct word
            _this.prompt.textContent = word;
            _this.prompt.classList.add("animate-prompt");
            //Reset classes at start of each round
            _this.prompt.classList.remove("text-red-500", "text-orange-500", "text-yellow-500", "text-green-500", "text-blue-500", "text-pink-500", "text-cyan-500", "text-purple-500");
            //Add desired tailwind classes for font colour
            _this.prompt.classList.add("text-".concat(colour, "-500"));
            document.onkeydown = function (input) {
                //If user enters the right inputs for match and mismatch in word-colour combos,
                //increase score and time, and generate new round
                if ((input.key == "ArrowLeft" && isColourWordMatch) ||
                    (input.key == "ArrowRight" && !isColourWordMatch)) {
                    audioPress.pause();
                    audioPress.currentTime = 0;
                    audioPress.play();
                    //Remove prompt display animation so that it can be played again
                    _this.prompt.classList.remove("animate-prompt");
                    _this.prompt.offsetHeight;
                    _this.score++;
                    _this.scoreDisplay.textContent = "Score: ".concat(_this.score);
                    _this.increaseTimer(_this.addedTime);
                    _this.manageGameRound(_this.generateGameRound());
                }
                //If the user enters wrong input, call game-over manager method
                //(also happens if user runs out of time, managed by manageTimer())
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
var startGame = function () {
    var game = new Game();
};
//Generate game on script load
startGame();
