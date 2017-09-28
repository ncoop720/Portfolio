"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var board;
var preset;
var speed = 50;
var myInterval;
var height = 20;
var width = 30;
var generation = 0;
var isRunning = false;

$(document).ready(function () {
  generateRandomCells();
  generateBoard();

  //add or remove cells on click
  $(document).on("click", ".cell", function () {
    var key = $(this).attr("id").split("-");
    //dead cells come to life
    if (board[key[0]][key[1]] == 'dead') {
      board[key[0]][key[1]] = 'new';
    }
    //alive cells become dead
    else {
        board[key[0]][key[1]] = 'dead';
        $(this).removeClass("new");
      }
    generateBoard();
  });

  //change highlighted speed button
  $(".spdBtn").click(function () {
    $(".spdBtn").removeClass("active");
    $(this).toggleClass("active");
  });

  //change highlighted size button
  $(".szBtn").click(function () {
    $(".szBtn").removeClass("active");
    $(this).toggleClass("active");
  });
});

function generateBoard() {
  //render the gameboard
  ReactDOM.render(React.createElement(Board, null), document.getElementById('gameBoard'));

  //render the generation ticker
  ReactDOM.render(React.createElement(Generation, null), document.getElementById('generation'));
}

//react component that updates generation count

var Generation = function (_React$Component) {
  _inherits(Generation, _React$Component);

  function Generation() {
    _classCallCheck(this, Generation);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Generation.prototype.render = function render() {
    var gen;
    if (generation > 9999) {
      gen = '9999+';
    } else {
      gen = generation;
    }

    return React.createElement(
      "div",
      null,
      "Generation: ",
      gen
    );
  };

  return Generation;
}(React.Component);

//react component that renders the board display

var Board = function (_React$Component2) {
  _inherits(Board, _React$Component2);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Board.prototype.render = function render() {
    var style = {
      width: width * 12
    };
    var style2 = {
      width: width * 12 + 40,
      height: height * 12 + 40
    };

    //nested mapping for multidimentional array
    var rows = board.map(function (cols, i) {
      var cells = cols.map(function (status, j) {
        //uses an id instead of a key for jQuerry use
        return React.createElement("div", { id: i + "-" + j, className: "cell " + status });
      });

      return React.createElement(
        "div",
        { style: style, className: "rows" },
        cells
      );
    });

    return React.createElement(
      "div",
      { style: style2, className: "rowContainer" },
      rows
    );
  };

  return Board;
}(React.Component);

//change cells to next generation

function updateCells() {
  isRunning = true;
  generation++;
  //create a temporary board
  var tempBoard = [];
  for (var i = -1; i <= height; i++) {
    tempBoard[i] = [];
    tempBoard[i].length = board[0].length;
  }
  //set negative and extra indexes for copied board
  for (var i = -1; i <= height; i++) {
    for (var j = -1; j <= width; j++) {
      tempBoard[i][j] = 'dead';
    }
  }
  //update temporary board with the original board's data
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      tempBoard[i][j] = board[i][j];
    }
  }
  //check for surrounding cells then go through the rules of the game
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      var surroundingCells = 0;
      //check for number of living surrounding cells
      if (tempBoard[i - 1][j - 1] == 'old' || tempBoard[i - 1][j - 1] == 'new') {
        surroundingCells++;
      }
      if (tempBoard[i - 1][j] == 'old' || tempBoard[i - 1][j] == 'new') {
        surroundingCells++;
      }
      if (tempBoard[i - 1][j + 1] == 'old' || tempBoard[i - 1][j + 1] == 'new') {
        surroundingCells++;
      }
      if (tempBoard[i][j - 1] == 'old' || tempBoard[i][j - 1] == 'new') {
        surroundingCells++;
      }
      if (tempBoard[i][j + 1] == 'old' || tempBoard[i][j + 1] == 'new') {
        surroundingCells++;
      }
      if (tempBoard[i + 1][j - 1] == 'old' || tempBoard[i + 1][j - 1] == 'new') {
        surroundingCells++;
      }
      if (tempBoard[i + 1][j] == 'old' || tempBoard[i + 1][j] == 'new') {
        surroundingCells++;
      }
      if (tempBoard[i + 1][j + 1] == 'old' || tempBoard[i + 1][j + 1] == 'new') {
        surroundingCells++;
      }
      //change status of cell based on number of surrounding alive cells
      //rules for game of life
      if (tempBoard[i][j] == 'old' || tempBoard[i][j] == 'new') {
        if (surroundingCells < 2) {
          board[i][j] = 'dead';
        } else if (surroundingCells == 2 || surroundingCells == 3) {
          board[i][j] = 'old';
        } else if (surroundingCells > 3) {
          board[i][j] = 'dead';
        }
      } else if (tempBoard[i][j] == 'dead') {
        if (surroundingCells == 3) {
          board[i][j] = 'new';
        }
      }
    }
  }
  generateBoard();
}

//for the run button
function runSimulation() {
  if (!isRunning) {
    myInterval = setInterval("updateCells()", speed);
  }
}

//for the stop button
function stopSimulation() {
  clearTimeout(myInterval);
  isRunning = false;
}

//for the clear button
function clearSimulation() {
  clearTimeout(myInterval);
  isRunning = false;
  generation = 0;

  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      board[i][j] = 'dead';
    }
  }
  generateBoard();
}

//for the speed buttons
function rate(x) {
  if (isRunning) {
    stopSimulation();
    speed = x;
    runSimulation();
  } else {
    speed = x;
  }
}

//for the size buttons
function size(h, w) {
  stopSimulation();
  generation = 0;
  height = h;
  width = w;
  selectPreset();
}

//for the dropdown menu of presets
function selectPreset() {
  clearTimeout(myInterval);
  generation = 0;
  isRunning = false;
  var selectBox = document.getElementById("selectBox");
  preset = selectBox.options[selectBox.selectedIndex].value;

  if (preset == 'None') {
    generateDeadCells();
    generateBoard();
  } else if (preset == "Random") {
    generateRandomCells();
  } else if (preset == "10 Cell Row") {
    generateTenCellRow();
  } else if (preset == "Exploder") {
    generateExploder();
  } else if (preset == "Glider") {
    generateGlider();
  } else if (preset == "Lightweight Spaceship") {
    generateSpaceship();
  } else if (preset == "Tumbler") {
    generateTumbler();
  }
  generateBoard();
}

//set all cells to dead
function generateDeadCells() {
  board = [];
  for (var i = -1; i < height; i++) {
    board[i] = [];
  }

  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      board[i][j] = 'dead';
    }
  }
}

//creates a random set of cells
function generateRandomCells() {
  board = [];
  for (var i = -1; i < height; i++) {
    board[i] = [];
  }

  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      if (Math.random() < 0.5) {
        board[i][j] = 'old';
      } else {
        board[i][j] = 'dead';
      }
    }
  }
}

//creates a lone 10 cell row
function generateTenCellRow() {
  generateDeadCells();
  var x = Math.floor(width / 2);
  var y = Math.floor(height / 2);
  board[y][x - 5] = 'new';
  board[y][x - 4] = 'new';
  board[y][x - 3] = 'new';
  board[y][x - 2] = 'new';
  board[y][x - 1] = 'new';
  board[y][x] = 'new';
  board[y][x + 1] = 'new';
  board[y][x + 2] = 'new';
  board[y][x + 3] = 'new';
  board[y][x + 4] = 'new';
}

//creates a lone exploder
function generateExploder() {
  generateDeadCells();
  var x = Math.floor(width / 2);
  var y = Math.floor(height / 2);
  board[y - 3][x] = 'new';
  board[y - 3][x - 2] = 'new';
  board[y - 2][x - 2] = 'new';
  board[y - 1][x - 2] = 'new';
  board[y][x - 2] = 'new';
  board[y + 1][x - 2] = 'new';
  board[y - 3][x + 2] = 'new';
  board[y - 2][x + 2] = 'new';
  board[y - 1][x + 2] = 'new';
  board[y][x + 2] = 'new';
  board[y + 1][x + 2] = 'new';
  board[y + 1][x] = 'new';
}

//creates a lone glider
function generateGlider() {
  generateDeadCells();
  board[1][2] = 'new';
  board[2][3] = 'new';
  board[3][1] = 'new';
  board[3][2] = 'new';
  board[3][3] = 'new';
}

//creates a lightweight spaceship
function generateSpaceship() {
  generateDeadCells();
  var y = Math.floor(height / 2);
  board[y - 2][2] = 'new';
  board[y - 2][3] = 'new';
  board[y - 2][4] = 'new';
  board[y - 2][5] = 'new';
  board[y - 1][5] = 'new';
  board[y][5] = 'new';
  board[y + 1][4] = 'new';
  board[y - 1][1] = 'new';
  board[y + 1][1] = 'new';
}

//creates a tumbler
function generateTumbler() {
  generateDeadCells();
  var x = Math.floor(width / 2);
  var y = Math.floor(height / 2);
  board[y - 3][x - 2] = 'new';
  board[y - 2][x - 2] = 'new';
  board[y - 3][x - 1] = 'new';
  board[y - 2][x - 1] = 'new';
  board[y - 1][x - 1] = 'new';
  board[y][x - 1] = 'new';
  board[y + 1][x - 1] = 'new';
  board[y - 3][x + 2] = 'new';
  board[y - 2][x + 2] = 'new';
  board[y - 3][x + 1] = 'new';
  board[y - 2][x + 1] = 'new';
  board[y - 1][x + 1] = 'new';
  board[y][x + 1] = 'new';
  board[y + 1][x + 1] = 'new';
  board[y][x - 3] = 'new';
  board[y + 1][x - 3] = 'new';
  board[y + 2][x - 3] = 'new';
  board[y + 2][x - 2] = 'new';
  board[y][x + 3] = 'new';
  board[y + 1][x + 3] = 'new';
  board[y + 2][x + 3] = 'new';
  board[y + 2][x + 2] = 'new';
}