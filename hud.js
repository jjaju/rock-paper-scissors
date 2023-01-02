let startScreen;
let welcomeMessage;
let welcomeText;
let chooseText;
let endMessage;
let endTextLost;
let endTextWon;
let chooseTextEnd;
let handChooser;
let rockButton;
let rockToChoose;
let paperButton;
let paperToChoose;
let scissorButton;
let scissorToChoose;

function initHud() {
    startScreen = createDiv();
    startScreen.class("startScreen");
    startScreen.hide();

    // start screen
    welcomeMessage = createDiv();
    welcomeMessage.class("welcomeMessage");
    welcomeMessage.parent(startScreen);

    welcomeText = createSpan("Welcome!");
    welcomeText.class("text heading");
    welcomeText.parent(welcomeMessage);

    chooseText = createSpan("Choose your hand to start new game:");
    chooseText.class("text message");
    chooseText.parent(welcomeMessage);

    // end screen
    endMessage = createDiv();
    endMessage.class("welcomeMessage");
    endMessage.parent(startScreen);

    endTextLost = createSpan("You Lost!");
    endTextLost.class("text largeHeading");
    endTextLost.parent(endMessage);

    endTextWon = createSpan("You Won!");
    endTextWon.class("text largeHeading");
    endTextWon.parent(endMessage);

    chooseTextEnd = createSpan("Choose your hand to start new game:");
    chooseTextEnd.class("text message");
    chooseTextEnd.parent(endMessage);

    // hand chooser
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
}

function hudOnGameRunning() {
    startScreen.hide();
}

function hudOnBeforeStart() {
    showElement(startScreen);
    endMessage.hide();
}

function hudOnGameEnd(hasWon) {
    showElement(startScreen);
    visibleStartScreen();
    visibleIcons([rockButton, paperButton, scissorButton]);
    welcomeMessage.hide();
    showElement(endMessage);
    if (hasWon) {
        endTextLost.hide();
        endTextWon.show();
    } else {
        endTextWon.hide();
        endTextLost.show();
    }
}

async function rockPressed() {
    invisibleIcons([scissorButton, paperButton]);
    checkIfRestart();
    await delay(1000);
    invisibleStartScreen();
    startGame(handType.ROCK);
    await delay(2000);
    hudOnGameRunning();
}

async function paperPressed() {
    invisibleIcons([scissorButton, rockButton]);
    checkIfRestart();
    await delay(1000);
    invisibleStartScreen();
    startGame(handType.PAPER);
    await delay(2000);
    hudOnGameRunning();
}

async function scissorPressed() {
    invisibleIcons([rockButton, paperButton]);
    checkIfRestart();
    await delay(1000);
    invisibleStartScreen();
    startGame(handType.SCISSOR);
    await delay(2000);
    hudOnGameRunning();
}

function checkIfRestart() {
    if (hasEnded()) {
        initHandDisplay();
    }
}

function invisibleStartScreen() {
    startScreen.style("visibility", "hidden");
    startScreen.style("opacity", "0");
}

function visibleStartScreen() {
    startScreen.style("visibility", "visible");
    startScreen.style("opacity", "1");
}

function invisibleIcons(iconsToChange) {
    for (icon of iconsToChange) {
        icon.style("visibility", "hidden");
        icon.style("opacity", "0");
    }
}

function visibleIcons(iconsToChange) {
    for (icon of iconsToChange) {
        icon.style("visibility", "visible");
        icon.style("opacity", "1");
    }
}

function showElement(el) {
    el.style("display", "flex");
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
