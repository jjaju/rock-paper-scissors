var testSound;

function preLoadSounds() {
    testSound = loadSound("./assets/sounds/test.mp3");
}

function playSound() {
    if (testSound.isLoaded()) {
        console.log("YEEE")
    } else {
        console.log("AAHH")
    }
    testSound.play();
}
