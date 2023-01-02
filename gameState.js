var state = { running: 0, beforeStart: 1, paused: 2, ended: 3 };
var gameState;

function initGameState() {
    gameState = state.beforeStart;
    pauseDraw();
}

function startGame() {
    if (gameState == state.beforeStart) {
        gameState = state.running;
        resumeDraw();
    }
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

function endGame() {
    if (gameState == state.running) {
        gameState = state.ended;
        pauseDraw();
    }
}

function diffusionAllowed() {
    return gameState == state.running;
}
