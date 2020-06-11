const gameBoard = function(){

    let board = [['','',''],
                 ['','',''],
                 ['','','']];

    function isFieldExistant(col, row){
        let result = false;
        if (col >= 0 && col <= 2) {
            if (row >= 0 && row <= 2) {
                result = true;
            }
        }
        return result;
    }

    function isFieldEmpty(col, row){
        let result = false;
        if (isFieldExistant) {
            if (board[row][col] == '') {
                result = true;
            }
        }
        return result;
    }

    function setField(col, row, char){
        if (char != 'x' && char != 'o') return
        if (isFieldEmpty(col, row)) {
            board[row][col] = char;
        } 
    }

    function getField(col, row){
        if (!isFieldExistant) return
        return board[row][col];
    }

    return {isFieldEmpty, setField, getField};
}();

const displayControl = function(){
    const board = document.querySelector('.gameBoard');

    function isBoardReady(){
        if (board.childElementCount == 0) {
            return false;
        } else {
            return true;
        }
    }

    function createField(col, row){
        const div = document.createElement('div');
        div.classList.add('field');
        div.setAttribute('row',row);
        div.setAttribute('col',col);
        board.appendChild(div);
        div.addEventListener('click', onClick);
    }

    function createBoard(){
        if (isBoardReady()) return
        for (let row = 0; row <= 2; row++) {
            for (let col = 0; col <= 2; col++) {
                createField(col, row);
            }
        }
    }

    function styleField(col, row, char, div){
        div.textContent = char;
        if (char == 'x') {
            div.style = 'color: darkred';
        } else {
            div.style = 'color: olive';
        }
    }

    function render(board){
        if (!isBoardReady()) {
            createBoard();
        }
        const divs = document.querySelectorAll('.field');
        divs.forEach(div => {
            const col = div.getAttribute('col');
            const row = div.getAttribute('row');
            const char = board.getField(col, row);
            styleField(col, row, char, div);
        })
    }

    function onClick(e){
        const div = e.target;
        const row = div.getAttribute('row');
        const col = div.getAttribute('col');
        const char = game.nextPlayer().char;
        if (gameBoard.isFieldEmpty(col, row)) {
            gameBoard.setField(col, row, char);
            styleField(col, row, char, div);
            game.swapPlayer();
        }
    }

    return{render};
}();

function player(name, char){
    let score = 0;
    let isNext = false;

    function incScore(){
        score++;
    }

    function delScore(){
        score = 0;
    }

    function getScore(){
        return score;
    }

    return {name, char, incScore, delScore, getScore};
}

const game = function(){
    const playerA = player('Alex','x');
    const playerB = player('Agi','o');
    let playerNext = playerA;

    displayControl.render(gameBoard);

    function swapPlayer(){
        if (playerNext == playerA) {
            playerNext = playerB;
        } else {
            playerNext = playerA;
        }
    }

    function nextPlayer() {
        return playerNext;
    }

    return {swapPlayer, nextPlayer}
}();
