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

