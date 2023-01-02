var state = { running: 0, beforeStart: 1, paused: 2, ended: 3 };
var gameState;
var currentlyPlayingAs = handType.ROCK;

function initGameState() {
    gameState = state.beforeStart;
    pauseDraw();
    hudOnBeforeStart();
}

function startGame(typeToPlay) {
    if (gameState == state.beforeStart || gameState == state.ended) {
        currentlyPlayingAs = typeToPlay;
        gameState = state.running;
        resumeDraw();
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
