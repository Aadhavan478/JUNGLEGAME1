var bg,bgImg;
var hunter,hunterImg;
var hunter2Img;
var hunter4Img;
var hunter3Img;
var hunter5Img;
var deer,deerImg;
var deerGroup;
var score=0;
var tiger,tigerImg;
var tigerGroup;
var invisibleground;
var gameState = "play";
var hunterendImg;
var reset,resetImg;
var gameover,gameoverImg;
//var shooter,shooterImg;

function preload(){
  
  bgImg = loadImage("assets/background.jpg");
  hunterendImg = loadImage("assets/character1.png");
  hunterImg = loadAnimation("assets/character1.png");
  hunter5Img = loadAnimation("assets/character3.png","assets/character4.png");
  deerGroup = new Group();
  tigerGroup = new Group();
  deerImg = loadImage("assets/deer.png");
  tigerImg = loadImage("assets/tiger.png");
  gameoverImg = loadImage("assets/gameover.png");
  resetImg = loadImage("assets/reset.png");
  //shooterImg = loadAnimation("assets/hunter1.jpg","assets/hunter2.jpg","assets/hunter3.jpg");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
bg.addImage(bgImg);
bg.scale = 2.2;
bg.velocityX = -2;

invisibleground = createSprite(displayWidth/2, displayHeight - 100, displayWidth, 10);
invisibleground.visible = false;

//creating the player sprite
hunter = createSprite(displayWidth-1150, displayHeight-250, 50, 50);
hunter.addAnimation("hunter",hunterImg);
hunter.addAnimation("huntermoving",hunter5Img);
//hunter.addAnimation("shooter",shooterImg);
hunter.addImage(hunterendImg);
hunter.scale = 0.5;
hunter.debug = true;
hunter.setCollider("rectangle",0,0,150,400);

// creating gameover and reset 
gameover = createSprite(windowWidth/2,windowHeight/2-50,100,50);
gameover.addImage(gameoverImg);
gameover.visible = false;
gameover.scale = 0.6;

reset = createSprite(windowWidth/2,windowHeight/2+70,80,50);
reset.addImage(resetImg);
reset.visible = false;
reset.scale = 0.2;


}

function draw() {
  background("green"); 

  if(gameState === "play")
  {
    if(bg.x < 490)
    {
    bg.x = displayWidth/2;
    }
  
    if(keyDown("UP_ARROW")){
      hunter.velocityY = -14;
    }
  
    hunter.velocityY += 0.9;
  
    //moving the player up and down and making the game mobile compatible using touches
  if(keyDown("SPACE")){
    hunter.changeAnimation("huntermoving",hunter5Img);
  }
  
  if(keyWentUp("space")){
   
    hunter.changeAnimation("hunter",hunterImg);
   
  }

  if(deerGroup.isTouching(hunter))
  {
    score += 3;
    deerGroup.destroyEach();  
  }
  
  if(tigerGroup.isTouching(hunter))
  {
    score -= 2;
    tigerGroup.destroyEach();  
  }

  if(score < 0 || score > 30)
  {
  gameState = "end";
  }


  spawnDeer();
  spawnTiger();
  }

  else if(gameState === "end")
  {
  bg.velocityX = 0;
  tigerGroup.setVelocityXEach(0);
  deerGroup.setVelocityXEach(0);
  hunter.changeImage(hunterendImg);
  score = 0;
  tigerGroup.setLifetimeEach(-1);
  deerGroup.setLifetimeEach(-1);
  
  gameover.visible = true;
  reset.visible = true;

  }


hunter.collide(invisibleground);

if(mousePressedOver(reset))
{
 resetgame();
}


//release bullets and change the image of shooter to shooting position when space is pressed
/*if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}&

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}*/

drawSprites();

fill("red");
textSize(30);
text("Score : " + score, 150,100);



}

function spawnDeer()
{
 if(frameCount % 250 === 0)
 {
  deer = createSprite(displayWidth - 350, displayHeight - 200, 80, 30);
  deer.addImage(deerImg);
  deer.scale = 0.25;
  deer.velocityX = -3;
  hunter.depth = deer.depth+1;
  deerGroup.add(deer);
  deer.lifetime = 350;
 }
}

function spawnTiger()
{
 if(frameCount % 393 === 0)
 {
  tiger = createSprite(displayWidth - 350, displayHeight - 180, 80, 30);
  tiger.addImage(tigerImg);
  tiger.scale = 0.5;
  tiger.velocityX = -3;
  hunter.depth = tiger.depth+1;
  tigerGroup.add(tiger);
  tiger.lifetime = 350;
 }
}

function resetgame()
{
 gameState = "play";

 bg.velocityX = -2;

 //hunter.changeAnimation("shooter",shooterImg);

 gameover.visible = false;
 reset.visible = false;

 deerGroup.destroyEach();
 tigerGroup.destroyEach();
}