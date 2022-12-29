var rockIcon;
var paperIcon;
var scissorIcon;
var typeIconMap;

function initTypeIconMapping() {
    loadIcons();
    typeIconMap = new Map();
    typeIconMap.set(handType.ROCK, rockIcon);
    typeIconMap.set(handType.PAPER, paperIcon);
    typeIconMap.set(handType.SCISSOR, scissorIcon);
}

function loadIcons() {
    rockIcon = loadImage("./assets/rockTransp.png");
    paperIcon = loadImage("./assets/paperTransp.png");
    scissorIcon = loadImage("./assets/scissorTransp.png");
}

function getTypeIcon(type) {
    return typeIconMap.get(type);
}
