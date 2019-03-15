
// creating an array of country names
var words = ['algeria', 'brazil', 'canada', 'denmark', 'france', 'india', 'mexico', 'norway', 'portugal', 'russia', 'sweden', 'tunisia', 'ukraine', 'venezuela', 'yemen', 'zambia'];


var chosenWord = ' ';           //The word that will be chosen at randon for each game
var userGuesses = [];           // Array to store the letters the user guessed
var guessingWord = [];          // The number of underscores to be generated to match the chosen word
var gameStarted = false;        // Flag to tell if the game has started
var hasFinished = true;         // Flag for 'press any key to try again'     
var userScore = 0;              // Number of wins
const maxRetries = 5;           // Maximum number of tries for each game
var remainingGuesses = 0;       // The number of tries the player has left
var wrongGuesses = [];          // Array to store the letters that were guessed wrong


// Reseting the variables to start game and clearing out if the player chooses to continue the game
function resetGame() {
    remainingGuesses = maxRetries;
    gameStarted = false;

    // choose word randomly
    randNum = Math.floor(Math.random() * words.length);
    chosenWord = words[randNum];

    // Clear out arrays
    userGuesses = [];
    guessingWord = [];
    wrongGuesses = [];

    // clearing out the message
    var div = document.getElementById('message');
    while(div.firstChild){
    div.removeChild(div.firstChild);
    }

    // clearing out the image
    var div = document.getElementById('image');
    while(div.firstChild){
    div.removeChild(div.firstChild);
    }

    // Build the guessing word and clear it out
    for (var i = 0; i < chosenWord.length; i++) {
        guessingWord.push("_");
    }
    
    // Show display
    updateDisplay();
};

// updating the display by linking with the HTML file
function updateDisplay() {
    // wins
    document.getElementById("wins").innerText = userScore;

    // underscore
    document.getElementById("underscore").innerText = guessingWord.join('  ');

    // remaining guesses
    document.getElementById("remaining-guess").innerText = remainingGuesses;

    // wrong guesses
    document.getElementById("wrong-guess").innerText = wrongGuesses;

    if(remainingGuesses <= 0) {
        hasFinished = true;

        // Playing the audio for loss
        var audioEl = document.createElement("audio");
            audioEl.src = "assets/sounds/losing.mp3";
            audioEl.play();
        hasFinished = true;
        document.getElementById("message").innerText = "Oops!";

        // Displaying image for loss
        var img = document.createElement("img");
            img.src = "assets/images/loser.jpeg";
            var src = document.getElementById("image");
            src.appendChild(img);
    }
};



// Actions taking place when a key is pressed
document.onkeydown = function(event) {

    // If we finished a game, dump one keystroke and reset.
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {

        // Action takes place only when a-z is pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

// Actions for the letters pressed by the player
function makeGuess(keyPressLetter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        // Make sure we didn't use this keyPressLetter yet
        if (userGuesses.indexOf(keyPressLetter) === -1) {
            userGuesses.push(keyPressLetter);
            evaluateGuess(keyPressLetter);
        }
    }    
    updateDisplay();
    checkWin();
};


// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(keyPressLetter) {
    // Array to store positions of letters in chosenWord
    var matchingIndicies = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < chosenWord.length; i++) {
        if(chosenWord[i] === keyPressLetter) {
            matchingIndicies.push(i);
        }
    }

    // if the letter is not matching the word, decrease the remaining guess by 1 and store the letter in wrong guess
    if (matchingIndicies.length <= 0) {
        remainingGuesses--;
        wrongGuesses.push(keyPressLetter)
    } else {
        // Loop through all the indicies and replace the underscore with a letter.
        for(var i = 0; i < matchingIndicies.length; i++) {
            guessingWord[matchingIndicies[i]] = keyPressLetter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        // Updating the wins
        userScore++;
        document.getElementById("wins").innerText = userScore;
        // Playing the audio for win
        var audioEl = document.createElement("audio");
            audioEl.src = "assets/sounds/winning.mp3";
            audioEl.play();
        hasFinished = true;
        document.getElementById("message").innerText = "Nice One!";
        // Displaying image for win
        var img = document.createElement("img");
            img.src = "assets/images/winner.jpg";
            var src = document.getElementById("image");
            src.appendChild(img);
    }
};
