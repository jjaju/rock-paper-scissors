var state = { running: 0, beforeStart: 1, paused: 2, ended: 3 };
var gameState;

function initGameState() {
    gameState = state.beforeStart;
}

function start() {
    if (gameState == state.beforeStart) {
        gameState = state.running;
        resumeDraw();
    }
}

function restart() {
    gameState = state.beforeStart;
    pauseDraw();
}

function resume() {
    if (gameState == state.paused) {
        gameState = state.running;
        resumeDraw();
    }
}

function pause() {
    if (gameState == state.running) {
        gameState = state.paused;
        pauseDraw();
    }
}

function end() {
    if (gameState == state.running) {
        gameState = state.ended;
        pauseDraw();
    }
}
