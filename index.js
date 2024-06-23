let buttons = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let winnerMsg = document.querySelector("#msg");
let newGame = document.querySelector("#new-btn");
let audioPlayer = document.querySelector("#audio-btn");

let trunO = false;
let count = 0;
let isWinner = false
const audioElement = new Audio("./bgm.mp3");
function player()  {
    if(audioElement.paused){
        audioElement.play();
        audioPlayer.innerText = "STOP AUDIO";
    } 
    else {
        audioElement.pause();
        audioElement.currentTime = 0;
        audioPlayer.innerText = "PLAY AUDIO";
    }
}


const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

buttons.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(trunO){
            box.innerText = "O";
            box.style.color = "#FFA62F";
            trunO = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "#DC5F00";
            trunO = true;
        }
        box.disabled = true;
        count++;
        
        if(count == 9 && !isWinner) {
            gameDraw();
        }
        checkWinner();
    })
});

const resetGame = () => {
    for(box of buttons) {
        box.innerText = "";
    }
    trunO = false;
    isWinner = false;
    count = 0;
    msgContainer.classList.add("hide");
    enableBox();
}

const disableBox = () => {
    for(box of buttons) {
        box.disabled = true;
    }
}

const enableBox = () => {
    for(box of buttons) {
        box.disabled = false;
    }
}

const showWinner = (Winner) => {
    winnerMsg.innerText = `Our Winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    disableBox();
}
const gameDraw = () => {
    winnerMsg.innerText = `Match Draw`;
    msgContainer.classList.remove("hide");
    disableBox();
}
const checkWinner = () => {
    for(pattern of winPatterns){
        posVal1 = buttons[pattern[0]].innerText;
        posVal2 = buttons[pattern[1]].innerText;
        posVal3 = buttons[pattern[2]].innerText;

        if(posVal1 !== "" && posVal2 !== "" && posVal3 !==""){
            if(posVal1 === posVal2 && posVal2 === posVal3){
                // setTimeout(showWinner, 1000/3, posVal1);
                showWinner(posVal1);
                isWinner = true;
            }
        }
    }
}

resetBtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
audioPlayer.addEventListener("click", player);