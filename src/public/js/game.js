const game = {
    level: 0,
    order: [],
    user_order: [],
    time: 500,
}

const buttonsOrder = ['green-field', 'red-field', 'yellow-field', 'blue-field'];

$(document).ready(function() {
    $(".field").on('click', function(event){
        const value = event.currentTarget.dataset['value'];
        playerMove(value);
    });
});

function playerMove(selectedColor) {
    console.log(selectedColor);
}

function createNewMove() {
    const selectedColor = buttonsOrder[Math.floor(Math.random() * buttonsOrder.length)];
    game.order[game.level] = selectedColor;
}

function turnOnColor(element) {
    element.classList.add('selected');
}

function turnOffColor(element) {
    element.classList.remove('selected');
}

function showSequence(order, index=0) {
    if(order[index] === undefined) {
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
}

function play() {
    createNewMove();
    showSequence(game.order)
    correctAnswer();
}
