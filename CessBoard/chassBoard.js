// window.alert("Welcome To Chess Board");
const mainHeader = document.createElement('h1');
mainHeader.innerText = ' Cyber4s ChessBoard '
document.body.appendChild(mainHeader);
mainHeader.classList.add('header'); // making the header of the page

const WHITETYPE = 'white';
const BLACkTYPE = 'black';
let row;
let selectedCell;
let pieces = [];
let table;

const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';



class Piece {
    constructor(row, col, type, player){
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }



    getPossibleMoves() {
        // Get relative moves
        let relativeMoves;
        if (this.type === PAWN) {
          relativeMoves = this.getPawnRelativeMoves();
        } else if (this.type === ROOK) {
          relativeMoves = this.getRookRelativeMoves();
        } else if (this.type === KNIGHT) {
          // TODO: Get moves
        } else if (this.type === BISHOP) {
          // TODO: Get moves
        } else if (this.type === KING) {
          // TODO: Get moves
        } else if (this.type === QUEEN) {
          // TODO: Get moves
        } else {
          console.log("Unknown type", type)
        }
        console.log('relativeMoves', relativeMoves);
    
        // Get absolute moves
        let absoluteMoves = [];
        for (let relativeMove of relativeMoves) {
          const absoluteRow = this.row + relativeMove[0];
          const absoluteCol = this.col + relativeMove[1];
          absoluteMoves.push([absoluteRow, absoluteCol]);
        }
        // console.log('absoluteMoves', absoluteMoves);
    
        // Get filtered absolute moves
        let filteredMoves = [];
        for (let absoluteMove of absoluteMoves) {
          const absoluteRow = absoluteMove[0];
          const absoluteCol = absoluteMove[1];
          if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
            filteredMoves.push(absoluteMove);
          }
        }
        console.log('filteredMoves', filteredMoves);
        return filteredMoves;
      }
    getPawnRelativeMoves(){
        return[[1,0]];

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


    
}
table = document.createElement('table');  // make the table
document.body.append(table);
table.classList.add('table');

for (let i = 0; i < 8; i++) {                 // make the rows
    row = document.createElement('tr');
    table.append(row);
    row.classList.add('row');
    
    for (let j = 0; j < 8; j++) {              // make the culons
        const cell = document.createElement('td');
        row.append(cell);
        cell.id = "cell-" + i.toString() + "_" + j.toString();
        
        if ((j + i) % 2 == 0) {    // make the peaces color
            cell.classList.add('white');
        } else {
            cell.classList.add('black');
        }


        
        function OnCellClick(event) { 
            console.log(event.currentTarget);
            if (selectedCell !== undefined){
                selectedCell.classList.remove('selected');  
            }
            selectedCell = event.currentTarget;
            selectedCell.classList.add('selected'); 
        } 
        cell.onclick = OnCellClick;

        pieces = getInitialBoard();

} }       // עד פה יצירת הטבלה והלחיצה




        function addImage(cell, type, name) {  // make the peaces photos
            const image = document.createElement('img');
            image.src = 'Photos/' + type + '/' + name + '.png';
            cell.appendChild(image);
            
        }
        
        
        function getInitialBoard() {
            let result = [];
            addFirstRowPieces(result, 0, WHITETYPE);
            addFirstRowPieces(result, 7, BLACkTYPE);

            for (let i = 0; i < 8; i++){
                result.push(new Piece(1, i, PAWN, WHITETYPE));
                result.push(new Piece(6, i, PAWN, BLACkTYPE));

            }
            return result;
        }
    

    
    for (let piece of pieces) {
        addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);  

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

