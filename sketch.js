const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

var handType = { ROCK: 0, PAPER: 1, SCISSOR: 2 };
var initialCentroids = [];
var rocks = [];
var papers = [];
var scissors = [];
var allHands = [rocks, papers, scissors];
var hands = [];
var radius = 200;

var rockIcon;
var paperIcon;
var scissorIcon;

function setup() {
    rockIcon = loadImage("./assets/rockTransp.png");
    paperIcon = loadImage("./assets/paperTransp.png");
    scissorIcon = loadImage("./assets/scissorTransp.png");
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    background(0);
    initialCentroids.push(createVector(SCREEN_WIDTH / 3, SCREEN_HEIGHT / 3));
    initialCentroids.push(
        createVector((SCREEN_WIDTH * 2) / 3, SCREEN_HEIGHT / 3)
    );
    initialCentroids.push(
        createVector(SCREEN_WIDTH / 2, (SCREEN_HEIGHT * 2) / 3)
    );
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 30; i++) {
            hands.push(
                new Hand(getRandomPoint(initialCentroids[j], radius), j)
            );
        }
    }
    hands.forEach((h) => h.display());
}

function draw() {
    background(0);
    centroids = computeTargetPositions();
    hands.forEach((h) => h.update(1));
}

function computeTargetPositions() {
    targetPositions = [];
    rocks = hands.filter((h) => h.type === handType.ROCK);
    targetPositions.push(computeCentroid(rocks));
    papers = hands.filter((h) => h.type === handType.PAPER);
    targetPositions.push(computeCentroid(papers));
    scissors = hands.filter((h) => h.type === handType.SCISSOR);
    targetPositions.push(computeCentroid(scissors));

    allHands = [rocks, papers, scissors];
    return targetPositions;
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

function getRandomPoint(center, radius) {
    // let newDir = createVector(Math.random(), Math.random())
    //     .mult(2)
    //     .sub(1)
    //     .mult(radius);
    // let newPoint = center.copy().add(newDir);
    // return newPoint;
    return createVector(
        Math.random() * SCREEN_WIDTH,
        Math.random() * SCREEN_HEIGHT
    );
}

function getNearestNeighbours(hand, hands, n) {
    sorted = hands.slice();
    sorted.sort((a, b) => a.pos.dist(hand.pos) - b.pos.dist(hand.pos));
    //hands.forEach((h) => console.log(h.pos.dist(hand.pos)));
    return sorted.slice(0, n);
}
