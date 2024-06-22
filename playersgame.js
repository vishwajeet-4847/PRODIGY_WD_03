let boxes = document.querySelectorAll('.box');
let turnbox = document.querySelector('.turn-box');
let startBtn = document.querySelector('.start');
let rematch = document.querySelector('.restart');
let gameaudio = new Audio("audio/gameaudio.mp3");
let gameoveraudio = new Audio("audio/gameover.wav");
let turnoveraudio = new Audio("audio/snare.mp3");
let isgameover = false;

let turn ="X";

let numberOfMoves = 0;

const checkWin = ()=>{
    const win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ]
    win.forEach(e=>{
        if ((boxes[e[0]].innerText === boxes[e[1]].innerText) && (boxes[e[1]].innerText === boxes[e[2]].innerText) && (boxes[e[0]].innerText !== "")){
            
            updateTurnBox(boxes[e[0]].innerText+"'s wins");
            gameaudio.pause();
            gameoveraudio.play();
            isgameover = true;
            return true;

        }
    });
}
const startGame =() => {
    gameaudio.loop = true;
    gameaudio.play();
   
   addFunctionToBox();

};

let addFunctionToBox =()=>{
    startBtn.classList.add('hide');
    updateTurnBox(turn+"'s turn");
    boxes.forEach(box=>{
        box.addEventListener('click',updateScreen,false);
    });
};


let updateScreen =(box) => {
   numberOfMoves++;

    box.target.innerText=turn;

    box.target.removeEventListener('click',updateScreen,false);
    checkWin()
   turn = changeTurn(turn);
   if (!isgameover && numberOfMoves<9 ) {
    
       updateTurnBox(turn+"'s turn");
        	
       
       
   }
   else if (numberOfMoves==9 && !isgameover) {
    drawGame();
    
    rematch.classList.remove('hide');
   }
   else{
    removeFunctionFromBox();

    rematch.classList.remove('hide');
   }

};
let removeFunctionFromBox =()=>{
    boxes.forEach(box=>{
        box.removeEventListener('click',updateScreen,false);
    });
};
let changeTurn =(turn)=>{
    
    return (turn==="X")?"O":"X";
}


let updateTurnBox = (turn)=>{
    
    turnbox.innerText=turn;
};

let clearBoard = ()=>{
    boxes.forEach(box=>{
        box.innerText="";
    });
}

let restart = ()=>{
    rematch.classList.add('hide');
    numberOfMoves = 0; 
    clearBoard();
    removeFunctionFromBox();
    isgameover = false;
    turn = "X";
    addFunctionToBox();


};
let drawGame = ()=>{
    isgameover = true;
    updateTurnBox("It's a draw");
    gameoveraudio.play();

};


startBtn.addEventListener('click', startGame, false);

rematch.addEventListener('click',restart,false);


