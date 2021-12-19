function start() {
    //Beginnig of function start()
    //This function will be called on the html file, right in the div start (onclick="start()"")
    //When function start be called, the start div will be hidden and the 4 divs (jogar, inimigo1, inimigo2 and amigo) will be created

    //This sintaxe is only possible because we're using jquery
    $('#start').hide()
        //Using append command we create a new div inside gameBackground
    $('#gameBackground').append("<div id='player' class='anima1'></div>")
    $('#gameBackground').append("<div id='enemy1' class='anima2'></div>")
    $('#gameBackground').append("<div id='enemy2'></div>")
    $('#gameBackground').append("<div id='friend' class='anima3'></div>")

    //Main vars of the game
    const game = {}
    const KEY = {
        //In this var we create some definitions
        W: 13,
        S: 01,
        D: 02
    }

    game.pressed = [] //This is a var type array

    // //The code bellow check if the player pressed a key. We do that by using keydown

    $(document).keydown(function(e) {
            game.pressed[e.which] = true
        })
        //     //keyup measn that no key is being pressed
    $(document).keyup(function(e) {
            game.pressed[e.which] = false
        })
        //To identify which key was pressed we use a function that will be called in the gameloop

    //Game Loop is a function that will run constantly and inside this function we also may call other functions that should run constantly
    //If game loop stops so will the game
    game.timer = setInterval(loop, 30) //Here we're calling loop function each 30ms
        //Here we created a property (timer) to the game var. setIntervel is a time comand where we indicate the function and the running time.

    function loop() {
        movebackground()
        moveplayer()
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

    function moveplayer() {
        if (game.pressed[KEY.W]) {
            const topo = parseInt($('#player').css('top'))
                //Taking the css value of the top div. For example, if this div has value of 20 then the var top will value 20
            $('#player').css('top', topo - 10) //Here we update the same player div in the to property with the value of 20 - 10
                //So the nave will rise 10 unites up
        }

        if (game.pressed[KEY.S]) {
            const topo = parseInt($('#player').css('top'))
            $('#player').css('top', topo + 10)
        }

        // if (game.pressed[KEY.D]) {
        //     //Chama fun��o Disparo
        // }
    }
}
//end of function start