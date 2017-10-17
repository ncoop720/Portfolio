"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var gameState;
var gameStateID = ["space1", "space2", "space3", "space4", "space5", "space6", "space7", "space8", "space9"];
var mySelector = "X";
var compSelector = "O";
var myTurn;

$(document).ready(function () {
  resetGame();
  $("#xButton").addClass("selected");
});

// renders the board from an array
function renderBoard(arr) {
  var Board = function (_React$Component) {
    _inherits(Board, _React$Component);

    function Board() {
      _classCallCheck(this, Board);

      return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Board.prototype.render = function render() {
      return React.createElement(
        "div",
        { id: "gameBoard" },
        React.createElement(
          "div",
          { id: "row1", className: "boardRow" },
          React.createElement(
            "button",
            { onClick: function onClick() {
                return userSpace("space1");
              }, id: "space1", className: "gameSpace" },
            arr[0]
          ),
          React.createElement(
            "button",
            { onClick: function onClick() {
                return userSpace("space2");
              }, id: "space2", className: "gameSpace" },
            arr[1]
          ),
          React.createElement(
            "button",
            { onClick: function onClick() {
                return userSpace("space3");
              }, id: "space3", className: "gameSpace" },
            arr[2]
          )
        ),
        React.createElement(
          "div",
          { id: "row2", className: "boardRow" },
          React.createElement(
            "button",
            { onClick: function onClick() {
                return userSpace("space4");
              }, id: "space4", className: "gameSpace" },
            arr[3]
          ),
          React.createElement(
            "button",
            { onClick: function onClick() {
                return userSpace("space5");
              }, id: "space5", className: "gameSpace" },
            arr[4]
          ),
          React.createElement(
            "button",
            { onClick: function onClick() {
                return userSpace("space6");
              }, id: "space6", className: "gameSpace" },
            arr[5]
          )
        ),
        React.createElement(
          "div",
          { id: "row3", className: "boardRow" },
          React.createElement(
            "button",
            { onClick: function onClick() {
                return userSpace("space7");
              }, id: "space7", className: "gameSpace" },
            arr[6]
          ),
          React.createElement(
            "button",
            { onClick: function onClick() {
                return userSpace("space8");
              }, id: "space8", className: "gameSpace" },
            arr[7]
          ),
          React.createElement(
            "button",
            { onClick: function onClick() {
                return userSpace("space9");
              }, id: "space9", className: "gameSpace" },
            arr[8]
          )
        )
      );
    };

    return Board;
  }(React.Component);

  ReactDOM.render(React.createElement(Board, null), document.getElementById("boardDestination"));
}

// prints a message depending on who goes first

var Textbox = function (_React$Component2) {
  _inherits(Textbox, _React$Component2);

  function Textbox() {
    _classCallCheck(this, Textbox);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Textbox.prototype.render = function render() {
    return React.createElement(
      "p",
      null,
      this.props.message
    );
  };

  return Textbox;
}(React.Component);

// randomly chooses who goes first

function whoGoesFirst() {
  if (Math.random() < 0.5) {
    myTurn = true;
    ReactDOM.render(React.createElement(Textbox, { message: "You go first!" }), document.getElementById("textBox"));
  } else {
    myTurn = false;
    computerSpace();
    ReactDOM.render(React.createElement(Textbox, { message: "Computer goes first!" }), document.getElementById("textBox"));
  }
}

// click function for the game board
function userSpace(clickedID) {
  if (myTurn) {
    // place mySelector if space is empty
    for (var i = 0; i < gameStateID.length; i++) {
      if (gameStateID[i] == clickedID && gameState[i] == "") {
        myTurn = false;
        gameState[i] = mySelector;
        renderBoard(gameState);

        // if you win
        if (gameState[0] !== "" && gameState[0] == gameState[1] && gameState[0] == gameState[2] || gameState[3] !== "" && gameState[3] == gameState[4] && gameState[3] == gameState[5] || gameState[6] !== "" && gameState[6] == gameState[7] && gameState[6] == gameState[8] || gameState[0] !== "" && gameState[0] == gameState[3] && gameState[0] == gameState[6] || gameState[1] !== "" && gameState[1] == gameState[4] && gameState[1] == gameState[7] || gameState[2] !== "" && gameState[2] == gameState[5] && gameState[2] == gameState[8] || gameState[0] !== "" && gameState[0] == gameState[4] && gameState[0] == gameState[8] || gameState[2] !== "" && gameState[2] == gameState[4] && gameState[2] == gameState[6]) {
          $("#reset").addClass("noticeMe");
          ReactDOM.render(React.createElement(Textbox, { message: "You win!" }), document.getElementById("textBox"));
          return;
        }

        // count number of occupied spaces
        var j = 0;
        for (var i = 0; i < gameState.length; i++) {
          if (gameState[i] !== "") {
            j++;
          }
        }
        // if all spaces occupied, light up reset button
        if (j == 9) {
          computerText("draw");
          $("#reset").addClass("noticeMe");
          return;
        }

        // computer's turn
        computerSpace();
      }
    }
  }
}

// text to display when computer wins
function computerText(status) {
  if (status == "win") {
    ReactDOM.render(React.createElement(Textbox, { message: "Computer Wins!" }), document.getElementById("textBox"));
  } else if (status == "draw") {
    ReactDOM.render(React.createElement(Textbox, { message: "Cat's Game!" }), document.getElementById("textBox"));
  }
}

// computer AI
function computerSpace() {
  // count number of occupied spaces
  var j = 0;
  for (var i = 0; i < gameState.length; i++) {
    if (gameState[i] !== "") {
      j++;
    }
  }

  // if total occupied spaces equals 1 less than max, light up reset button
  if (j == 8) {
    setTimeout('computerText("draw")', 500);
    setTimeout('$("#reset").addClass("noticeMe")', 500);
  }

  // check for winning play
  for (var i = 0; i < gameState.length; i++) {
    if (gameState[i] == "") {
      gameState[i] = compSelector;
      if (gameState[0] !== "" && gameState[0] == gameState[1] && gameState[0] == gameState[2] || gameState[3] !== "" && gameState[3] == gameState[4] && gameState[3] == gameState[5] || gameState[6] !== "" && gameState[6] == gameState[7] && gameState[6] == gameState[8] || gameState[0] !== "" && gameState[0] == gameState[3] && gameState[0] == gameState[6] || gameState[1] !== "" && gameState[1] == gameState[4] && gameState[1] == gameState[7] || gameState[2] !== "" && gameState[2] == gameState[5] && gameState[2] == gameState[8] || gameState[0] !== "" && gameState[0] == gameState[4] && gameState[0] == gameState[8] || gameState[2] !== "" && gameState[2] == gameState[4] && gameState[2] == gameState[6]) {
        setTimeout("computerText('win')", 500);
        setTimeout("renderBoard(gameState)", 500);
        setTimeout('$("#reset").addClass("noticeMe")', 500);
        return;
      } else {
        gameState[i] = "";
      }
    }
  }

  // stop opponent's winning play
  for (var i = 0; i < gameState.length; i++) {
    if (gameState[i] == "") {
      gameState[i] = mySelector;
      if (gameState[0] !== "" && gameState[0] == gameState[1] && gameState[0] == gameState[2] || gameState[3] !== "" && gameState[3] == gameState[4] && gameState[3] == gameState[5] || gameState[6] !== "" && gameState[6] == gameState[7] && gameState[6] == gameState[8] || gameState[0] !== "" && gameState[0] == gameState[3] && gameState[0] == gameState[6] || gameState[1] !== "" && gameState[1] == gameState[4] && gameState[1] == gameState[7] || gameState[2] !== "" && gameState[2] == gameState[5] && gameState[2] == gameState[8] || gameState[0] !== "" && gameState[0] == gameState[4] && gameState[0] == gameState[8] || gameState[2] !== "" && gameState[2] == gameState[4] && gameState[2] == gameState[6]) {
        gameState[i] = compSelector;
        setTimeout("renderBoard(gameState)", 500);
        myTurn = true;
        return;
      } else {
        gameState[i] = "";
      }
    }
  }

  // go middle if opponent went first
  if (j == 1 && gameState[4] == "") {
    gameState[4] = compSelector;
    setTimeout("renderBoard(gameState)", 500);
    myTurn = true;
    return;
  }

  // place side if opponent holds two opposite corners
  var side = [1, 3, 5, 7];
  if (gameState[0] == mySelector && gameState[8] == mySelector || gameState[2] == mySelector && gameState[6] == mySelector) {
    for (var i = 0; i < side.length; i++) {
      if (gameState[side[i]] == "") {
        gameState[side[i]] = compSelector;
        setTimeout("renderBoard(gameState)", 500);
        myTurn = true;
        return;
      }
    }
  }

  // place opposite of owned corner
  if (gameState[0] == "" && gameState[8] == compSelector) {
    gameState[0] = compSelector;
    setTimeout("renderBoard(gameState)", 500);
    myTurn = true;
    return;
  }
  if (gameState[2] == "" && gameState[6] == compSelector) {
    gameState[2] = compSelector;
    setTimeout("renderBoard(gameState)", 500);
    myTurn = true;
    return;
  }
  if (gameState[6] == "" && gameState[2] == compSelector) {
    gameState[6] = compSelector;
    setTimeout("renderBoard(gameState)", 500);
    myTurn = true;
    return;
  }
  if (gameState[8] == "" && gameState[0] == compSelector) {
    gameState[8] = compSelector;
    setTimeout("renderBoard(gameState)", 500);
    myTurn = true;
    return;
  }

  // place side if number of occupied spaces >=5
  for (var i = 0; i < side.length; i++) {
    if (gameState[side[i]] == "" && j >= 5) {
      gameState[side[i]] = compSelector;
      setTimeout("renderBoard(gameState)", 500);
      myTurn = true;
      return;
    }
  }

  // place corner
  var corner = [0, 2, 6, 8];
  for (var i = 0; i < corner.length; i++) {
    if (gameState[corner[i]] == "") {
      gameState[corner[i]] = compSelector;
      setTimeout("renderBoard(gameState)", 500);
      myTurn = true;
      return;
    }
  }

  // place middle
  if (gameState[4] == "") {
    gameState[4] = compSelector;
    setTimeout("renderBoard(gameState)", 500);
    myTurn = true;
    return;
  }

  // place side
  for (var i = 0; i < side.length; i++) {
    if (gameState[side[i]] == "") {
      gameState[side[i]] = compSelector;
      setTimeout("renderBoard(gameState)", 500);
      myTurn = true;
      return;
    }
  }
}

// clears board and starts new game
function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  $("#reset").removeClass("noticeMe");
  renderBoard(gameState);
  whoGoesFirst();
}

// when you press the x button
function xButton() {
  $("#oButton").removeClass("selected");
  $("#xButton").addClass("selected");
  mySelector = "X";
  compSelector = "O";
  resetGame();
}

// when you press the o button
function oButton() {
  $("#xButton").removeClass("selected");
  $("#oButton").addClass("selected");
  mySelector = "O";
  compSelector = "X";
  resetGame();
}
