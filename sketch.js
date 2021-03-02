var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground ,groundImage ,invisibleGround
var score

function preload(){
  
  
  monkey_running =
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png",
                "Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 groundImage = loadImage("jungle.jpg")
}



function setup() {
 createCanvas(1700,770) 

  monkey = createSprite(450,550,20,20)
  monkey.addAnimation('running',monkey_running);
  monkey.scale = 0.3
  
  ground = createSprite(0,0,1700,790);
  ground.addImage("gr",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  ground.scale=3;
  ground.depth = monkey.depth;
  monkey.depth = monkey .depth + 1;
  
  invisibleGround = createSprite(770,600,700,10);
  invisibleGround.x = invisibleGround.width /2;
  invisibleGround.visible = false; 
  
  gameOver = createSprite(300,100);
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
  score = 0;
}

function draw() {
  
  background('lightgreen')
  
  
  if(gameState ===PLAY){
    
    gameOver.visible = false;
    
    if(keyDown("space")&& monkey.y >= 220) {
    monkey.velocityY = -16;
     // monkey.collide(invisibleGround)
    }  
   monkey.velocityY = monkey .velocityY + 0.8
    
  
  if (ground.x < 400){
      ground.x = ground.width/2;
    }  
   
 spawnObstacles();
 spawnBananas();
    
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score = score +1;
      monkey.scale = monkey.scale + 0.03 ;
    }
    
    if(obstaclesGroup.isTouching(monkey)){      
        gameState = END; 
       monkey.scale = monkey.scale - 0.03;
    } 
   
  }
  else if(gameState===END){
    
   
     ground.velocityX = 0;
    
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
     
    monkey.visible = false;
    obstaclesGroup.destroyEach();
    FoodGroup.destroyEach();
    
    if(keyDown('R')){
      
      gameState = PLAY;
      score = 0
      monkey.visible = true;
      monkey.y = 215 ;
      monkey.x = 450 ;
      monkey.collide(invisibleGround);
      ground.velocityX = -3;
    }
    
    
  }
  monkey.collide(invisibleGround); 
  
drawSprites();
  
   fill("white")
   textSize(35)
   text("Bananas EATEN: "+ score, 270,30);

if(gameState ===END){
   fill("blue");
   textSize(35); 
   text("GAMEOVER",500,100);
    
     fill("red");
   textSize(35); 
   text("Press 'R' TO restart",490,130);

}
}

   function spawnObstacles(){
    
    if(frameCount%150===0){
    
 obstacle=createSprite(1600,550,10,10);
        
 obstacle.addImage("a",obstacleImage);
 obstacle.velocityX =-8;
 obstacle.scale=0.3
 obstacle.lifetime=350; 
 obstaclesGroup.add(obstacle) ;
  }        
    }  
   
  
function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var banana = createSprite(1600,450,40,10);
    banana.y = Math.round(random(40,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    
     //assign lifetime to the variable
    banana.lifetime = 350;
    
    //adjust the depth
   
    
  
    FoodGroup.add(banana);
  }
}


  



/*var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  drawSprites();
}*/
