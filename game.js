

var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;

function nextSequence(){
  var randomNumber = Math.floor(Math.random()* buttonColours.length);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push (randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);

  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
}
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  $("#"+userChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColor){
  $("." + currentColor).addClass("pressed");
  setTimeout(function(){
    $("." + currentColor).removeClass("pressed");
  },100);
}

$(document).keypress(function(){
  nextSequence();


})

var level = 0;

function checkAnswer(currentlevel){
  if(gamePattern[currentlevel] == userClickedPattern[currentlevel]){
    console.log("success");
    if(gamePattern.length==userClickedPattern.length){
    setTimeout(function(){
    nextSequence();
    },1000);
  }
}
  else{
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();

}

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;

}
