document.oncontextmenu = function() {return false;}

const btnEasy = document.getElementById("btnEasy") ;
const btnHard = document.getElementById("btnHard") ;
const btnTryAgain = document.getElementById("btnTryAgain") ;
const difficultyTxt = document.getElementById("difficulty") ;
const pointsDiv = document.getElementById("points") ;
const flagsDiv = document.getElementById("flagsDiv") ;
const timeDiv = document.getElementById("timeDiv") ;
const grid = document.getElementById("Grid");
let  gridItem = document.querySelectorAll("#Grid div");
const statForm = document.getElementById("statForm");
statForm.style.visibility="hidden";
let time;
let point;
let timers;
let flags;
let remainingBombs;
let gameArray;

const EASY ={
    name:"Easy",
    cells : 9, 
    mines : 10
};
const HARD ={
    name:"Hard",
   cells : 16,
   mines : 40
 };