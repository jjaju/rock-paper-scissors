const TOUCH_TIMER = 10;
const TOUCH_VEL_DECAY = 0.85;
const TARGET_WEIGHT = 0.7;
const FLEE_WEIGHT = 1 - TARGET_WEIGHT;
const ICON_ASPECT_RATIO = 0.6;
const TEMPORAL_VELOCITY_ALPHA = 0.8;
var lethalDistance;
var iconSize;
var movementSpeed;

function Hand(pos, type) {
    this.pos = pos.copy();
    this.type = type;
    this.individualSpeed = Math.random() * 0.5 + 0.75;
    this.vel = createVector(0, 0);
    this.notTouchedSince = TOUCH_TIMER;

    this.display = function () {
        image(
            getTypeIcon(this.type),
            this.pos.x - iconSize * 0.5,
            this.pos.y - iconSize * 0.5 * ICON_ASPECT_RATIO,
            iconSize,
            iconSize * ICON_ASPECT_RATIO
        );
    };

    this.update = function () {
        this.updateVel();
        this.updatePos();
        // test if icon was eaten
        for (const hand of handCollections[this.getFleeType()]) {
            if (hand.pos.dist(this.pos) < lethalDistance) {
                this.type = hand.type;
            }
        }
        this.display();
    };

    this.updatePos = function () {
        this.pos.add(this.vel);
        // clamp positions at screen borders
        this.pos.x = min(max(this.pos.x, 0), SCREEN_WIDTH);
        this.pos.y = min(max(this.pos.y, 0), SCREEN_HEIGHT);
    };

    this.updateVel = function () {
        if (this.notTouchedSince < TOUCH_TIMER) {
            this.vel = this.calculateDiffuseVel();
        } else {
            let newVel = this.calculateStandardVel();
            this.vel
                .mult(TEMPORAL_VELOCITY_ALPHA)
                .add(newVel.mult(1 - TEMPORAL_VELOCITY_ALPHA));
        }
        this.notTouchedSince += 1;
    };

    this.calculateDiffuseVel = function () {
        return this.vel.mult(TOUCH_VEL_DECAY);
    };

    this.calculateStandardVel = function () {
        let fleeNN = getNearestEnemy(
            this,
            handCollections[this.getFleeType()]
        );
        let targetNN = getNearestEnemy(
            this,
            handCollections[this.getTargetType()]
        );

        let individualFleeWeight = !fleeNN ? 0 : FLEE_WEIGHT;
        let individualTargetWeight = !targetNN ? 0 : TARGET_WEIGHT;

        let fleeCentroid = !fleeNN ? createVector(-1, -1) : fleeNN.pos.copy();
        let targetCentroid = !targetNN
            ? createVector(-1, -1)
            : targetNN.pos.copy();

        let toTarget = targetCentroid
            .sub(this.pos)
            .normalize()
            .mult(individualTargetWeight);
        let fromFlee = fleeCentroid
            .sub(this.pos)
            .normalize()
            .mult(-individualFleeWeight);

        let newVel = toTarget.add(fromFlee);
        if (individualFleeWeight + individualTargetWeight < 1) {
            newVel.normalize().mult(1 - min(individualFleeWeight * 2, 0.8));
        }

        // keep distance from hands of same type
        let friendNN = getNearestFriend(this, handCollections[this.type]);
        let friendCentroid = !friendNN ? createVector(-1, -1) : friendNN.pos.copy();
        let individualFriendWeight = !friendNN ? 0 : -1;
        let fromFriend = (friendCentroid.sub(this.pos.copy())).mult(individualFriendWeight);
        if (fromFriend.mag() < lethalDistance) {
            newVel.add(fromFriend.normalize().mult(0.5));
        }
        
        newVel.mult(movementSpeed).mult(this.individualSpeed);
        return newVel;
    };

    this.getTargetType = function () {
        return (this.type + 2) % 3;
    };

    this.getFleeType = function () {
        return (this.type + 1) % 3;
    };
}

function initHandsData() {
    iconSize = min(SCREEN_WIDTH, SCREEN_HEIGHT) / 4;
    lethalDistance = iconSize * 0.23;
}
