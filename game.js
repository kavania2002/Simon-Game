// alert("It's working");
var buttonColours = ['red','blue','green','yellow'];
var gamePattern = [];
var userClickPattern = [];


var level = 0;
var started = false;

$(document).keypress(function(){
    if (!started){
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    
    var userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickPattern.length - 1)
    // alert(userClickPattern);  
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        if (userClickPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $('body').addClass('game-over');
        $('h1').text("Game Over, Press Any Key to Restart");

        setTimeout(function (){
            $('body').removeClass('game-over');
        }, 200);

        startOver();
    }
}

function nextSequence(){
    userClickPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}