const topLeft = document.querySelector(".top .left ");
const topRight = document.querySelector(".top .right");
const bottomLeft = document.querySelector(".bottom .left");
const bottomRight = document.querySelector(".bottom .right");
const timer = document.querySelector('.timer');
const board = document.querySelector('.board');
let timerValue = 3;
const DEFAULT_OPACITY_VALUE = 0.5;
const TILES = [topLeft, topRight, bottomLeft, bottomRight];
const TILES_DONE_BY_MACHINE = [];
const TILES_DONE_BY_USER = [];
let stepsToReproduce = 3;
let intervalBetweenTiles = 100; // in ms
function main() {
    console.log(timer)
    // timer.innerHTML = timerValue;
    startGame()

    // startCountdown();

}

function startCountdown() {
    const interval = setInterval(() => {
        timer.innerHTML = --timerValue;
        if (timerValue === 0) {
            clearInterval(interval);
            timer.remove();
            // startGame()
        }
    }, 1000)
}

async function startGame() {

    addClickListeners();
    disableUserInteraction()
    for (let i = 0; i < stepsToReproduce; i++) {
        await timeout(() => {
            let tile = getRandomTile();
            enableOpacity(tile)
            TILES_DONE_BY_MACHINE.push(tile.getAttribute('data-tile'));
            setTimeout(() => defaultOpacity(tile), 500);
        }, 1000)

    }
    enableUserInteraction();
    console.log(TILES_DONE_BY_MACHINE)

}

function enableUserInteraction() {
    board.style.pointerEvents = 'all';
}

function disableUserInteraction() {
    board.style.pointerEvents = 'none';
}

function getRandomTile() {
    const randomTilePosition = Math.floor((Math.random() * 4));
    console.log(randomTilePosition);
    return TILES[randomTilePosition];

}

function timeout(handle, ms) {
    return new Promise(res => setTimeout(() => {
        return res(handle());
    }, ms));
}

function enableOpacity(element) {
    element.style.opacity = 1;
}

function defaultOpacity(element) {
    element.style.opacity = DEFAULT_OPACITY_VALUE;
}

function addClickListeners() {
    TILES.forEach(tile => {
        tile.addEventListener('click', (event) => {
            console.log(event)
        })
    })
}

main();