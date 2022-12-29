var TARGET_WEIGHT = 0.7;
var FLEE_WEIGHT = 1-TARGET_WEIGHT;
var LETHAL_DISTANCE = 40;

function typeIcon(type) {
    switch (type) {
        case handType.ROCK:
            return rockIcon;
        case handType.PAPER:
            return paperIcon;
        case handType.SCISSOR:
            return scissorIcon;
        default:
            return rockIcon;
    }
}

function Hand(pos, type) {
    this.pos = pos.copy();
    this.type = type;
    this.fleeType = (type + 1) % 3;
    this.targetType = (type + 2) % 3;
    this.vel = Math.random() * 0.5 + 1.5;

    this.display = function () {
        image(typeIcon(this.type), this.pos.x - 100, this.pos.y - 60, 200, 120)
    };

    this.update = function (n) {
        this.updatePosNN(n);
        for (const hand of allHands[this.fleeType]) {
            if (hand.pos.dist(this.pos) < LETHAL_DISTANCE) {
                this.type = hand.type;
                this.fleeType = (hand.type + 1) % 3;
                this.targetType = (hand.type + 2) % 3;
            }
        }
        this.display();
    };

    this.updatePosNN = function (n){
        let fleeNNs = getNearestNeighbours(this, allHands[this.fleeType], n);
        let targetNNs = getNearestNeighbours(this, allHands[this.targetType], n);

        let fleeCentroid = computeCentroid(fleeNNs);
        let targetCentroid = computeCentroid(targetNNs);

        let individualFleeWeight = (fleeCentroid.x === -1) ? 0 : FLEE_WEIGHT; 
        let individualTargetWeight = (targetCentroid.x === -1) ? 0 : TARGET_WEIGHT; 

        let toTarget = targetCentroid
            .sub(this.pos)
            .normalize()
            .mult(individualTargetWeight);
        let fromFlee = fleeCentroid
            .sub(this.pos)
            .normalize()
            .mult(-individualFleeWeight);

        let moveTo = toTarget.add(fromFlee).mult(this.vel);
        this.pos.add(moveTo);
        this.pos.x = min(max(this.pos.x, 0), SCREEN_WIDTH);
        this.pos.y = min(max(this.pos.y, 0), SCREEN_HEIGHT);
    };
}
