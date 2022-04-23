const WHITE_PLAYER = "white";
const BLACK_PLAYER = "black";

// Variables
const PAWN = "pawn";
const ROOK = "rook";
const KNIGHT = "knight";
const BISHOP = "bishop";
const KING = "king";
const QUEEN = "queen";

let selectedCell;
let boardData;
let table;


window.alert("Welcome To Chess Board");
const mainHeader = document.createElement('h1');
mainHeader.innerText = ' Cyber4s ChessBoard '
document.body.appendChild(mainHeader);
mainHeader.classList.add('header'); // making the header of the page


class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  getPossibleMoves() { // making the move options
    let relativeMoves;
    if (this.type === PAWN) {
      relativeMoves = this.getPawnRelativeMoves();
    } else if (this.type === ROOK) {
      relativeMoves = this.getRookRelativeMoves();
    } else if (this.type === KNIGHT) {
      relativeMoves = this.getKnightRelativeMoves();
    } else if (this.type === BISHOP) {
      relativeMoves = this.getBishopRelativeMoves();
    } else if (this.type === KING) {
      relativeMoves = this.getKingRelativeMoves();
    } else if (this.type === QUEEN) {
      relativeMoves = this.getQueenRelativeMoves();
    } else {
      console.log("Unknown type", type);
    }

    // making the absolute moves (from the piece place)
    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0];
      const absoluteCol = this.col + relativeMove[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
    }


    // making filtered moves and remove moves out of the board
    let filteredMoves = [];
    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if ( absoluteRow >= 0 && absoluteRow <= 7 &&absoluteCol >= 0 &&absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }
// each player moves :
  getPawnRelativeMoves() {
    let blackDirection = 1;
    if (this.player === BLACK_PLAYER) {
      blackDirection = -1;
    }
    return [[1 * blackDirection, 0]];
  }

  getRookRelativeMoves() {
    let result = [];
    for (let i = 1; i < 8; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }

  getKingRelativeMoves() {
    let result = [];
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (!(row === 0 && col === 0)) {
          result.push([row, col]);
        }
      }
    }
    return result;
  }

  getQueenRelativeMoves() {
    let result = [];
    for (let i = 1; i < 8; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
      result.push([-i, -i]);
      result.push([i, i]);
      result.push([-i, i]);
      result.push([i, -i]);
    }
    return result;
  }

  getBishopRelativeMoves() {
    let result = [];
    for (let i = 1; i < 8; i++) {
      result.push([-i, -i]);
      result.push([i, i]);
      result.push([-i, i]);
      result.push([i, -i]);
    }


    return result;
  }
  getKnightRelativeMoves() {
    let result = [];
    for (let i = 1; i < 3; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, i]);
    }
    return result;
  }
}

class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }

  // Returns piece in row, col, or undefined if not exists.
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
  }
}
// making the pieces and img on board
function getInitialPieces() {
  let result = [];

  addFirstRowPieces(result, 0, WHITE_PLAYER);
  addFirstRowPieces(result, 7, BLACK_PLAYER);

  for (let i = 0; i < 8; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
  }
  return result;
}

function addFirstRowPieces(result, row, player) {
  result.push(new Piece(row, 0, ROOK, player));
  result.push(new Piece(row, 1, KNIGHT, player));
  result.push(new Piece(row, 2, BISHOP, player));
  result.push(new Piece(row, 3, KING, player));
  result.push(new Piece(row, 4, QUEEN, player));
  result.push(new Piece(row, 5, BISHOP, player));
  result.push(new Piece(row, 6, KNIGHT, player));
  result.push(new Piece(row, 7, ROOK, player));
}

function addImage(cell, type, name) {
  const image = document.createElement("img");
  image.src = "Photos/" + type + "/" + name + ".png";
  cell.appendChild(image);
}
// show the witch cell is clicked
function onCellClick(event, row, col) {
  console.log("row", row);
  console.log("col", col);
  // Clear all previous possible moves
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      table.rows[i].cells[j].classList.remove("possible-move");
    }
  }
  const piece = boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves();
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add("possible-move");
    }
  }

  // remove previously selected cell
  if (selectedCell !== undefined) {
    selectedCell.classList.remove("selected");
  }

  // Show selected cell
  selectedCell = event.currentTarget;
  selectedCell.classList.add("selected");
}

// making the chessboard
function chessBoardCreation() {
  table = document.createElement("table");
  document.body.appendChild(table);
  table.classList.add('table');
  for (let row = 0; row < 8; row++) {
    const rowElement = table.insertRow();
    for (let col = 0; col < 8; col++) {
      const cell = rowElement.insertCell();
      if ((row + col) % 2 === 0) {
        cell.className = "black";
      } else {
        cell.className = "white";
      }
      cell.addEventListener("click", (event) => onCellClick(event, row, col));
    }
  }

  // List of 32 pieces
  boardData = new BoardData(getInitialPieces());

  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}

window.addEventListener("load", chessBoardCreation);