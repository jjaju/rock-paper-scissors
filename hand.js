var TOUCH_TIMER = 10;
var TOUCH_VEL_DECAY = 0.85;
var TARGET_WEIGHT = 0.7;
var FLEE_WEIGHT = 1 - TARGET_WEIGHT;
var lethalDistance;
var iconSize;
var speed;

function Hand(pos, type) {
    this.pos = pos.copy();
    this.type = type;
    this.fleeType = (type + 1) % 3;
    this.targetType = (type + 2) % 3;
    this.speed = Math.random() * 0.5 + 0.75;
    this.vel = createVector(0, 0);
    this.notTouchedSince = TOUCH_TIMER;

    this.display = function () {
        image(
            getTypeIcon(this.type),
            this.pos.x - iconSize * 0.5,
            this.pos.y - iconSize * 0.3,
            iconSize,
            iconSize * 0.6
        );
    };

    this.update = function (n) {
        this.updatePos();
        this.updateVel();
        for (const hand of handCollections[this.fleeType]) {
            if (hand.pos.dist(this.pos) < lethalDistance) {
                this.type = hand.type;
                this.fleeType = (hand.type + 1) % 3;
                this.targetType = (hand.type + 2) % 3;
                //playSound(this.type);
            }
        }
        this.display();
    };

    this.updatePosNN = function (n) {
        let fleeNNs = getNearestNeighbours(this, handCollections[this.fleeType], n);
        let targetNNs = getNearestNeighbours(
            this,
            handCollections[this.targetType],
            n
        );

        let fleeCentroid = computeCentroid(fleeNNs);
        let targetCentroid = computeCentroid(targetNNs);

        let individualFleeWeight = fleeCentroid.x === -1 ? 0 : FLEE_WEIGHT;
        let individualTargetWeight =
            targetCentroid.x === -1 ? 0 : TARGET_WEIGHT;

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

    this.updatePos = function () {
        this.pos.add(this.vel);
        this.pos.x = min(max(this.pos.x, 0), SCREEN_WIDTH);
        this.pos.y = min(max(this.pos.y, 0), SCREEN_HEIGHT);
    };

    this.updateVel = function () {
        if (this.notTouchedSince < TOUCH_TIMER) {
            this.vel.mult(TOUCH_VEL_DECAY);
        }
        else {
            let fleeNN = getNearestNeighbour(this, handCollections[this.fleeType]);
            let targetNN = getNearestNeighbour(this, handCollections[this.targetType]);

            let individualFleeWeight =  (!fleeNN) ? 0 : FLEE_WEIGHT;
            let individualTargetWeight = (!targetNN) ? 0 : TARGET_WEIGHT;

            let fleeCentroid = (!fleeNN) ? createVector(-1, -1) : fleeNN.pos.copy();
            let targetCentroid = (!targetNN) ? createVector(-1, -1) : targetNN.pos.copy();

            let toTarget = targetCentroid
                .sub(this.pos)
                .normalize()
                .mult(individualTargetWeight);
            let fromFlee = fleeCentroid
                .sub(this.pos)
                .normalize()
                .mult(-individualFleeWeight);

            this.vel = toTarget.add(fromFlee)
            if (individualFleeWeight + individualTargetWeight < 1){
                this.vel.normalize().mult(1 - min(individualFleeWeight * 2, 0.8));
            }
            this.vel.mult(speed).mult(this.speed);
        }
        this.notTouchedSince += 1;
    };
}

function initHandsData() {
    iconSize = min(SCREEN_WIDTH, SCREEN_HEIGHT) / 4;
    lethalDistance = iconSize * 0.23;
    speed = min(SCREEN_WIDTH, SCREEN_HEIGHT) / 250;
}