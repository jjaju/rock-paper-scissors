var handType = { ROCK: 0, PAPER: 1, SCISSOR: 2 };
var rocks = [];
var papers = [];
var scissors = [];
var handCollections = [rocks, papers, scissors];
var hands = [];
var numHandsPerType = 20;

function initHands() {
    hands = [];
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < numHandsPerType; i++) {
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
    let notEmpty = handType.ROCK;
    for ([type, coll] of handCollections.entries()) {
        emptyCollections =
            coll.length != 0 ? emptyCollections : emptyCollections + 1;
        if (coll.length != 0) {
            notEmpty = type;
        }
    }
    if (emptyCollections > 1) {
        endGame(notEmpty);
    }
}

function computeCentroid(hands) {
    if (!hands.length) return createVector(-1, -1);
    else {
        let sum = createVector(0, 0);
        for (const hand of hands) {
            sum.add(hand.pos);
        }
        sum.div(hands.length);
        return sum;
    }
}

function getNearestEnemy(hand, hands) {
    hands.sort((a, b) => a.pos.dist(hand.pos) - b.pos.dist(hand.pos));
    return hands[0];
}

function getNearestFriend(hand, hands) {
    hands.sort((a, b) => a.pos.dist(hand.pos) - b.pos.dist(hand.pos));
    return hands[1];
}
