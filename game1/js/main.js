function start() {
    //Beginnig of function start()
    //This function will be called on the html file, right in the div start (onclick="start()"")
    //When function start be called, the start div will be hidden and the 4 divs (jogar, inimigo1, inimigo2 and amigo) will be created

    //This sintaxe is only possible because we're using jquery
    //hide is a jquery comand
    /*The #start bellow is the div created in hte html file */
    $('#start').hide()
        //Using append command we create a new div inside gameBackground
        //"Create the div "player" which has the class"anima1" inside the div "gameBackground", etc
    $('#gameBackground').append("<div id='player' class='anima1'></div>")
    $('#gameBackground').append("<div id='enemy1' class='anima2'></div>")
    $('#gameBackground').append("<div id='enemy2'></div>")
    $('#gameBackground').append("<div id='friend' class='anima3'></div>")
        //All these divs are created after the click that makes the div start be hidden
        //Their postion are already set in the css file

    //MAIN VARS OF THE GAME
    const game = {}
        //For the enemy1 to move as we wish we have to use let instead of const
    let velocity = 5
        //The math.random makes the helicopter shows up in a different place in the Y position at a time
    let positionY = parseInt(Math.random() * 334) //This function finds a randomly value between 0 and 334
        //So the enemy1 will be postion between these values
    const KEY = {
        //In this var we create some definitions
        W: 87,
        S: 83,
        D: 68
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
        moveenemy1()
        moveenemy2()
        movefriend()
    }

    //This function moves the background of the game
    //In the function movebackground we created a var called left. We are cathing the gameBackground div
    //and the css property background-position, that is, the current property of the div background
    //parseInt coverts a string in a entire number
    function movebackground() {
        left = parseInt($('#gameBackground').css('background-position'))
            //Here we're taking the current value of the background-position
            //set in the css file to the div gameBackground that's
            //why we need parseInt because it turns string into whole numbers
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
                //The bellow prevents the helicopter to go beyond the top limit of the div
            if (topo <= 0) {
                $('#player').css('top', topo + 10)
            }
        }

        if (game.pressed[KEY.S]) {
            const topo = parseInt($('#player').css('top'))
            $('#player').css('top', topo + 10)
                //The bellow prevents the helicopter to go beyond the bottom limit of the div
            if (topo >= 434) {
                $('#player').css('top', topo - 10)
            }
        }

        // if (game.pressed[KEY.D]) {
        //     //Chama fun��o Disparo
        // }
    }

    function moveenemy1() {
        positionX = parseInt($('#enemy1').css('left'))
        $('#enemy1').css('left', positionX - velocity)
        $('#enemy1').css('top', positionY)

        if (positionX <= 0) {
            positionY = parseInt(Math.random() * 334)
            $('#enemy1').css('left', 694)
            $('#enemy1').css('top', positionY)
        }
    }

    function moveenemy2() {
        //This function creates a var which takes the "left" property of "enemy2" div(the truck)
        //then it takes the enemy2div and subtracts postionX-3 which makes the objects move
        //3 unities to the left.

        positionX = parseInt($('#enemy2').css('left'))
        $('#enemy2').css('left', positionX - 3)
            //When the var positionX has value minor/equals 0 it will be repositioned
            //in the right side of the div.
            //Notice that the truck moves slower than the enemy1, it's because the truck has
            // positionX - 3 and the enemy2 has velocity = 5.
        if (positionX <= 0) {
            $('#enemy2').css('left', 775)
        }
    }

    function movefriend() {
        positionX = parseInt($('#friend').css('left'))
        $('#friend').css('left', positionX + 1)

        if (positionX > 906) {
            $('#friend').css('left', 0)
        }
    }
}
//end of function start