const addBoxButton = document.getElementById('togglerulebook');
const hiddenBox = document.querySelector('.rulebook.hidden');
const crossbtn = document.getElementById('cross');

const addBoxButton1 = document.getElementById('addBox');
const hiddenBox1 = document.querySelector('.sub-box.hidden');
const computer = ["rock", "paper", "scissor"];


// rules

addBoxButton.addEventListener('click',() =>{
    if(hiddenBox.classList.contains('hidden')){
        hiddenBox.classList.remove('hidden');
    }else{
        hiddenBox.classList.add('hidden');  
    }
    //Cross btn action to close rulesbook
    crossbtn.addEventListener('click',function() {
        hiddenBox.classList.add('hidden');  
    });
});

//----------------Buttons-------------------------------------
// const rulesBtn = document.querySelectorAll(".rules-btn");
const nextBtn = document.getElementById("next-btn");
const playAgainBtn = document.querySelector("#play-again");
const replayBtn = document.querySelector("#replay");
// const closeModalBtn = document.getElementById("close");

//---------------Rules Modal-----------------------------------
// const rulesModal = document.getElementById("rules-modal");

//----------------Won Game-------------------------------------
const wonGame = document.querySelector(".won-game");

//----------------Play Board-----------------------------------
const playBoard = document.getElementById("play-board");

//---------------ResultBoard-----------------------------------
const resultBoard = document.getElementById("result-board");
const userResult = document.querySelector(".user-result");
const pcResult = document.querySelector(".pc-result");
let resultText = document.getElementById("result-text-1");
let resultText2 = document.getElementById("result-text-2");
let picked = document.querySelectorAll(".picked");

// ------------------ Score Board-------------------------------
const computerScore = document.getElementById("cs");
const userScore = document.getElementById("ys");

// =============================================================================| SCORE |==================================================================================
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

let score = {
  user: 0,
  computer: 0,
};
// console.log(score.user)

// LOCAL STORAGE -- GET SCORE
if (localStorage.getItem("score")) {
  score = JSON.parse(localStorage.getItem("score"));
}

userScore.innerHTML = score.user;
computerScore.innerHTML = score.computer;


// -------------------- RESULT ------------------------------

const result = {
  WIN: "YOU WIN",
  LOST: "YOU LOST",
  TIEUP: "TIE UP",
};

// =========================================================================| EVENT LISTENERS |=============================================================================


// rulesBtn.forEach((element) => {
//   element.addEventListener("click", () => {
//     rulesModal.style.display = "block";
//   });
// });

// closeModalBtn.addEventListener("click", () => {
//   rulesModal.style.display = "none";
// });
let wonHeading=document.getElementById("wonhead")
let wonSubHeading=document.getElementById("wonsubhead");
// console.log(wonHeading.innerText)
// console.log(wonSubHeading.innerHTML)
nextBtn.addEventListener("click", () => {
  playBoard.style.display = "none";
  resultBoard.style.display = "none";
  wonGame.style.display = "flex";
});
function nextpage(){
  cs=computerScore.innerHTML
  ys=userScore.innerHTML
  console.log(cs)
  console.log(ys)
  if(cs==ys){
    wonHeading.innerHTML="WOW!!!"
wonSubHeading.innerHTML="IT'S A TIE"
  }else if(cs>ys){
    wonHeading.innerHTML="Ooch..."
    wonSubHeading.innerHTML="YOU LOST THE GAME"
  }
  else if(cs<ys){
        wonHeading.innerHTML="HURRAY!!"
    wonSubHeading.innerHTML="YOU WON THE GAME"
  }
}

playAgainBtn.addEventListener("click", playAgain);

replayBtn.addEventListener("click", playAgain);


// =========================================================================| FUNCTIONS |=============================================================================


function playAgain() {
  playBoard.style.display = "grid";
  resultBoard.style.display = "none";
  wonGame.style.display = "none";
  nextBtn.style.display = "none";
}



// computer Picks


function computerPicked() {
  let picked = getRandomInt(0, 2);
  console.log(computer[picked])
  return computer[picked];
}

function setImg(picked) {
  let img = `<img src="./images/${picked}.png" alt=${picked} width="60px"/>`;
  return img;
}

function setStyles() {

  resultBoard.style.marginTop = "3rem";

  picked.forEach((element) => {
    element.style.top = "300px";
  });

  for (let index = 0; index < 3; index++) {
    userResult.classList.remove("rock-div");
    userResult.classList.remove("paper-div");
    userResult.classList.remove("scissor-div");
    pcResult.classList.remove("rock-div");
    pcResult.classList.remove("paper-div");
    pcResult.classList.remove("scissor-div");

    playAgainBtn.style.display = "block";
    resultText2.style.display = "block";
    replayBtn.style.display = "none";
    nextBtn.style.display = "none";
  }
}

// ================================================================| GAME START |==========================================================================

function startGame(userPicked) {
    // console.log("jooo")

  let pcPicked = computerPicked();

  setStyles();

  let res;

  if (userPicked === pcPicked) {

    res = result.TIEUP;

    removeFocus();

    playAgainBtn.style.display = "none";
    replayBtn.style.display = "block";
    resultText2.style.display = "none";

    picked.forEach((element) => {
      element.style.top = "256px";
    });

    resultBoard.style.marginTop = "6rem";
// console.log( (userPicked === "rock" && pcPicked === "scissor"))
  } 
  else if (
    (userPicked === "rock" && pcPicked === "scissor") ||
    (userPicked === "paper" && pcPicked === "rock") ||
    (userPicked === "scissor" && pcPicked === "paper")
  ) {
    res = result.WIN;

    nextBtn.style.display = "block";

    focusOnUserWinner();

    // UPDATE SCORE -- USER WINS
    score.user++;

  } 
  else {
    // console.log((userPicked === "rock" && pcPicked === "scissor"))
    res = result.LOST;

    focusOnPCWinner();

    nextBtn.style.display = "block";

    // UPDATE SCORE -- USER LOST
    score.computer++;

  }
  playBoard.style.display = "none";
  resultBoard.style.display = "flex";

  // RESULT BOARD 
  userResult.classList.add(`${userPicked}-div`);
  pcResult.classList.add(`${pcPicked}-div`);
  userResult.innerHTML = setImg(userPicked);
  pcResult.innerHTML = setImg(pcPicked);
  resultText.innerHTML = res;

  // SCORE BOARD
  userScore.innerHTML = score.user;
  computerScore.innerHTML = score.computer;
  
  // SAVING SCORE IN LOCAL STRORAGE
  localStorage.setItem("score", JSON.stringify(score));
};


// ================================================================| GAME END |==========================================================================


// Winner Focus Boxes

let winUserBox1 = document.querySelector(".user-box-1");
let winUserBox2 = document.querySelector(".user-box-2");
let winUserBox3 = document.querySelector(".user-box-3");
let winPcBox1 = document.querySelector(".pc-box-1");
let winPcBox2 = document.querySelector(".pc-box-2");
let winPcBox3 = document.querySelector(".pc-box-3");

let focusOnUserWinner = () => {
  winPcBox1.classList.remove("winner-box-1");
  winPcBox2.classList.remove("winner-box-2");
  winPcBox3.classList.remove("winner-box-3");

  winUserBox1.classList.add("winner-box-1");
  winUserBox2.classList.add("winner-box-2");
  winUserBox3.classList.add("winner-box-3");
};
let focusOnPCWinner = () => {
  winUserBox1.classList.remove("winner-box-1");
  winUserBox2.classList.remove("winner-box-2");
  winUserBox3.classList.remove("winner-box-3");

  winPcBox1.classList.add("winner-box-1");
  winPcBox2.classList.add("winner-box-2");
  winPcBox3.classList.add("winner-box-3");
};

let removeFocus = () => {
  winUserBox1.classList.remove("winner-box-1");
  winUserBox2.classList.remove("winner-box-2");
  winUserBox3.classList.remove("winner-box-3");

  winPcBox1.classList.remove("winner-box-1");
  winPcBox2.classList.remove("winner-box-2");
  winPcBox3.classList.remove("winner-box-3");
};

function reSetPlay(){
  score.user=0
  score.computer=0
  localStorage.setItem("score",JSON.stringify(score))
  userScore.innerHTML=score.user
  computerScore.innerHTML=score.computer
  playAgain()
}


