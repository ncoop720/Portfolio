var inputReady = false;
var regularMode = false;
var strictMode = false;
var playButtonsReady = true;
var sequence = [];
var count = 0;
var userInput = [];
var y; //used as a setInterval in the playGame function

//the audio used for each button
var greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

//user input click function
$(".playButton").click(function(){
  var input = this.id;
  if (inputReady==true){
    soundAndLight(input);
    if (input=="green"){
      userInput.push(1);
    }
    if (input=="red"){
      userInput.push(2);
    }
    if (input=="yellow"){
      userInput.push(3);
    }
    if (input=="blue"){
      userInput.push(4);
    }
    //check if input is wrong
    for (var i=0; i<userInput.length; i++){
      if (userInput[i]!==sequence[i]){
        if (regularMode==true){
          inputReady = false;
          setTimeout('alert("Retry!")', 500);
          setTimeout('playGame()', 1000);
        }
        else if (strictMode==true){
          inputReady = false;
          generateSequence();
          count = 1;
          setTimeout('playGame()', 1000);
          setTimeout('alert("Start over!")', 500);
          $('#count').html(0);
        }
      }
    }
    //check if input is right
    if (userInput[userInput.length-1]==sequence[userInput.length-1]){
        if (userInput.length==count && userInput.length==20){
          alert("you win!");
          setTimeout(location.reload.bind(location), 1000);
        }
        else if (userInput.length==count){
          count++;
          setTimeout('playGame()', 1000);
        }
      }
  }
});

//makes sound and light for the button
function soundAndLight(color){
  if (color=="green"){
    greenAudio.pause();
    greenAudio.currentTime = 0;
    greenAudio.play();
    document.getElementById("green").style.background = "lightgreen";
    setTimeout('document.getElementById("green").style.background = "green"', 200);
  }
  if (color=="red"){
    redAudio.pause();
    redAudio.currentTime = 0;
    redAudio.play();
    document.getElementById("red").style.background = "lightcoral";
    setTimeout('document.getElementById("red").style.background = "red"', 200);
  }
  if (color=="yellow"){
    yellowAudio.pause();
    yellowAudio.currentTime = 0;
    yellowAudio.play();
    document.getElementById("yellow").style.background = "lightgoldenrodyellow";
    setTimeout('document.getElementById("yellow").style.background = "yellow"', 200);
  }
  if (color=="blue"){
    blueAudio.pause();
    blueAudio.currentTime = 0;
    blueAudio.play();
    document.getElementById("blue").style.background = "lightskyblue";
    setTimeout('document.getElementById("blue").style.background = "blue"', 200);
  }
}

//generates a new sequence of presses
function generateSequence(){
  for (var i=0; i<20; i++){
    sequence[i] = Math.floor(Math.random() * 4) + 1 
  }
}

//regular button
function playRegularMode(){
  if (regularMode==false && playButtonsReady==true){
    regularMode = true;
    strictMode = false;
    generateSequence();
    $('#regular').html("Reset");
    $('#strict').html("Strict");
    count = 1;
    playGame();
  }
  else if (regularMode==true && playButtonsReady==true){
    regularMode = false;
    strictMode = false;
    count = 0;
    $('#count').html(count);
    $('#regular').html("Regular");
    $('#strict').html("Strict");
    clearInterval(y);
  }
}

//strict button
function playStrictMode(){
  if (strictMode==false && playButtonsReady==true){
    strictMode = true;
    regularMode = false;
    generateSequence();
    $('#regular').html("Regular");
    $('#strict').html("Reset");
    count = 1;
    playGame();
  }
  else if (strictMode==true && playButtonsReady==true){
    strictMode = false;
    regularMode = false;
    count = 0;
    $('#count').html(count);
    $('#regular').html("Regular");
    $('#strict').html("Strict");
    clearInterval(y);
  }
}

//computer controlled sequence
function playGame(){
  playButtonsReady = false;
  inputReady = false;
  $('#count').html(count);
  userInput = [];
  var x = 0;
  var y = setInterval (function(){
    switch(sequence[x]){
      case 1:
        soundAndLight("green");
        break;
      case 2:
        soundAndLight("red");
        break;
      case 3:
        soundAndLight("yellow");
        break;
      case 4:
        soundAndLight("blue");
        break;
    }
    x++;
    if (x==count){
      setTimeout(inputReady=true, 800*x + 400);
      setTimeout(playButtonsReady=true, 800*x + 400);
      clearInterval(y);
    }
  }, 800);x
  x=0;
}