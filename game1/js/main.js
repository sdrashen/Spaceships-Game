function start() {
    //Beginnig of function start()
    //This function will be called on the html file, right in the div start (onclick="start()"")
    //When function start be called, the start div will be hidden and the 4 divs (jogar, inimigo1, inimigo2 and amigo) will be created

    //This sintaxe is only possible because we're using jquery
    $('#start').hide()
        //Using append command we create a new div inside gameBackground
    $('#gameBackground').append("<div id='jogador'></div>")
    $('#gameBackground').append("<div id='inimigo1'></div>")
    $('#gameBackground').append("<div id='inimigo2'></div>")
    $('#gameBackground').append("<div id='amigo'></div>")
}
//end of function start