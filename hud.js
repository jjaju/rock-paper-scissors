function initHud() {
    hud = createElement("hud");
    hud.class("hud");

    startButton = createButton("Start");
    startButton.class("baseButton");
    startButton.parent(hud);
    startButton.mousePressed(startPressed);
    
    pauseButton = createButton("Pause");
    pauseButton.class("baseButton");
    pauseButton.parent(hud);
    pauseButton.mousePressed(pausePressed);
    pauseButton.hide();

    resumeButton = createButton("Resume");
    resumeButton.class("baseButton");
    resumeButton.parent(hud);
    resumeButton.mousePressed(resumePressed);
    resumeButton.hide();

    resetButton = createButton("Reset");
    resetButton.class("baseButton");
    resetButton.parent(hud);
    resetButton.mousePressed(resetPressed);
}

function startPressed(){
    startGame();
    startButton.hide();
    pauseButton.show();
}

function pausePressed(){
    pauseGame();
    pauseButton.hide();
    resumeButton.show();
}

function resumePressed(){
    resumeGame();
    resumeButton.hide();
    pauseButton.show();
}

function resetPressed(){
    restartGame();
    resumeButton.hide();
    pauseButton.hide();
    startButton.show();
}