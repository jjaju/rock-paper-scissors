var handType = { ROCK: 0, PAPER: 1, SCISSOR: 2 };
var rocks = [];
var papers = [];
var scissors = [];
var handCollections = [rocks, papers, scissors];
var hands = [];

function initHands() {
    hands = [];
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 30; i++) {
            hands.push(new Hand(getRandomPosition(), j));
        }
    }
}

function updateHandCollections() {
    rocks = hands.filter((h) => h.type === handType.ROCK);
    papers = hands.filter((h) => h.type === handType.PAPER);
    scissors = hands.filter((h) => h.type === handType.SCISSOR);
    handCollections = [rocks, papers, scissors];
}

function checkEndGame() {
    let emptyCollections = 0;
    for (coll of handCollections) {
        emptyCollections = (coll.length != 0) ? emptyCollections : emptyCollections + 1;
    }
    if (emptyCollections > 1) {
        endGame();
    }
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

function getNearestNeighbours(hand, hands, n) {
    sorted = hands.slice();
    sorted.sort((a, b) => a.pos.dist(hand.pos) - b.pos.dist(hand.pos));
    return sorted.slice(0, n);
}
