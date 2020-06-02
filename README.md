# Дипломная работа по курсу *«Основы программирования»*

## Tic-tac-toe with multiplayer, draw-check and resize map

## Описание:

В качестве дипломного проекта необходимо было описать логику игры. Внешний вид был предоставлен. Задание находится по [ссылке](https://github.com/netology-code/pb-diplom).

### В рамках проекта, помимо задания, было реализовано:

* Поддержка нескольких игроков;
* Регулировка размера поля;
* Проверка на ничью.

### В процессе выполнения были написаны дополнительные функции:

* `chooseActivePlayer(array)` - функция производит рандомный выбор начинающего игрока

    <details>
    <summary>Посмотреть код функции</summary>

    ```javascript 
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
    ```
    </details>

* `nextPlayer(strFromArray)` - передача хода игроку

    <details>
    <summary>Посмотреть код функции</summary>

    ```javascript
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
    ```
    </details>

* `function checkWinner()` - проверка победы игрока и проверка ничьи

    <details>
    <summary>Посмотреть код функции</summary>

    ```javascript
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
    ```
    </details>

    ## Что хочется доделать?

    1. Выбор размера поля
    1. Выбор значка игрока
    1. Отредактировать наезжание текста