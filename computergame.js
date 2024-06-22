let boxes = document.querySelectorAll('.box');
let turnbox = document.querySelector('.turn-box');
let startBtn = document.querySelector('.start');
let rematch = document.querySelector('.restart');
let gameaudio = new Audio("audio/gameaudio.mp3");
let gameoveraudio = new Audio("audio/gameover.wav");
let turnoveraudio = new Audio("audio/snare.mp3");
let isgameover = false;
let computerturn ="O";
let iscomputerturn = false;

let playerturn = "X";
let turn = playerturn ; 

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
            if(boxes[e[0]].innerText===playerturn){
                updateTurnBox("!you win!");
            

            }
            else{
                updateTurnBox("! computer wins !");
                

            }
            gameaudio.pause();
            gameoveraudio.play();
            isgameover = true;
            return;

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
    updateTurnBox(turn);
    boxes.forEach(box=>{
        box.addEventListener('click',updateScreen,false);
    });
};
let updateScreen =(box) => {
    numberOfMoves++;
 
     if (turn === playerturn) {
        box.target.innerText = playerturn;
        box.target.removeEventListener('click',updateScreen,false);
        checkWin(turn);
         changeTurn(turn);
       
     }
     
    if (!isgameover && numberOfMoves<9 ) {
       
        updateTurnBox(turn);
             
        computersMove();
        
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

 let changeTurn = (turn)=>{
   
    turn = (turn===playerturn)?computerturn:playerturn;

 };


 let removeFunctionFromBox =()=>{
    boxes.forEach(box=>{
        box.removeEventListener('click',updateScreen,false);
    });
};

let updateTurnBox =(turn)=>{
  
    if(turn===playerturn){
       turnbox.innerText="your turn"

    }
    else if (turn===computerturn) {
        
        turnbox.innerText="computer's turn"
    }
    else{
         turnbox.innerText=turn;
    }
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

let computersMove =()=>{
   
   
   
    numberOfMoves++;
    emptyboxes =[]
    boxes.forEach((box,index)=>{
        if(box.innerText===""){
            emptyboxes.push(index);
        }
    });
    if (emptyboxes.length===0) {

        return;
    }
    randomIndex= Math.floor(Math.random()*emptyboxes.length);
  

   
        boxes[emptyboxes[randomIndex]].innerText=computerturn;
    
    
    boxes[emptyboxes[randomIndex]].removeEventListener('click',updateScreen,false);
     checkWin(turn);
    changeTurn(turn);
    if (!isgameover && numberOfMoves<9 ) {
       
        updateTurnBox(turn);
             
        
        
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

let drawGame = ()=>{
    isgameover = true;
    updateTurnBox("It's a draw");
    gameoveraudio.play();

};




startBtn.addEventListener('click',startGame,false);
rematch.addEventListener('click',restart,false);
