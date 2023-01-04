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
let settingsMenu;
let settingsButton;
let settingsIcon;
let backIcon;
let settingsContainer;
let speedSlider;
let inSettings = false;
let lastMessage;

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

    // settings Menu
    settingsMenu = createDiv();
    settingsMenu.class("welcomeMessage");
    settingsMenu.parent(startScreen);
    settingsMenu.hide();

    settingsButton = createButton("");
    settingsButton.class("settingsButton");
    settingsButton.parent(startScreen);
    settingsButton.mousePressed(settingsPressed);

    settingsIcon = createImg("./assets/settingsIcon.png", "");
    settingsIcon.class("settingsIcon");
    settingsIcon.parent(settingsButton);
    
    backIcon = createImg("./assets/backArrow.png", "");
    backIcon.class("settingsIcon");
    backIcon.parent(settingsButton);
    backIcon.hide();
    
    settingsHeading = createSpan("Settings");
    settingsHeading.class("text heading");
    settingsHeading.parent(settingsMenu);

    settingsContainer = createDiv();
    settingsContainer.class("settingsContainer");
    settingsContainer.parent(settingsMenu);

    speedText = createSpan("Speed:");
    speedText.class("text message settingsTextLeft");
    speedText.parent(settingsContainer);

    speedSlider = createSlider(
        0.1, 
        min(SCREEN_WIDTH, SCREEN_HEIGHT) / 50, 
        min(SCREEN_WIDTH, SCREEN_HEIGHT) / 250, 
        0
    );
    speedSlider.parent(settingsContainer);
    speedSlider.mouseReleased(setSpeed);
    
    setSpeed(); //Note: should probably happen somewhere else (hand.js)
    
    clickTip = createSpan("Tip:");
    clickTip.class("text message settingsTextLeft");
    clickTip.parent(settingsContainer);

    clickText = createSpan("Click the canvas to bump nearby pieces!");
    clickText.class("text message settingsTextLeft");
    clickText.parent(settingsContainer);
    
    starTip = createSpan("Pro Tip:");
    starTip.class("text message settingsTextLeft");
    starTip.parent(settingsContainer);

    starText = createA("https://github.com/jjaju/rock-paper-scissors", "Give us a star!", "_blank");
    starText.class("text message settingsTextLeft");
    starText.parent(settingsContainer);
}

function hudOnGameRunning() {
    startScreen.hide();
}

function hudOnBeforeStart() {
    showElement(startScreen);
    endMessage.hide();
    lastMessage = welcomeMessage;
}

function hudOnGameEnd(hasWon) {
    showElement(startScreen);
    visibleStartScreen();
    visibleIcons([rockButton, paperButton, scissorButton, settingsButton]);
    welcomeMessage.hide();
    showElement(endMessage);
    if (hasWon) {
        endTextLost.hide();
        endTextWon.show();
    } else {
        endTextWon.hide();
        endTextLost.show();
    }
    resetSettingsMenu()
    showElement(handChooser);
    lastMessage = endMessage;
}

function setSpeed(){
    movementSpeed = speedSlider.value();
}

async function rockPressed() {
    invisibleIcons([scissorButton, paperButton, settingsButton]);
    checkIfRestart();
    await customDelay(1000);
    invisibleStartScreen();
    startGame(handType.ROCK);
    await customDelay(2000);
    hudOnGameRunning();
}

async function paperPressed() {
    invisibleIcons([scissorButton, rockButton, settingsButton]);
    checkIfRestart();
    await customDelay(1000);
    invisibleStartScreen();
    startGame(handType.PAPER);
    await customDelay(2000);
    hudOnGameRunning();
}

async function scissorPressed() {
    invisibleIcons([rockButton, paperButton, settingsButton]);
    checkIfRestart();
    await customDelay(1000);
    invisibleStartScreen();
    startGame(handType.SCISSOR);
    await customDelay(2000);
    hudOnGameRunning();
}

function settingsPressed() {
    if (inSettings) {
        showElement(lastMessage);
        showElement(handChooser);
        showElement(settingsIcon);
        backIcon.hide();
        settingsMenu.hide();
    }
    else {
        lastMessage.hide();
        handChooser.hide();
        settingsIcon.hide()
        showElement(settingsMenu);
        showElement(backIcon);
    }
    inSettings = !inSettings;
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

function resetSettingsMenu() {
    settingsMenu.hide();
    backIcon.hide();
    showElement(settingsIcon);
    inSettings = false;
}

const customDelay = (ms) => new Promise((res) => setTimeout(res, ms));
