function initHud() {
    hud = createElement("hud");
    hud.class("hud");

    startScreen = createDiv();
    startScreen.class("startScreen");

    welcomeMessage = createDiv();
    welcomeMessage.class("welcomeMessage");
    welcomeMessage.parent(startScreen);

    welcomeText = createSpan("Welcome!");
    welcomeText.class("text heading");
    welcomeText.parent(welcomeMessage);

    chooseText = createSpan("Choose your hand to start new game:");
    chooseText.class("text message");
    chooseText.parent(welcomeMessage);

    handChooser = createDiv();
    handChooser.class("handChooser");
    handChooser.parent(startScreen);

    rockButton = createButton("");
    rockButton.class("iconButton");
    rockButton.parent(handChooser);
    rockButton.mousePressed(rockPressed);

    rockToChoose = createImg("./assets/rockCropped.png", "");
    rockToChoose.class("iconToChoose");
    rockToChoose.parent(rockButton);

    paperButton = createButton("");
    paperButton.class("iconButton");
    paperButton.parent(handChooser);
    paperButton.mousePressed(paperPressed);

    paperToChoose = createImg("./assets/paperCropped.png", "");
    paperToChoose.class("iconToChoose");
    paperToChoose.parent(paperButton);

    scissorButton = createButton("");
    scissorButton.class("iconButton");
    scissorButton.parent(handChooser);
    scissorButton.mousePressed(scissorPressed);

    scissorToChoose = createImg("./assets/scissorCropped.png", "");
    scissorToChoose.class("iconToChoose");
    scissorToChoose.parent(scissorButton);

    // paperToChoose = createImg("./assets/paperCropped.png", "");
    // paperToChoose.class("iconToChoose");
    // paperToChoose.parent(handChooser);

    // scissorToChoose = createImg("./assets/scissorCropped.png", "");
    // scissorToChoose.class("iconToChoose");
    // scissorToChoose.parent(handChooser);

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

function startPressed() {
    startGame();
    startButton.hide();
    pauseButton.show();
}

function pausePressed() {
    pauseGame();
    pauseButton.hide();
    resumeButton.show();
}

function resumePressed() {
    resumeGame();
    resumeButton.hide();
    pauseButton.show();
}

function resetPressed() {
    restartGame();
    resumeButton.hide();
    pauseButton.hide();
    startButton.show();
}

async function rockPressed() {
    scissorButton.style('visibility', 'hidden');
    scissorButton.style('opacity', '0');
    paperButton.style('visibility', 'hidden');
    paperButton.style('opacity', '0');
    await delay(1000)
    hideStartScreen()
    startGame()
}

async function paperPressed() {
    scissorButton.style('visibility', 'hidden');
    scissorButton.style('opacity', '0');
    rockButton.style('visibility', 'hidden');
    rockButton.style('opacity', '0');
    await delay(1000)
    hideStartScreen()
}

async function scissorPressed() {
    rockButton.style('visibility', 'hidden');
    rockButton.style('opacity', '0');
    paperButton.style('visibility', 'hidden');
    paperButton.style('opacity', '0');
    await delay(1000)
    hideStartScreen()
}

function hideStartScreen() {
    startScreen.style('visibility', 'hidden');
    startScreen.style('opacity', '0');
}

const delay = ms => new Promise(res => setTimeout(res, ms));
