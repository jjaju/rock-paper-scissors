var rockSound;
var paperSound;
var scissorSound;
var typeSoundMap;
var lastTime = 0;
var sound;

function preLoadSounds() {
    rockSound = loadSound("./assets/sounds/rock.mp3");
    paperSound = loadSound("./assets/sounds/paper.mp3");
    scissorSound = loadSound("./assets/sounds/scissor.mp3");
}

function getTypeSound(type) {
    return typeSoundMap.get(type);
}

function playSound(type) {
    sound = getTypeSound(type);
    if (sound.isLoaded()) {
        // lower volume for subsequent sounds to avoid distortion
        time = new Date().getTime();
        let passedTime = (time - lastTime) / 1000;
        delay = (passedTime > 1) ? 0 : 0.5; 
        sound.setVolume(min(1, passedTime), delay);
        sound.play();
        lastTime = time;
    }
}

function initTypeSoundMapping() {
    preLoadSounds();
    typeSoundMap = new Map();
    typeSoundMap.set(handType.ROCK, rockSound);
    typeSoundMap.set(handType.PAPER, paperSound);
    typeSoundMap.set(handType.SCISSOR, scissorSound);
}
