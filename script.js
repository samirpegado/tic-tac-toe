let btnRef = document.querySelectorAll('.button-option');
let popupRef = document.querySelector('.popup');
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById('restart');
let msgRef= document.getElementById("message");


//Disable all buttons and show a message
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
}

//Enable all buttons for a new game and restart

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    //disable popup
    popupRef.classList.add('hide');
};

//new game
newgameBtn.addEventListener('click', () => {
    count = 0;
    enableButtons();
});

//restart game
restartBtn.addEventListener('click', () => {
    count = 0;
    enableButtons();
});

//This function is executed when a player wins
const winFunction = (letter) => {
    disableButtons();

    if(letter == 'X'){
        msgRef.innerHTML = "<br> 'X' Wins";
    }else{
        msgRef.innerHTML = "<br> 'O' Wins";
    }
};

//function for a draw
const drawFunction = (letter) => {
    disableButtons();
    msgRef.innerHTML = "<br> It's a draw";
};


//Winning Pattern Array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
];

//Player 'X' plays first
let xTurn = true;
let count = 0;

//Win Logic
const winChecker = () =>{
    //Loop through all win patterns
    for (let i of winningPattern){
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //Check if elements are filled
        //If 3 empty elements are same and would give win as would
        if(element1 != '' && (element2 != '') & (element3 !='')){
            if(element1 == element2 && element2 == element3){
                //if all 3 buttons have the same values then pass 
                //the value to winFunction
                winFunction(element1);
            }
        }
    }
}

//Display X/O on click
btnRef.forEach((element) =>{
    element.addEventListener('click', () => {
        if (xTurn) {
            xTurn = false;
            //Display X
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            //Display O
            element.innerText = "O";
            element.disabled = true;
        }
        //Increment count on each click
        count += 1;
        if(count == 9){
            //Its a draw
            drawFunction();
        }
        //Check for win on every click
        winChecker();
    });
});

//Enable buttons and disable popup on page load
window.onload = enableButtons;