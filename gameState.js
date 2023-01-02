var state = { running: 0, beforeStart: 1, paused: 2, ended: 3 };
var gameState;
var currentlyPlayingAs = handType.ROCK;

function initGameState() {
    gameState = state.beforeStart;
    pauseDraw();
    hudOnBeforeStart();
}

async function startGame(typeToPlay) {
    currentlyPlayingAs = typeToPlay;
    if (gameState == state.beforeStart || gameState == state.ended) {
        gameState = state.running;
        resumeDraw();
        await delay(2000);
        hudOnGameRunning();
    }
}

function endGame(typeThatWon) {
    if (gameState == state.running) {
        gameState = state.ended;
        pauseDraw();
    }
    let gameWon = false;
    if (typeThatWon == currentlyPlayingAs) {
        gameWon = true;
    }
    hudOnGameEnd(gameWon);
}

function restartGame() {
    gameState = state.beforeStart;
    pauseDraw();
    initHandDisplay();
}

function resumeGame() {
    if (gameState == state.paused) {
        gameState = state.running;
        resumeDraw();
    }
}

function pauseGame() {
    if (gameState == state.running) {
        gameState = state.paused;
        pauseDraw();
    }
}

function diffusionAllowed() {
    return gameState == state.running;
}

function hasWon() {
    if (gameState == state.ended) {
        return gameWon;
    }
    return false;
}

function hasEnded() {
    return gameState == state.ended;
}
