var diffusion_threshold;
var diffusion_speed;

function initInteraction() {
    diffusion_threshold = min(SCREEN_HEIGHT, SCREEN_WIDTH) / 10;
    diffusion_speed = min(SCREEN_HEIGHT, SCREEN_WIDTH) / 50;
}

function diffuse(pos) {
    for (handCollection of handCollections) {
        for (hand of handCollection) {
            if (hand.pos.dist(pos) < diffusion_threshold){
                hand.vel = hand.pos.copy().sub(pos).normalize().mult(diffusion_speed);
                hand.notTouchedSince = 0;
            }
        }
    }
}