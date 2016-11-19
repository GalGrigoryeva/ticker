var columnCount;
var rowCount;
var cellsViews;
var cellsStates;
var tbl;
var intervalID;
var body = document.getElementsByTagName("body")[0];

const getIndex = (cellX, cellY) => {
  cellX = cellX % columnCount;
  if (cellX < 0) {
    cellX = columnCount + cellX;
  }
  cellY = cellY % rowCount;
  if (cellY < 0) {
    cellY = rowCount + cellY;
  }
  var index = columnCount * cellY + cellX;
  return index;
}

const render = () => {
  for (var i = 0; i < cellsStates.length; i++) {
    var cellState = cellsStates[i];
    var cellView = cellsViews[i];
    if (cellState) {
      cellView.style.background = "#5A7244";
    } else {
      cellView.style.background = "#99B266";
    }
  }
}

function cellOnClick() {
  var index = this.index;
  cellsStates[index] = !cellsStates[index];
  render();
}

const checkAutoTurn = () => {
  if (document.getElementById("autoStep").checked) {
    intervalID = setInterval( update, 200);
  } else {
    clearInterval(intervalID);
  }
}

const update = () => {
  var copyCellsStates = cellsStates.slice();
  for ( var n = 0; n < cellsStates.length; n++ ) {
    cellsStates[n] = false;
  }
  for (var i = 0; i < rowCount; i++) {
    for (var j = 0; j < columnCount; j++) {
      var currentCellState = copyCellsStates[getIndex(j, i)];
      if (currentCellState) {
        if (j - 1 >= 0) {
          cellsStates[getIndex(j - 1, i)] = true;
        } else {
          cellsStates[getIndex(columnCount - 1, i)] = true;
        }
      }
    }
  }
  render();
}

const reset = () => {
  if (tbl) {
    body.removeChild(tbl);
  }
  columnCount = 50;
  rowCount = 5;
  cellsViews = [];
  cellsStates = [];
  tbl = document.createElement("table");
  var tblBody = document.createElement("tBody");
  for (var y = 0; y < rowCount; y++) {
    var row = document.createElement("tr");
    for (var x = 0; x < columnCount; x++) {
      var cellView = document.createElement("td");
      cellView.index = getIndex(x, y);
      cellView.onclick = cellOnClick;
      var cellState = false;
      row.appendChild(cellView);
      if (document.getElementById("isRandom").checked && Math.random() > 0.5) {
        cellState = true;
      }
      cellsViews.push(cellView);
      cellsStates.push(cellState);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  body.appendChild(tbl);
  render();
}

reset();
