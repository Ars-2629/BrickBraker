const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#result1');
const leftKey = document.querySelector('#leftkey');
const rightKey = document.querySelector('#rightkey');
const result = document.querySelector('#result');

// Inner Dimension Of The Grid
const gridInnerWidth = grid.clientWidth; 
const gridInnerHeight = grid.clientHeight;

// slider starting position 
const sliderStart = [230,10];
let sliderCurrentPosition = sliderStart;

const ballStart = [270,40];
let ballCurrentPosition = ballStart;

let xDirection=1;
let yDirection=1;

let score = 0;



// Each Block Bottom-Left-Corner Position On X-Axis And Y-Axis.
 class Block {
      constructor(xAxis,yAxis){
        this.bottomLeft =[xAxis,yAxis];
       };
   };
// Multi Blocks Creation
   const blocks = [
   //  first row
    new Block(10,350),
    new Block(70,350),
    new Block(130,350),
    new Block(190,350),
    new Block(250,350),
    new Block(310,350),
    new Block(370,350),
    new Block(430,350),
    new Block(490,350),

   //  Second row
    new Block(10,300),
    new Block(70,300),
    new Block(130,300),
    new Block(190,300),
    new Block(250,300),
    new Block(310,300),
    new Block(370,300),
    new Block(430,300),
    new Block(490,300),

   //  Third row

   new Block(10,250),
    new Block(70,250),
    new Block(130,250),
    new Block(190,250),
    new Block(250,250),
    new Block(310,250),
    new Block(370,250),
    new Block(430,250),
    new Block(490,250),

   
];


// Mutliple Block Contructor
function createBlocks(){
     for(i=0; i<blocks.length; i++){
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left=blocks[i].bottomLeft[0]+'px';
    block.style.bottom =blocks[i].bottomLeft[1]+'px';
    grid.appendChild(block);
    
    window.blockOuterHeight = block.offsetHeight;
    window.blockOuterWidth = block.offsetWidth;
   };
   
};
 
createBlocks();

// Slider Bottm-Left-Corner Position on X-Axis and Y-Axis.

 function sliderPosition(){
   slider.style.left = sliderCurrentPosition[0]+'px';
   slider.style.bottom = sliderCurrentPosition[1]+'px';
  
}


// Silder Constructor
const slider = document.createElement('div');
slider.classList.add('slider');
sliderPosition(); // slider position by calling function. 
grid.appendChild(slider);
const sliderOuterWidth = slider.offsetWidth;
const sliderOuterHeight = slider.offsetHeight;





// Move Slider
function moveSlider(e){
   switch(e.target){
      case leftKey:
         if(sliderCurrentPosition[0]>0){
            sliderCurrentPosition[0]-=15;
            sliderPosition(); // slider position by calling  function.
            };
          break;

      case rightKey:
         if(sliderCurrentPosition[0]<gridInnerWidth-sliderOuterWidth){
            sliderCurrentPosition[0]+=15;
            sliderPosition(); // slider position by calling  function.
         };
         break;  

   } 

}

rightKey.addEventListener('click',moveSlider);
leftKey.addEventListener('click',moveSlider);

// Ball Bottm-Left-Corner Position on X-Axis and Y-Axis.
function ballPosition(){
   ball.style.left = ballCurrentPosition[0] + 'px';
   ball.style.bottom = ballCurrentPosition[1] + 'px';
}

// Ball Constructor
const ball = document.createElement('div');
ball.classList.add('ball');
ballPosition();
grid.appendChild(ball);
const ballOuterWidth = ball.offsetWidth;
const ballOuterHeight = ball.offsetHeight;
const freeAreaWidth = gridInnerWidth-ballOuterWidth;
const freeAreaHeight = gridInnerHeight-ballOuterHeight;

// Moving Ball
function moveBall(){
   ballCurrentPosition[0] +=xDirection;
   ballCurrentPosition[1] +=yDirection;
   ballPosition();
   ball.style.transition='0.2';
   ballTravelArea();
}

// Time interval to change the ball position
timerid = setInterval(moveBall,10);

// Ball Travel Area
function ballTravelArea(){
   // check for collision with blocks
   for(let i=0; i<blocks.length;i++){
      if(ballCurrentPosition[0] > blocks[i].bottomLeft[0] && 
         ballCurrentPosition[0] < (blocks[i].bottomLeft[0]+blockOuterWidth) &&
         (ballCurrentPosition[1] + ballOuterHeight) > blocks[i].bottomLeft[1] && 
         (ballCurrentPosition[1] + ballOuterHeight) < (blocks[i].bottomLeft[1]+blockOuterHeight)

         ){
            
         var allBlocks = Array.from(document.querySelectorAll('.block'));

           allBlocks[i].classList.remove('block');
           blocks.splice(i,1);
           changeBallPosition();
           score+=1;
           scoreDisplay.innerHTML=score;

         // check for win condition
         
         if(blocks.length === 0) {
            clearInterval(timerid);
            result.innerHTML = "Yow Won";
            setInterval(()=>{
               if(result.innerHTML=="You Won"){
                  result.innerHTML="";
               }else{
                  result.innerHTML="You Won";
               }
            },500);
            leftKey.removeEventListener('click',moveSlider);
            rightKey.removeEventListener('click',moveSlider);
         }

            
         };
   }
   
   // check for collision on sidewalll
   if(ballCurrentPosition[0]>=freeAreaWidth || 
      ballCurrentPosition[1]>=freeAreaHeight ||
      ballCurrentPosition[0]<=0){
       changeBallPosition();
   }

   // check for ball and slider collision
   
   if(
      (ballCurrentPosition[0] > sliderCurrentPosition[0] && ballCurrentPosition[0] < (sliderCurrentPosition[0]+sliderOuterWidth)) &&
      (ballCurrentPosition[1] > sliderCurrentPosition[1] && ballCurrentPosition[1] < (sliderCurrentPosition[1]+sliderOuterHeight))
      
      ){
         changeBallPosition();
      }


   // Game Over Condition
if(ballCurrentPosition[1]<=0){
   clearInterval(timerid);
   result.innerHTML='Game Over';
   setInterval(()=>{
      if(result.innerHTML=="Game Over"){
         result.innerHTML="";
      }else{
         result.innerHTML="Game Over";
      }
   },500);
   
   leftKey.removeEventListener('click',moveSlider);
   rightKey.removeEventListener('click',moveSlider);
}

}
 
// Change Ball Position
function changeBallPosition(){
   if(xDirection === 1 && yDirection === 1){
      yDirection = -1;
   }else if(xDirection === 1 && yDirection === -1){
     xDirection = -1;
   }else if(xDirection === -1 && yDirection === -1){
      yDirection = 1;
   }else if(xDirection === -1 && yDirection === 1){
      xDirection = 1;
   }
}







