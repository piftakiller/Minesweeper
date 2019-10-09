btnEasy.addEventListener("click",()=>{
    difficulty = EASY;
    closeNav();
    beginGame(difficulty);
});
btnHard.addEventListener("click",()=>{
    difficulty = HARD;
    closeNav();
    beginGame(difficulty);
});

btnTryAgain.addEventListener("click",()=>{
    beginGame(difficulty);
});

function openNav() {
    document.getElementById("mySidenav").style.width = "25%";
  }
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

function beginGame(difficulty){
    time=0;
    point=0;
    flags=difficulty.mines;
    remainingBombs=difficulty.mines;
    remainingCells=difficulty.cells*difficulty.cells;
    flagsDiv.innerText=flags;
    pointsDiv.innerText=point;
    console.log(difficulty.name);
     let allCells;
        difficultyTxt.innerText=difficulty.name;
       createPlayfield(difficulty);
        gameArray=new Array(difficulty.cells);
        for(let i=0;i<gameArray.length;i++){
            gameArray[i]=new Array(difficulty.cells);
            for(let j=0;j<gameArray[i].length;j++){
                gameArray[i][j]={value:"",id:(difficulty.cells*i+j),revealed:false,flagged:false};
            }
        }
        placeBombs();
        for(let i=0;i<gameArray.length;i++){
            for(let j=0;j<gameArray[i].length;j++){
               gameArray[i][j].value=countBombs(i,j);
               //gridItem[gameArray[i][j].id].innerText=gameArray[i][j].value;
                
            }
        }
        clearInterval(timers);
        timers = setInterval(timeCount,1000);
        //console.log(gameArray);
        
  }

  function createPlayfield(difficulty){
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
      }
       allCells=difficulty.cells*difficulty.cells;
      for(let i=0;i<allCells;i++){
          let div = document.createElement("div");
          div.classList.add("Grid-item9");
          div.id=i;
          grid.appendChild(div);
      }
      if(difficulty.name=="Easy"){
        grid.classList.remove("Grid16");
        grid.classList.add("Grid9");
    }else if(difficulty.name=="Hard")
    {
        grid.classList.add("Grid16");
        grid.classList.remove("Grid9");
    }
      gridItem=document.querySelectorAll("#Grid div");
      for(let i=0;i<gridItem.length;i++){
        document.getElementById(i).addEventListener('click',reveal);
        document.getElementById(i).addEventListener("contextmenu",flag);
        document.getElementById(i).style.cursor="default";
    }
  }

function placeBombs(){
      let randI,randJ;let bombak=0;
     for(let i=0;i<difficulty.mines;i++){
         randI=Math.floor(Math.random()*9);
         randJ=Math.floor(Math.random()*9);
        while(gameArray[randI][randJ].value=="Bomb"){
            randI = Math.floor(Math.random()*9);
            randJ =Math.floor(Math.random()*9);
           } 
           gameArray[randI][randJ].value="Bomb";
           bombak++;
     }   
     console.log("bombák: "+bombak);
    }
function countBombs(i,j){
    let bombsAround=0;
    if(gameArray[i][j].value!="Bomb"){
        for(let k=-1;k<2;k++){
            for(let l=-1;l<2;l++){
                let f=i+k; let g=j+l;
                if((f<difficulty.cells&&f>=0)&&(g<difficulty.cells&&g>=0)){
                    if(gameArray[f][g].value=="Bomb"){bombsAround++;}
                }
            }
        }
    }else{ bombsAround="Bomb";}
    
    return bombsAround;
}

function flag(obj){
    let x=Math.floor(obj.target.id/difficulty.cells);
    let y=obj.target.id%difficulty.cells;
    let thisObj=obj.target;
    let thisArrElement=gameArray[x][y];
    if(thisArrElement.revealed==false){
        if (thisArrElement.flagged==false&&(flags-1)>=0) {
            flags--;
            thisArrElement.flagged=true;
            document.getElementById(obj.target.id).innerText="F";
        }else if(thisArrElement.flagged==true){
            flags++;
            thisArrElement.flagged=false;
            document.getElementById(obj.target.id).innerText="";
        }
    }
    if(thisArrElement.value=="Bomb"){
        remainingBombs--;
        if (remainingBombs==0) {
            win();
        }
    }
    flagsDiv.innerText=flags;
}

function reveal(obj){
    let x=Math.floor(obj.target.id/difficulty.cells);
    let y=obj.target.id%difficulty.cells;
    let thisObj=obj.target;
    let thisArrElement=gameArray[x][y];
    if(thisArrElement.flagged==false){
            document.getElementById(obj.target.id).removeEventListener("click",reveal);
            document.getElementById(obj.target.id).removeEventListener("click",flag);
            console.log(thisArrElement.value+" "+thisObj.id);
            switch(thisArrElement.value){
                //default: thisObj.style.backgroundColor="grey";break;
                case 1: thisObj.style.color="blue";break;
                case 2: thisObj.style.color="green";break;
                case 3: thisObj.style.color="red";break;
            }
            thisObj.style.backgroundColor="lightgrey";
            if(thisArrElement.value>=1){   
                thisObj.innerText=thisArrElement.value;
                thisArrElement.revealed=true;
                addPoint();
                remainingCells--;
            }else if(thisArrElement.value==0){ 
                searchZeros(x,y);
            }
            else{gameOver(); return;}
            }
            if (remainingCells==difficulty.mines) {
                win();                
            }
}
function searchZeros(x,y){
gameArray[x][y].revealed=true;
addPoint();
remainingCells--;
document.getElementById(((x*difficulty.cells)+y)).innerText=gameArray[x][y].value;
document.getElementById(((x*difficulty.cells)+y)).style.backgroundColor="lightgrey";

    if(x+1<difficulty.cells){if(gameArray[(x+1)][y].value==0&&gameArray[(x+1)][y].revealed==false&&gameArray[(x+1)][y].flagged==false){searchZeros((x+1),y);}}
    if(x-1>=0){if(gameArray[(x-1)][y].value==0&&gameArray[(x-1)][y].revealed==false&&gameArray[(x-1)][y].flagged==false){searchZeros((x-1),y);}}
    if(y+1<difficulty.cells){if(gameArray[(x)][y+1].value==0&&gameArray[x][(y+1)].revealed==false&&gameArray[x][(y+1)].flagged==false){searchZeros(x,(y+1));}}
    if(y-1>=0){if(gameArray[(x)][y-1].value==0&&gameArray[x][(y-1)].revealed==false&&gameArray[x][(y-1)].flagged==false){searchZeros(x,(y-1));}}
    
}
function gameOver(){
    alert("GameOver");
    for(let i=0;i<allCells;i++){
        let x=Math.floor(i/difficulty.cells);
        let y=i%difficulty.cells;
        if(gameArray[x][y].value=="Bomb") document.getElementById(i).innerText=gameArray[x][y].value;
            document.getElementById(i).removeEventListener('click',reveal);
            document.getElementById(i).removeEventListener("contextmenu",flag);
        
    }
    clearInterval(timers);

}
function win (){
    clearInterval(timeCount);
    point=((1000-time)+(remainingBombs*100)-(remainingCells*50));
    for(let i=0;i<gridItem.length;i++){
        document.getElementById(i).removeEventListener('click',reveal);
        document.getElementById(i).removeEventListener("contextmenu",flag);
    }
}
function timeCount(){
    time++;
    timeDiv.innerText=time;
}
function addPoint(){
    point++;
    pointsDiv.innerText=point;
}