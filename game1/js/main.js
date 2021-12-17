function start() {
    //Beginnig of function start()
    //This function will be called on the html file, right in the div start (onclick="start()"")
    //When function start be called, the start div will be hidden and the 4 divs (jogar, inimigo1, inimigo2 and amigo) will be created

    //This sintaxe is only possible because we're using jquery
    $('#start').hide()
        //Using append command we create a new div inside gameBackground
    $('#gameBackground').append("<div id='jogador' class='anima1'></div>")
    $('#gameBackground').append("<div id='inimigo1' class='anima2'></div>")
    $('#gameBackground').append("<div id='inimigo2'></div>")
    $('#gameBackground').append("<div id='amigo' class='anima3'></div>")

    const game = {}

    //Game Loop is a function that will run constantly and inside this function we also may call other functions that should run constantly
    //If game loop stops so will the game
    game.timer = setInterval(loop, 30) //Here we're calling loop function each 30ms
        //timer is a property. setIntervel is a time comand where we indicate the function and the running time.

    function loop() {
        movebackground()
    }

    //This function moves the background of the game
    //In the function movebackground we created a var called left. We are cathing the gameBackground div
    //and the css property background-position, that is, the current property of the div background
    //parseInt coverts a string in a entire number
    function movebackground() {
        left = parseInt($('#gameBackground').css('background-position'))
            //By default the initial position is 0. Here we're updating its current position.
            // left (0) -1 means that the bg will move 1px to the left
        $('#gameBackground').css('background-position', left - 1)
            //As the loop function will run every 30ms, 1px will always be subtracted the background will always be moving
            //We can change the velocity of the moving by changing the -1
    }
}
//end of function start