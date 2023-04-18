// https://maryyj.github.io/AvadaKedavra/
let gameBoard = document.getElementById("gameBoard")
let score = document.getElementById('score');
const upBtn = document.getElementById('upButton');
const rightBtn = document.getElementById('rightButton');
const downBtn = document.getElementById('downButton');
const leftBtn = document.getElementById('leftButton');

score.textContent = 0;
const rows = 5;
const cols = 5;
const numCharacters = 3;

const backgroundImages = [
  'url(./images/diagonalley.png)',
  'url(./images/platform.jpg)',
  'url(./images/bridge.jpg)',
  'url(./images/godricshollow.gif)',
  'url(./images/christmas.gif)',
  'url(./images/snowybg.gif)',
  'url(./images/platformnine.gif)',
  'url(./images/soldier.jpg)'];

const characterImages = [
  '../images/dobby.jpg',
  '../images/harrypotter.jpg',
  '../images/ron.jpg'];

const map = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
];

let playerMoveX = getRandomIndex();
let playerMoveY = getRandomIndex();
let voldemortMoveX = getRandomIndex();
let voldemortMoveY = getRandomIndex();
let characterIndex = Math.floor(Math.random() * 25);

// Kollar så att spelaren, Harry Potter och Voldemort inte placeras på samma cell.
while (playerMoveY === characterIndex || playerMoveX === characterIndex ||
  playerMoveY === voldemortMoveY || playerMoveX === voldemortMoveX ||
  characterIndex === voldemortMoveY || voldemortMoveY === characterIndex) {
  playerMoveX = getRandomIndex();
  playerMoveY = getRandomIndex();
  voldemortMoveX = getRandomIndex();
  voldemortMoveY = getRandomIndex();
}

upBtn.addEventListener('click', moveUp);
rightBtn.addEventListener('click', moveRight);
downBtn.addEventListener('click', moveDown);
leftBtn.addEventListener('click', moveLeft);
let bgImageIndex = 0;
drawGameBoard()
createCharacters();
displayInstruction()


function drawGameBoard() {

  gameBoard.innerHTML = ""
  const bgContainer = document.getElementById('bgcontainer');
  const bgImage = document.getElementById('backgroundImg');
  bgImage.style.backgroundImage = backgroundImages[bgImageIndex];
  bgImage.style.width = "50vw";
  bgImage.style.height = "50vh";
  if (bgContainer) {
    bgContainer.appendChild(bgImage)
  }

  for (let i = 0; i < map.length; i++) {
    const row = document.createElement('tr');
    row.setAttribute("class", "row")

    for (let j = 0; j < map[i].length; j++) {
      const cell = document.createElement('td');
      cell.setAttribute("class", "cell")
      if (playerMoveY === i && playerMoveX === j) {
        cell.innerHTML = "HP"
      }
      else if (voldemortMoveY === i && voldemortMoveX === j) {

        cell.innerHTML = "V"
      }
      row.appendChild(cell);
    }
    gameBoard.appendChild(row);
  }

  if (map[playerMoveY][playerMoveX] === 'X') {
    map[playerMoveY][playerMoveX] = '';
    score.textContent = parseInt(score.textContent) + 10;
  }

}

function displayInstruction() {
  let text = document.getElementById('instructions')
  text.innerHTML = "Använda knapparna för att hitta dina vänner( X )..."
}

function createBgImages() {
  const bgImage = document.getElementById('backgroundImg');
  bgImageIndex = (bgImageIndex + 1) % backgroundImages.length;
  bgImage.style.backgroundImage = backgroundImages[bgImageIndex];
}


let btnPressCount = 0;
function moveUp() {
  if (playerMoveY > 0) {
    playerMoveY--;
    btnPressCount++
    moveVoldemort()
    checkForVoldemort()
    createBgImages()
    drawGameBoard()
  }
}

function moveRight() {

  if (playerMoveX < cols - 1) {
    playerMoveX++;
    btnPressCount++
    moveVoldemort()
    checkForVoldemort()
    createBgImages()
    drawGameBoard()
  }
}

function moveDown() {

  if (playerMoveY < rows - 1) {
    playerMoveY++;
    btnPressCount++
    moveVoldemort()
    checkForVoldemort()
    createBgImages()
    drawGameBoard()
  }
}

function moveLeft() {
  if (playerMoveX > 0) {
    playerMoveX--;
    btnPressCount++
    moveVoldemort()
    checkForVoldemort()
    createBgImages()
    drawGameBoard()
  }
}

function moveVoldemort() {
  if (btnPressCount % 2 === 0) {
    if (voldemortMoveY > playerMoveY) {
      voldemortMoveY--;
    }
    else if (voldemortMoveY < playerMoveY) {
      voldemortMoveY++;
    }
    if (voldemortMoveX > playerMoveX) {
      voldemortMoveX--;
    }
    else if (voldemortMoveX < playerMoveX) {
      voldemortMoveX++;
    }
  }
}

function checkForVoldemort() {
  if (playerMoveX === voldemortMoveX && playerMoveY === voldemortMoveY) {
   
    window.location.href = 'gameover.html';
  }
}

function getRandomIndex() {
  return Math.floor(Math.random() * 5);
}

function createCharacters() {
  
  let charactersFound = 0;

  for (let i = 0; i < numCharacters; i++) {
    let row = getRandomIndex();
    let col = getRandomIndex();

    while (map[row][col] !== '') {
      row = getRandomIndex();
      col = getRandomIndex();
    }

    if (i === characterIndex) {
      map[row][col] = ' ';
    } else {
      map[row][col] = 'X';
    }

    const cell = gameBoard.rows[row].cells[col];
    const text = document.createTextNode('X');
    cell.appendChild(text);

    if (row === playerMoveY && col === playerMoveX && map[row][col] === 'X') {
      score.textContent = parseInt(score.textContent) + 10;
      alert('Du räddade en vän!');
      charactersFound++;
    }

    if (charactersFound == numCharacters) {
      alert('Bra joobat, du hittade alla dina vänner!');
      window.location.href = 'playerwon.html';
    }
  }
}