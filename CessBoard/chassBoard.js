// window.alert("Welcome To Chess Board");
const mainHeader = document.createElement('h1'); 
    mainHeader.innerText = ' Cyber4s ChessBoard '
    document.body.appendChild(mainHeader);
    mainHeader.classList.add('header'); // making the header of the page

const WHITETYPE = 'white'
const BLACkTYPE = 'black'

const table = document.createElement('table');  // make the table
    document.body.append(table);
    table.classList.add('table');


function addImage(cell,type, name){
    const image = document.createElement('img');
    image.src = 'Photos/' + type + '/' + name + '.png' ;
    cell.appendChild(image);

}


for (let i = 0; i<8; i++) {                 // make the rows
    let row = document.createElement('tr'); 
    table.append(row);
    row.classList.add('row');

    for(let j = 0; j<8; j++) {              // make the culons
        const cell = document.createElement('td');
        row.append(cell);

        if((j + i) % 2 == 0) {              // make the peaces color
            cell.classList.add('white');

        } else {
            cell.classList.add('black');
        }

        function addImageByIndex(cell, type, j) {
            if (j === 0 || j === 7){
                addImage(cell, type , 'rook' );
                } else if (j === 1 || j === 6){
                addImage(cell, type , 'knight' );
                } else if (j === 2 || j === 5) {
                    addImage(cell, type , 'bishop' ); 
                } else if (j === 3) {
                    addImage(cell, type , 'king' ); 
                } else if (j === 4) {
                    addImage(cell, type , 'queen' ); 
                } 

        }

        if (i === 0){
            addImageByIndex(cell, BLACkTYPE ,j);
        } else if (i === 1) {
            addImage(cell, BLACkTYPE , 'pawn' );
        } // black peaces 
        
         if (i === 6) {
            addImage(cell, WHITETYPE, 'pawn');
        } 
        if ( i === 7){
            addImageByIndex(cell, WHITETYPE ,j);

        }
    }
    
}