//using only jQuery
var player1 = prompt("Enter your Name, you are player one and you will be blue");
var player1Color = "rgb(86, 151, 255)";
var player2 = prompt("Enter your name, you are player two and you will be red");
var player2Color = "rgb(237, 45, 73)";

var game_on = true;
var table = $("table tr");

//function for debugging purpose
function reportWin(rowNum,colNum) {
  console.log("You won starting at this row and column");
  console.log(rowNum);
  console.log(colNum);
}

//change the color of a button
function changeColor(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color",color);
}

//return the color of a button
function returnColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color");
}

//returns the bottom most row that is grey
function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === "rgb(128, 128, 128)") {
      return row;
    }
  }
}

//check to see if 4 buttons passed as parameters are of same color
function colorMatch(one,two,three,four) {
  return(one===two && one===three && one===four && one!=="rgb(128, 128, 128)" && one!==undefined)
}

//checking for horizontal wins
function horWinCheck() {
  for (var row = 0; row < 6; row++){
    for (var col = 0; col <4; col++) {
      if(colorMatch(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row,col+3))){
        console.log("4 chips connected horirontally");
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

//checking for vertical wins
function verWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if(colorMatch(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))){
        console.log("4 chips connected vertically");
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

//checking for diagonal wins
function diagWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if(colorMatch(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))){
        console.log("4 chips connected diagonally");
        reportWin(row,col);
        return true;
      }else if (colorMatch(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log("4 chips connected diagonally");
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}


var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

//game end function
function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('h3').fadeOut("1000");
      $('h2').fadeOut("1000");
      $('h1').html(winningPlayer+" has won! Refresh your browser to play again!");
    }
  }
}

$("h3").text(player1+" ,it's your turn to pick a column to drop");
$(".board button").on("click",function() {
  //getting the clicked Column
  var col = $(this).closest("td").index();
  //fetching the bottom most row of the col
  var bottomAvail = checkBottom(col);
  //dropping the chip
  changeColor(bottomAvail,col,currentColor);
  //checking for win or tie
  if (horWinCheck() || verWinCheck() || diagWinCheck()) {
    gameEnd(currentName);
  }
  //for switching player
  currentPlayer = currentPlayer * -1;
  //checking current player
  if(currentPlayer === 1){
    currentName = player1;
    $("h3").text(currentName+" ,it is your turn.");
    currentColor = player1Color;
  }else {
    currentName = player2;
    $("h3").text(currentName+" ,it is your turn.");
    currentColor = player2Color;
  }
})
