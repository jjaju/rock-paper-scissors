const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let fr = 30;

function setup() {
    initTypeSoundMapping();
    initTypeIconMapping();
    initHandsData();
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    background(0);
    frameRate(fr);
    initHands();
    hands.forEach((h) => h.display());
}

function draw() {
    background(0);
    updateHandCollections();
    hands.forEach((h) => h.update(1));
}

function getRandomPosition() {
    return createVector(
        Math.random() * SCREEN_WIDTH,
        Math.random() * SCREEN_HEIGHT
    );
}

function mousePressed() {
    userStartAudio();
}