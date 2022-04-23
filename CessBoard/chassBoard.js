
// window.alert("Welcome To Chess Board");
const mainHeader = document.createElement('h1');
mainHeader.innerText = ' Cyber4s ChessBoard '
document.body.appendChild(mainHeader);
mainHeader.classList.add('header'); // making the header of the page

function chessBoardCreation() {
  chessBoard = document.createElement("table");
  document.body.appendChild(chessBoard);
  for (let row = 0; row < 8; row++) {
    const rowElement = chessBoard.insertRow();
    for (let col = 0; col < 8; col++) {
      const cell = rowElement.insertCell();
      if ((row + col) % 2 === 0) {
        cell.className = "black";
      } else {
        cell.className = "white";
      }
  }}}


  window.addEventListener("load", chessBoardCreation);