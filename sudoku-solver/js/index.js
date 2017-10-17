var gridID = [["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9"], ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9"], ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"], ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9"], ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9"], ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9"], ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9"], ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9"], ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8", "i9"]];
var grid = [];
var finished = true;

// solution button
function solution() {
  finished = true;
  fillGrid();
  solveSudoku(grid, 0, 0);
  var k=0;
  for (var i=0; i<grid.length; i++) {
    for (var j=0; j<grid[i].length; j++) {
      k++;
      if (grid[i][j]=="") {
        finished = false;
      }
    }
  }
  if (k!==81) {
    finished = false;
  }
  if (finished) {
    printGrid(grid);
  }
}

// clearAll button
function clearAll() {
  grid = [];
  grid.length = 9;
  for (var i=0; i<9; i++) {
    grid[i] = [];
  }
  
  for (var j=0; j<9; j++) {
    for (var k=0; k<9; k++) {
      grid[j].push("");
    }
  }
  
  printGrid(grid);
}

function printGrid(grid) {
  for (var i=0; i<grid.length; i++) {
    for (var j=0; j<grid[i].length; j++) {
      $("#" + gridID[i][j]).val(grid[i][j]);
    }
  }
}

// user input stored into grid
function fillGrid() {
  for (var i=0; i<9; i++) {
    grid[i] = [];
  }
  
  for (var j=0; j<gridID.length; j++) {
    for (var k=0; k<gridID[j].length; k++) {
      // if user input is valid
      if (noConflicts(grid, j, k, $("#" + gridID[j][k]).val())) {
        grid[j].push($("#" + gridID[j][k]).val());
      }
      // if user input is not valid
      else {
        alert("This puzzle is unsolvable!");
        console.log(j + " " + k + " " + $("#" + gridID[j][k]).val());
        return;
      }
    }
  }
}

// recursive algorithm to solve sudoku
function solveSudoku(grid, row, col) {
    var cell = findUnassignedLocation(grid, row, col);
    row = cell[0];
    col = cell[1];

    // base case: if no empty cell  
    if (row == -1) {
        return true;
    }

    for (var num = 1; num <= 9; num++) {
        if ( noConflicts(grid, row, col, num) ) {   
            grid[row][col] = num;
            if ( solveSudoku(grid, row, col) ) {                
                return true;
            }
            // mark cell as empty (with 0)    
            grid[row][col] = "";
        }
    }

    // trigger back tracking
    return false;
}


function findUnassignedLocation(grid, row, col) {
  var done = false;
  var res = [-1, -1];

  while (!done) {
    if (row == 9) {
      done = true;
    }
    else {
      if (grid[row][col] == 0) {
        res[0] = row;
        res[1] = col;
        done = true;
      }
      else {
        if (col < 8) {
          col++;
        }
        else {
          row++;
          col = 0;
        }
      }
    }
  }

  return res;
}

function noConflicts(grid, row, col, num) {
  if (num!=="") {
    return isRowOk(grid, row, num) && isColOk(grid, col, num) && isBoxOk(grid, row, col, num);
  }
  else {
    return true;
  }
}

function isRowOk(grid, row, num) {
  for (var col = 0; col < 9; col++) {
    if (grid[row][col] == num) {
      return false;
    }
  }

  return true;
}

function isColOk(grid, col, num) {
  for (var row = 0; row < 9; row++) {
    if (grid[row][col] == num) {
      return false;
    }
  }

  return true;    
}

function isBoxOk(grid, row, col, num) {
  row = Math.floor(row / 3) * 3;
  col = Math.floor(col / 3) * 3;

  for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {
      if (grid[row + r][col + c] == num) {
        return false;
      }
    }
  }

  return true;
}