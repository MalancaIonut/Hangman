var input = document.getElementById("myInput");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("play").click();
  }
});

var word;

function start() {
    var switcher = true;
    word = document.getElementById("myInput").value.toUpperCase();
    if (/[^a-zA-Z]/.test(word)) {
        switcher = false;
        document.getElementById("toShort").style.visibility = "hidden";
        document.getElementById("notWord").style.visibility = "visible";
        document.getElementById("myInput").value = '';
    } else if (input.value.length < 3) {
        switcher = false;
        document.getElementById("notWord").style.visibility = "hidden";
        document.getElementById("toShort").style.visibility = "visible";
        document.getElementById("myInput").value = '';
    }
    if (switcher === true) {
        $(".container").css("visibility", "hidden");
        $(".alphabet").css("visibility", "visible");
        $(".checkLetters").css("visibility", "visible");
        $("#canvas").css("visibility", "visible");
        document.getElementById("notWord").style.visibility = "hidden";
        document.getElementById("toShort").style.visibility = "hidden";
        letterBox();
    }
}

function letterBox() {
    word = document.getElementById("myInput").value.toUpperCase();
    word.split('').forEach(function addLetterBox(letter, i) {
        var new_button = document.createElement("button");
        const currentDiv = document.getElementById("checkLetters");
        currentDiv.insertAdjacentElement("afterbegin", new_button);
        new_button.className = "letterBox";
        new_button.id = word.length - i - 1;
    });
}

let dpi = window.devicePixelRatio;
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

// Set display size (css pixels).
var size = 400;
canvas.style.width = size + "px";
canvas.style.height = size + "px";

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio;
canvas.width = Math.floor(size * scale);
canvas.height = Math.floor(size * scale);

// Normalize coordinate system to use css pixels.
ctx.scale(scale, scale);

// Set the color.
ctx.strokeStyle = 'white';

// Drawing methods.
function drawFirstMistake() {
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(90, 365);
    ctx.lineTo(90, 45);
    ctx.stroke();
}

function drawSecondMistake() {
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(86, 45);
    ctx.lineTo(180, 45);
    ctx.stroke();
}

function drawThirdMistake() {
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(180, 41);
    ctx.lineTo(180, 143);
    ctx.stroke();
    ctx.ellipse(178, 147, 3, 7, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawFourthMistake() {
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(177, 137, 13, 0, 2 * Math.PI);
    ctx.moveTo(177, 150);
    ctx.lineTo(177, 250);
    ctx.lineTo(200, 300);
    ctx.lineTo(177, 250);
    ctx.lineTo(154, 300);
    ctx.moveTo(177, 170);
    ctx.lineTo(177, 170);
    ctx.lineTo(154, 215);
    ctx.moveTo(177, 170);
    ctx.lineTo(177, 170);
    ctx.lineTo(200, 215);
    ctx.stroke();
}


// Check the letters.
var counterMistake = 0, counterGuess = 0, checkVowels = 3;
function checkLetter(alphabetletter) {
    var guessed = false;
    word.split('').forEach(function check(letter, i) {
        if (alphabetletter === letter) {
            guessed = true; 
            document.getElementById(i).textContent = alphabetletter;
            document.getElementById(letter).style.visibility = "hidden";
            ++counterGuess;
        }
    });
    if (counterGuess === word.length) {
        document.getElementById("notWord").innerHTML = "Congratulations !!! You guessed the word !"
        document.getElementById("notWord").style.visibility = "visible";
        $('.alphabet').attr('disabled', 'disabled');
        $("#reset").css("visibility", "visible");
    }
    if (guessed === false) {
        document.getElementById(alphabetletter).style.visibility = "hidden";
        if (checkVowels > 0 && (alphabetletter == "A" || alphabetletter == "E" || alphabetletter == "I" || alphabetletter == "O" || alphabetletter == "U")) {
            --checkVowels;
            document.getElementById("wrongVowel").innerHTML = "Number of vowels you can miss: "+ checkVowels +"";
        } else {
            ++counterMistake;
            if (counterMistake === 1) {
                drawFirstMistake();
            }
            if (counterMistake === 2) {
                drawSecondMistake();
            }
            if (counterMistake === 3) {
                drawThirdMistake();
            }
            if (counterMistake === 4) {
                drawFourthMistake();
                document.getElementById("notWord").innerHTML = "I'm sorry, you're dead!";
                document.getElementById("notWord").style.visibility = "visible";
                $("#reset").css("visibility", "visible");
                $('.alphabet').attr('disabled', 'disabled');
            }
        }
    }
}

// Refresh.
function refreshPage() {
    window.location.reload();
}