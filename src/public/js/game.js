const game = {
    level: 0,
    order: [],
    user_order: [],
}

$(document).ready(function() {
    $(".field").on('click', function(event){
        const value = event.currentTarget.dataset['value'];
        playerMove(value);
    });
});

function playerMove(selectedColor) {
    console.log(selectedColor);
}