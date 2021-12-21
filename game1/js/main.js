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
    $('#gameBackground').append("<div id='score'></div>")
    $('#gameBackground').append("<div id='energy'></div>")
        //All these divs are created after the click that makes the div start be hidden
        //Their postion are already set in the css file

    //MAIN VARS OF THE GAME
    let gameOver = false
    let canShoot = true

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
    let points = 0
    let saveds = 0
    let losts = 0
    let = currentEnergy = 3
        //We're using pure javascript for the sounds because of some incompatibilities there might be while using jquery for this

    game.pressed = [] //This is a var type array
        //GAME sounds
    const shotSound = document.getElementById('shotSound')
    const explosionSound = document.getElementById('explosionSound')
    const music = document.getElementById('music')
    const gameOverSound = document.getElementById('gameOverSound')
    const lostSound = document.getElementById('lostSound')
    const rescueSound = document.getElementById('rescueSound')
        //Music in loop. We're adding a event to the music so it will be played over and over again
    music.addEventListener(
        'ended',
        function() {
            music.currentTime = 0
            music.play()
        },
        false
    )
    music.play()

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
        collision()
        score()
        energy()
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
        //Calling the function shoot
        if (game.pressed[KEY.D]) {
            shot()
        }
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

    function shot() {
        //We start by checking if the var canShoot equals true, so all the following code will work
        if (canShoot == true) {
            //Here we change the var value to false so the player won't be able to shot again
            //while the code bellow is not executed.
            shotSound.play()
            canShoot = false

            topo = parseInt($('#player').css('top')) //Here we indicate the inital position of the shot which
                //must be right in front of player, the black helicopter
            positionX = parseInt($('#player').css('left'))
            shotX = positionX + 190 //Move the shot to the right
            topoShot = topo + 39 //Sets the exactly position of the shot: from the front of the player
                //After setting the position of the shot, we create the div that has its content specified in the css file
            $('#gameBackground').append("<div id='shot'></div")
                //In the two code lines bellow we've positioned the div we just created
            $('#shot').css('top', topoShot)
            $('#shot').css('left', shotX)
                //After postioning the div we've got to make it move
                //Here I tried let and const but the only one that makes it work is var
            var timeShot = window.setInterval(executeShot, 30)
        }

        function executeShot() {
            //Here we take the current position of the shot, when it appears on the screen and
            //make it move 15 unities, this definies the velocity of the shot
            positionX = parseInt($('#shot').css('left'))
            $('#shot').css('left', positionX + 15)
                //After making the div move through the background we have to delete it from the screen, so
            if (positionX > 900) {
                window.clearInterval(timeShot)
                    //On some browsers you have to indicate that the var is null otherwise the Interval won't be cancelled
                timeShot = null
                    //Here we remove the shot from the screen and allow the player to shoot again
                $('#shot').remove()
                canShoot = true
            }
        } // Fecha executaDisparo()
    }

    function collision() {
        //collision is a function of the framework jquery collision. It will identify the collision between the div player (black helicopter) and enemy1(yellow helicopter)
        let collision1 = $('#player').collision($('#enemy1'))
        let collision2 = $('#player').collision($('#enemy2'))
        let collision3 = $('#shot').collision($('#enemy1'))
        let collision4 = $('#shot').collision($('#enemy2'))
        let collision5 = $('#player').collision($('#friend'))
        let collision6 = $('#enemy2').collision($('#friend'))
            //When happens a collision this var receives a bunch of informations
            //The cod lines bellow identifies if the div is filled or not
        if (collision1.length > 0) {
            currentEnergy--
            /*If it happens the div is filled*/
            //The two vars bellow captured the current position of the enemy
            enemy1X = parseInt($('#enemy1').css('left'))
            enemy1Y = parseInt($('#enemy1').css('top'))
                //After we got the enemy's position we call function (explosion1) and we send by parameters the vars above so in the function we'll have those values to create the explosion
            explosion1(enemy1X, enemy1Y)
                //And so we will reposition enemy1 by creating a var called positionY that is going to have a random value between 0 and 334

            positionY = parseInt(Math.random() * 334)
            $('#enemy1').css('left', 694) /*694 is the position on the right side */
            $('#enemy1').css('top', positionY)
        }

        if (collision2.length > 0) {
            currentEnergy--
            enemy2X = parseInt($('#enemy2').css('left'))
            enemy2Y = parseInt($('#enemy2').css('top'))
            explosion2(enemy2X, enemy2Y)

            $('#enemy2').remove()
                //Here we make the enemy2 show up again (Because of mozila we can't create the code directly hee we have to call another function for that)
            reposicionEnemy2()
        }

        //Here we are reusing explosion1
        //Shot against enemy1
        if (collision3.length > 0) {
            points = points + 100
            velocity = velocity + 0.3
            enemy1X = parseInt($('#enemy1').css('left'))
            enemy1Y = parseInt($('#enemy1').css('top'))
                //Repositioning the shot
                //In the function shot the value is 900
                //We can't remove here because we need the function shot to be finalized
            explosion1(enemy1X, enemy1Y)
            $('#shot').css('left', 950)

            posicionY = parseInt(Math.random() * 334)
            $('#enemy1').css('left', 694)
            $('#enemy1').css('top', posicionY)
        }
        //Shot against enemy2
        if (collision4.length > 0) {
            points = points + 50
            enemy2X = parseInt($('#enemy2').css('left'))
            enemy2Y = parseInt($('#enemy2').css('top'))
            $('#enemy2').remove()

            explosion2(enemy2X, enemy2Y)
            $('#shot').css('left', 950)

            reposicionEnemy2()
        }
        //player x friend
        if (collision5.length > 0) {
            saveds++
            rescueSound.play()
            reposicionFriend()
            $('#friend').remove()
        }
        //enemy2 x friend
        if (collision6.length > 0) {
            losts++
            rescueSound()
            friendX = parseInt($('#friend').css('left'))
            friendY = parseInt($('#friend').css('top'))
            explosion3(friendX, friendY)
            $('#friend').remove()

            reposicionFriend()
        }
    } //end of function collision

    function explosion1(enemy1X, enemy1Y) {
        explosionSound.play()
        $('#gameBackground').append("<div id='explosion1'></div")
        $('#explosion1').css('background-image', 'url(imgs/explosao.png)')
        const div = $('#explosion1') //This var was created to don't repeat all the lines above
            //The lines above indicate the position where the explosion will show up
        div.css('top', enemy1Y)
        div.css('left', enemy1X)
            //In the css file we have the initial properties of this div, here we have how it will behave
        div.animate({ width: 200, opacity: 0 }, 'slow')

        let timeExplosion = window.setInterval(removeExplosion, 1000)

        function removeExplosion() {
            div.remove()
            window.clearInterval(timeExplosion)
            timeExplosion = null
        }
    }
    //The function bellow says that enemy2 will be bacl on screen after 5s
    function reposicionEnemy2() {
        explosionSound.play()
        let timeCollision4 = window.setInterval(reposicion4, 5000)

        function reposicion4() {
            window.clearInterval(timeCollision4)
            timeCollision4 = null
                //We need to stablish that it will only happen if the isn't over because otherwise there wouldn't be a reson for enemy2 to be back on teh screen
            if (gameOver == false) {
                $('#gameBackground').append('<div id=enemy2></div')
            }
        }
    }

    function explosion2(enemy2X, enemy2Y) {
        $('#gameBackground').append("<div id='explosion2'></div")
        $('#explosion2').css('background-image', 'url(imgs/explosao.png)')
        let div2 = $('#explosion2')
        div2.css('top', enemy2Y)
        div2.css('left', enemy2X)
        div2.animate({ width: 200, opacity: 0 }, 'slow')

        let timeExplosion2 = window.setInterval(removeExplosion2, 1000)

        function removeExplosion2() {
            div2.remove()
            window.clearInterval(timeExplosion2)
            timeExplosion2 = null
        }
    }

    function reposicionFriend() {
        let timeFriend = window.setInterval(reposicion6, 6000)

        function reposicion6() {
            window.clearInterval(timeFriend)
            timeFriend = null

            if (gameOver == false) {
                $('#gameBackground').append("<div id='friend' class='anima3'></div>")
            }
        }
    }

    function explosion3(friendX, friendY) {
        lostSound.play()
            //Creates a div class=anima4 in the background
        $('#gameBackground').append("<div id='explosion3' class='anima4'></div>")
        $('#explosion3').css('top', friendY)
        $('#explosion3').css('left', friendX)
        let timeExplosion3 = window.setInterval(resetExplosion3, 1000)

        function resetExplosion3() {
            $('#explosion3').remove()
            window.clearInterval(timeExplosion3)
            timeExplosion3 = null
        }
    }
    //As this function is inside gameloop, this ponctuation will always be updated in the div
    function score() {
        $('#score').html(
            '<h2> Points: ' +
            points +
            ' Saveds: ' +
            saveds +
            ' Losts: ' +
            losts +
            '</h2>'
        )
    }
    //The function bellow controls the energy of the player
    function energy() {
        if (currentEnergy == 3) {
            $('#energy').css('background-image', 'url(imgs/energia3.png)')
        }

        if (currentEnergy == 2) {
            $('#energy').css('background-image', 'url(imgs/energia2.png)')
        }

        if (currentEnergy == 1) {
            $('#energy').css('background-image', 'url(imgs/energia1.png)')
        }

        if (currentEnergy == 0) {
            $('#energy').css('background-image', 'url(imgs/energia0.png)')

            //Game Over
            endGame()
        }
    }
    //The gameOver function changes the value of the var gameOver to "true". It will, for example, avoid the repositionings to happen. It's main task is to stop the game loop
    //Here I changed the name of the function from gameOver to endGame because I've already had created a var called gameOver
    function endGame() {
        endGame = true
        music.pause()
        gameOverSound.play()
            //The code line belloew is the main line of this function because it stop the game loop
        window.clearInterval(game.timer)
        game.timer = null

        $('#player').remove()
        $('#enemy1').remove()
        $('#enemy2').remove()
        $('#friend').remove()

        $('#gameBackground').append("<div id='end'></div>")

        $('#end').html(
            '<h1> Game Over </h1><p>Your score: ' +
            points +
            '</p>' +
            "<div id='restart' onClick=restartGame()><h3>Play again</h3></div>"
        )
    }
}
//end of function start