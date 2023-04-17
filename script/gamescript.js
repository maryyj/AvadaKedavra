let gameBoard = document.getElementById("gameBoard")
let score = document.getElementById('score');
score.textContent = 0;
const rows = 5;
const cols = 5;


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
let characterIndex =  Math.floor(Math.random() * 25);

// Kollar så att spelaren, Harry Potter och Voldemort inte placeras på samma cell.
while (playerMoveY === characterIndex || playerMoveX === characterIndex ||
  playerMoveY === voldemortMoveY || playerMoveX === voldemortMoveX ||
  characterIndex === voldemortMoveY || voldemortMoveY === characterIndex) {
  playerMoveX = getRandomIndex();
  playerMoveY = getRandomIndex();
  voldemortMoveX = getRandomIndex();
  voldemortMoveY = getRandomIndex();
 
}

drawGameBoard()


function createCharacters() {
  const numCharacters = 4;
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
      map[row][col] = 'HP';
    }

    const cell = gameBoard.rows[row].cells[col];
    const text = document.createTextNode('HP');
    cell.appendChild(text);

    if (row === playerMoveY && col === playerMoveX && map[row][col] === 'HP') {
      score.textContent = parseInt(score.textContent) + 10;
      alert('Du räddade en karaktär!');
      charactersFound++;
    }

    if (charactersFound === numCharacters) {
      alert('Grattis du vann, du hittade alla karaktärerna!');
      window.location.href = 'playerwon.html';
    }
  }
}

function drawGameBoard() {

  gameBoard.innerHTML = ""

  for (let i = 0; i < map.length; i++) {
    const row = document.createElement('tr');
    row.setAttribute("class", "row")
    for (let j = 0; j < map[i].length; j++) {
      const cell = document.createElement('td');
      cell.setAttribute("class", "cell")
      if (playerMoveY === i && playerMoveX === j) {
        cell.innerHTML = "X"
      }
      else if (voldemortMoveY === i && voldemortMoveX === j) {

        cell.innerHTML = "V"
      }
      row.appendChild(cell);
    }
    gameBoard.appendChild(row);
  }
  if (map[playerMoveY][playerMoveX] === 'HP') {
    map[playerMoveY][playerMoveX] = '';
    score.textContent = parseInt(score.textContent) + 10;
    alert('Du räddade en karaktär!');
  }
  createCharacters();
}
const upBtn = document.getElementById('upButton');
const rightBtn = document.getElementById('rightButton');
const downBtn = document.getElementById('downButton');
const leftBtn = document.getElementById('leftButton');

upBtn.addEventListener('click', moveUp);
rightBtn.addEventListener('click', moveRight);
downBtn.addEventListener('click', moveDown);
leftBtn.addEventListener('click', moveLeft);

function moveUp() {

  if (playerMoveY > 0) {
    playerMoveY--;
    moveVoldemort()
    checkForVoldemort()
    drawGameBoard()
  }
}

function moveRight() {

  if (playerMoveX < cols - 1) {
    playerMoveX++;
    moveVoldemort()
    checkForVoldemort()
    drawGameBoard()
  }
}

function moveDown() {

  if (playerMoveY < rows - 1) {
    playerMoveY++;
    moveVoldemort()
    checkForVoldemort()
    drawGameBoard()
  }
}

function moveLeft() {
  if (playerMoveX > 0) {
    playerMoveX--;
    moveVoldemort()
    checkForVoldemort()
    drawGameBoard()
  }
}
function moveVoldemort() {
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
function checkForVoldemort() {
  if (playerMoveX === voldemortMoveX && playerMoveY === voldemortMoveY) {
    alert('Voldemort hittade dig!');
    window.location.href = 'gameover.html';
  }
}
function getRandomIndex() {
  return Math.floor(Math.random() * 5);
}