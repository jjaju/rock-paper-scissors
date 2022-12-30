function initHud() {
    hud = createElement("hud");
    hud.class("hud");

    startButton = createButton("Start");
    startButton.class("baseButton");
    startButton.parent(hud);
    startButton.mousePressed(startGame);

    resetButton = createButton("Reset");
    resetButton.class("baseButton");
    resetButton.parent(hud);
    resetButton.mousePressed(restartGame);

    pauseButton = createButton("Pause");
    pauseButton.class("baseButton");
    pauseButton.parent(hud);
    pauseButton.mousePressed(pauseGame);
    
    resumeButton = createButton("Resume");
    resumeButton.class("baseButton");
    resumeButton.parent(hud);
    resumeButton.mousePressed(resumeGame);
}
