const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

var handType = { ROCK: 0, PAPER: 1, SCISSOR: 2 };
var rocks = [];
var papers = [];
var scissors = [];
var allHands = [rocks, papers, scissors];
var hands = [];

function setup() {
    initTypeIconMapping();
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    background(0);
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 30; i++) {
            hands.push(new Hand(getRandomPoint(), j));
        }
    }
    hands.forEach((h) => h.display());
}

function draw() {
    background(0);
    updateHandCollections();
    hands.forEach((h) => h.update(1));
}

function updateHandCollections() {
    rocks = hands.filter((h) => h.type === handType.ROCK);
    papers = hands.filter((h) => h.type === handType.PAPER);
    scissors = hands.filter((h) => h.type === handType.SCISSOR);
    allHands = [rocks, papers, scissors];
}

function computeCentroid(hands) {
    if (!hands.length) return createVector(-1, -1);
    else {
        let sumX = 0;
        let sumY = 0;
        for (const hand of hands) {
            sumX += hand.pos.x;
            sumY += hand.pos.y;
        }
        sumX /= hands.length;
        sumY /= hands.length;
        return createVector(sumX, sumY);
    }
}

function getRandomPoint() {
    return createVector(
        Math.random() * SCREEN_WIDTH,
        Math.random() * SCREEN_HEIGHT
    );
}

function getNearestNeighbours(hand, hands, n) {
    sorted = hands.slice();
    sorted.sort((a, b) => a.pos.dist(hand.pos) - b.pos.dist(hand.pos));
    return sorted.slice(0, n);
}
