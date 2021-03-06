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
let selectedPiece;


// window.alert("Welcome To Chess Board");
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
  getOpponent() {
    if (this.player === WHITE_PLAYER) {
      return BLACK_PLAYER;
    }
    return WHITE_PLAYER;
  }


  getPossibleMoves(boardData) {
    // Get relative moves
    let moves;
    if (this.type === PAWN) {
      moves = this.getPawnMoves(boardData);
    } else if (this.type === ROOK) {
      moves = this.getRookMoves(boardData);
    } else if (this.type === KNIGHT) {
      moves = this.getKnightMoves(boardData);
    } else if (this.type === BISHOP) {
      moves = this.getBishopMoves(boardData);
    } else if (this.type === KING) {
      moves = this.getKingMoves(boardData);
    } else if (this.type === QUEEN) {
      moves = this.getQueenMoves(boardData);
    } else {
      console.log("Unknown type", type)
    }



    // making filtered moves and remove moves out of the board
    let filteredMoves = [];
    for (let move of moves) {
      const absoluteRow = move[0];
      const absoluteCol = move[1];
      if ( absoluteRow >= 0 && absoluteRow <= 7 &&absoluteCol >= 0 &&absoluteCol <= 7) {
        filteredMoves.push(move);
      }
    }
    return filteredMoves;
  }
// each player moves :
  getPawnMoves(boardData) {
    let result = [];
    let direction = 1;
    if (this.player === BLACK_PLAYER) {
      direction = -1;
    }  
    
    
    let position = [this.row + direction, this.col];
    if (boardData.isEmpty(position[0], position[1])) {
      result.push(position);
      }
      position = [this.row + direction, this.col + direction];
      if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position);
    }

    position = [this.row + direction, this.col - direction];
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position);
    }


    return result;
  }


  getRookMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, 0, boardData));
    result = result.concat(this.getMovesInDirection(1, 0, boardData));
    result = result.concat(this.getMovesInDirection(0, -1, boardData));
    result = result.concat(this.getMovesInDirection(0, 1, boardData));
    return result;
  }

  getMovesInDirection(directionRow, directionCol, boardData) {
    let result = [];

    for (let i = 1; i < 8; i++) {
      let row = this.row + directionRow * i;
      let col = this.col + directionCol * i;
      if (boardData.isEmpty(row, col)) {
        result.push([row, col]);
      } else if (boardData.isPlayer(row, col, this.getOpponent())) {
        result.push([row, col]);
        console.log("opponent");
        return result;
      } else if (boardData.isPlayer(row, col, this.player)) {
        console.log("player");
        return result;
      }
    }
    console.log("all empty");
    return result;
  }

  getKnightMoves(boardData) {
    let result = [];
    const relativeMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [-1, 2], [1, 2], [-1, -2], [1, -2]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;
  }

  getBishopMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, -1, boardData));
    result = result.concat(this.getMovesInDirection(-1, 1, boardData));
    result = result.concat(this.getMovesInDirection(1, -1, boardData));
    result = result.concat(this.getMovesInDirection(1, 1, boardData));
    return result;
  }

  getKingMoves(boardData) {
    let result = [];
    const relativeMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;
  }

  getQueenMoves(boardData) {
    let result = this.getBishopMoves(boardData);
    result = result.concat(this.getRookMoves(boardData));
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
  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined;
  }

  isPlayer(row, col, player) {
    const piece = this.getPiece(row, col);
    return piece !== undefined && piece.player === player;
  }
  removePiece(row, col) {
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i];
      if (piece.row === row && piece.col === col) {
        // Remove piece at index i
        this.pieces.splice(i, 1);
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

function onCellWithPiece (piece){
  let possibleMoves = piece.getPossibleMoves(boardData);
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add("possible-move");
  }
}

function clearTable (){
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      table.rows[i].cells[j].classList.remove("possible-move");
    }
  }
}
// show the witch cell is clicked
function onCellClick(event, row, col) {
  clearTable();

  const piece = boardData.getPiece(row, col);
  if (piece !== undefined) {
    onCellWithPiece(piece); 
  }

  // remove previously selected cell
  if (selectedCell !== undefined) {
    selectedCell.classList.remove("selected");
  }

  // Show selected cell
  selectedCell = event.currentTarget;
  selectedCell.classList.add("selected");
// save the last piece that clicked
if (selectedPiece === undefined){
  selectedPiece = boardData.getPiece(row , col)
  
} else {
if (tryMove(selectedPiece , row, col)){ 

  if (!boardData.isEmpty(row, col)){
   let imgParent =  table.rows[row].cells[col];
   imgParent.removeChild(imgParent.childNodes[0])
   boardData.removePiece(row, col);
  }
  
  let parent = table.rows[selectedPiece.row].cells[selectedPiece.col]
  parent.removeChild(parent.childNodes[0])
  addImage(table.rows[row].cells[col],selectedPiece.player , selectedPiece.type);
  // ?????????? ???? ?????????????? ???? ?????????? ???????????? ????????
  selectedPiece.row = row 
  selectedPiece.col = col
  selectedPiece = undefined;
  } else { 
    if (!boardData.isEmpty(row, col)) {
      selectedPiece = boardData.getPiece(row , col)
    }

  }
 }

  
  // ?????????? ?????????? ??????
  
    // console.log(boardData.pieces)
  

}


function tryMove (piece, row ,col){
 let possibleMoves = piece.getPossibleMoves(boardData);
 for(let possibleMove of possibleMoves){
  if (possibleMove[0] === row && possibleMove[1] === col){
    console.log(piece.boardData)
    //   piece.row = row;
    //   piece.col = col;
    return true;
  }
 }
  return false;
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
// ???????? ?????????????? ???? ??????????
// ???????????? ???? ????????????
// 