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



class Piece {
    constructor(row, col, type, player){
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }
}
const table = document.createElement('table');  // make the table
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
            addPieces(result, 0, WHITETYPE);

            addPieces(result, 7, BLACkTYPE);


            for (let i = 0; i < 8; i++){
                result.push(new Piece(1, i, "pawn", WHITETYPE));
                result.push(new Piece(6, i, "pawn", BLACkTYPE));

            }


            return result;
        }
    

    
    for (let piece of pieces) {
        addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);  

    }
    
    
    
function addPieces(result, row, player) {
    result.push(new Piece(row, 0, "rook", player));
    result.push(new Piece(row, 1, "knight", player));
    result.push(new Piece(row, 2, "BISHOP", player));
    result.push(new Piece(row, 3, "KING", player));
    result.push(new Piece(row, 4, "QUEEN", player));
    result.push(new Piece(row, 5, "BISHOP", player));
    result.push(new Piece(row, 6, "KNIGHT", player));
    result.push(new Piece(row, 7, "ROOK", player));
}

