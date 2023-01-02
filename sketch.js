const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let fr = 30;

function preload() {
    initHud();
    initInteraction();
    //initTypeSoundMapping();
    initTypeIconMapping();
    initGameState();
    initHandsData();
}

function setup() {
    let cv = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    cv.mousePressed(tryDiffuse);
    frameRate(fr);
    initHandDisplay();
}

function draw() {
    background(59, 57, 55);
    updateHandCollections();
    checkEndGame();
    hands.forEach((h) => h.update(1));
}

function getRandomPosition() {
    return createVector(
        Math.random() * SCREEN_WIDTH,
        Math.random() * SCREEN_HEIGHT
    );
}

function mousePressed() {
    //userStartAudio();
}

function tryDiffuse() {
    if (diffusionAllowed()) {
        diffuse(createVector(mouseX, mouseY));
    }
}

function initHandDisplay() {
    background(59, 57, 55);
    initHands();
    hands.forEach((h) => h.display());
}

function pauseDraw() {
    noLoop();
}

function resumeDraw() {
    loop();
}
