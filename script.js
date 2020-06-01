window.addEventListener('load', startGame);

let boardEl = document.getElementById('board');
let modalEl = document.getElementById('modal');
let resetButtons = document.getElementsByClassName('reset');

for (let btn of resetButtons) {
  btn.addEventListener('click', function () {
    if (!modalEl.classList.contains('hidden')) {
      modalEl.classList.add('hidden');
    }
    startGame();
  });
}

boardEl.addEventListener('click', function (event) {
  let targetClasses = event.target.classList;
  let targetData = event.target.dataset;
  if (targetClasses.contains('field') && !targetClasses.contains('busy')) {
    click(targetData.row, targetData.col);
  }
});

function showWinner(winner) {
  let header = modalEl.getElementsByTagName('h2')[0];
  if (winner >= 0) {
    header.textContent = `🍾 Победил игрок №${winner + 1}! 🍾`;
  } else if (winner === undefined) {
    header.textContent = `🤜🤛 Победила дружба!`;
  }
  modalEl.classList.remove('hidden');
}

function renderBoard(board) {
  const fields = [];
  for (let [i, row] of board.entries()) {
    for (let [j, value] of row.entries()) {
      fields.push(`
        <div class="field ${value ? 'busy' : 'free'}" 
            data-row="${i}" 
            data-col="${j}"
            style="grid-row:${i + 1};grid-column:${j + 1};"
        >
          ${value || ''}
        </div>
      `);
    }
  }
  boardEl.innerHTML = fields.join('');
}


let players = ['x', 'o']; //массив игроков (можно добавлять игроков)
let boardSize = 3; //переменная указывает размер поля
let activePlayer; //переменная активного игрока
let board; //переменная с массивом доски  

/**
 * Assigns a random number depending on the length of the transmitted array. Uses the given number as an array index.
 * @param {object} array
 */

function chooseActivePlayer(array) {
	let length = array.length; //будем передавать длину массива в качестве пограничного значения рандома
	let randomNumber = (Math.random() * length);
	let number = Math.floor(randomNumber);
	let index = array[number]; //передадим число в индекс массиву
	return index; //вернем значение (в данном случае либо 0 либо 1)
}

/**
 * Change Active Player and give the next tip.
 * @param {string} strFromArray
 */

function nextPlayer(strFromArray) {
	indexOfPlayer = players.indexOf(strFromArray); //ищем индекс активного игрока в массиве players
	lastIndexPlayer = players.length - 1; //индекс последнего хода будет равен длине массива -1 (так как отсчет с 0)
	if (indexOfPlayer === lastIndexPlayer) {
		activePlayer = players[0];
		return activePlayer;
	}
	else {
		activePlayer = players[indexOfPlayer + 1];
		return activePlayer;
	}
}

function startGame() {
	board = [];
	for (let i = 0; i < boardSize; i++) {
		board.splice(i, 0, []);
		for (let j = 0; j < boardSize; j++) {
			board[i][j] = "";
		}
	}
	activePlayer = chooseActivePlayer(players);
	renderBoard(board);
}

function click(row, col) {
	board[row][col] = activePlayer; //выставляем значение в ячейку

	renderBoard(board);
	checkWinner();
	nextPlayer(activePlayer);
}

function checkWinner() {
	let count = 0; //счетчик
	
	for (j = 0; j < boardSize; j++) { //идем по внешнему массиву
		let countHorizontal = 0;
		let countVertical = 0;
		let countDiagonalLeft = 0;
		let countDiagonalRight = 0;
		for (let i = 0; i < boardSize; i++) { //идем по внутренности

			if (board[j][i] == activePlayer) { //00 01 02 | 10 11 12... (горизонталь)
				countHorizontal++;
			}

			if (board[i][j] == activePlayer) { //00 10 20 | 10 11 21... (вертикаль)
				countVertical++;
			}

			if (board[i][i] == activePlayer) { //00 11 22 (диагональ)
				countDiagonalLeft++;
			}

			let index = board.length - 1 - i; //3-1-0 | 3-1-1 | 3-1-2

			if (board[i][index] == activePlayer) { //02 11 00
				countDiagonalRight++;
			}

			if (board[j][i]) {
				count++;
				console.log(count);
			}

			if (countHorizontal === boardSize ||
				countVertical === boardSize ||
				countDiagonalLeft === boardSize ||
				countDiagonalRight === boardSize) {

				showWinner(players.indexOf(activePlayer));
			}
			
			if (countHorizontal !== boardSize &&
				countVertical !== boardSize &&
				countDiagonalLeft !== boardSize &&
				countDiagonalRight !== boardSize &&
				count === boardSize * boardSize) {

				showWinner(undefined);
			}
		}
	}
}
