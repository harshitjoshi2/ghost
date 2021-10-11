var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup=new Group()
  climbersGroup=new Group()

  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
spookySound.loop();

  invisibleBlockGroup=new Group()
}

function draw() {
  background(200);
 if (gameState==="play"){
  if(tower.y > 400){
    tower.y = 300
  }

  if (keyDown("a")){
    ghost.x=ghost.x-3;
  }

  if (keyDown("s")){
    ghost.x=ghost.x+3;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-5;
  }
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;

  }

if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
ghost.destroy();
gameState="end"
}

  ghost.velocityY=ghost.velocityY+0.5;

  spawndoors();
  drawSprites();
 } 
 if (gameState==="end"){
stroke("yellow")
textSize(30)
text("Game Over",230,250)

 }
  

   

   
}

function spawndoors(){
  if (frameCount%250===0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
door.velocityY=1;
 door.x=Math.round(random(120,400))
 door.lifetime=800;
 doorsGroup.add(door);

climber=createSprite(200,10);
climber.addImage(climberImg);
climber.velocityY=1;
climber.x=door.x;
climber.lifetime=800;
climbersGroup.add(climber);
ghost.depth=door.depth;
ghost.depth=ghost.depth+1;

invisibleBlock=createSprite(200,15);
invisibleBlock.width=climber.width;
invisibleBlock.height=2;
invisibleBlock.x=climber.x;
invisibleBlock.velocityY=1;
invisibleBlockGroup.add(invisibleBlock);
  }

}
