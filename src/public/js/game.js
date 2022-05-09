const game = {
    level: 0,
    order: [],
    user_order: [],
    time: 500,
    player_turn: false,
}

const buttonsOrder = ['green-field', 'red-field', 'yellow-field', 'blue-field'];

$(document).ready(function() {
    $(".field").on('click', function(event){
        const value = event.currentTarget.dataset['value'];
        playerMove(value);
    });
});

function playerMove(selectedColor) {
    if(!game.player_turn) {
        return;
    }
    const position = game.user_order.length;
    if(game.order[position] !== selectedColor) {
        wrongAnswer();
        return;
    }
    game.user_order[game.user_order.length] = selectedColor;
    const movesLefting = game.level-position;
    $('#leftMoves').text(movesLefting);

    if(position === game.order.length - 1) {
        correctAnswer();
    }
}

function createNewMove() {
    const selectedColor = buttonsOrder[Math.floor(Math.random() * buttonsOrder.length)];
    game.order[game.level] = selectedColor;
    $('#score').text(`Level: ${game.level+1}`);
    $('#leftMoves').text(game.level+1);
}

function turnOnColor(element) {
    element.classList.add('selected');
}

function turnOffColor(element) {
    element.classList.remove('selected');
}

function showSequence(order, index=0) {
    game.player_turn = false;
    if(order[index] === undefined) {
        game.player_turn = true;
        return;
    }
    const element = $(`#${order[index]}`)[0];
    setTimeout(() => {
        turnOnColor(element);
        setTimeout(() => {
            turnOffColor(element);
            showSequence(order, index+1)
        }, game.time);
    }, game.time);
}

function correctAnswer() {
    game.level += 1;
    play();
}

function wrongAnswer() {
    $('#leftMoves').text('Errooooou!!!!');
    clean();
}

function clean() {
    game.level = 0;
    game.order = [];
    game.user_order = [];
    game.player_turn = false;
}

function play() {
    createNewMove();
    showSequence(game.order);
    game.user_order = [];
}

function restart() {
    clean();
    play();
}
