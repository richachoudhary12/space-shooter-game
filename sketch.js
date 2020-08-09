
//write the variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

var player;

var stars = 0;

var gameOver,restart;

var galaxianGroup;
var galaxian1Group;
var bulletGroup;
var starsGroup;
var asteroidsGroup;


var alienShuttleImage;
var alienShuttle2Image;
var asteroidImage;
var galaxyImage  ;
var playerShuttleImage;
var starImage;
var gameOverImage;
var restartImage;


var asteroidSound;
var backgroundLoopSound;
var checkPointSound;
var laserSound;
var shootingSound;
var dieSound;

function preload (){
  //load all the images and sounds 

getBgImage();
alienShuttleImage = loadImage("alienShuttle.png");
alienShuttle2Image = loadImage("alienShuttle2.png");
asteroidImage = loadImage("asteroid.png");
galaxyImage = loadImage("galaxy(1).jpg");
asteroidSound = loadSound("asteroid.mp3");
backgroundLoopSound = loadSound("backgroundLoop.mp3");
checkPointSound = loadSound("checkPoint.mp3");
laserSound = loadSound("laser.mp3");
shootingSound = loadSound("shooting.mp3");
dieSound = loadSound("die.mp3");
starImage = loadImage("star (1).png");
playerShuttleImage = loadImage("player shuttle.png");
gameOverImage = loadImage("gameOver.png");
restartImage = loadImage("restart.png");

}

function setup(){
  //set up a canvas
createCanvas(displayWidth,displayHeight-140);

backgroundLoopSound.play();

player = createSprite(190,500);
player.addImage(playerShuttleImage);

player.scale = 0.4;

player.setCollider("rectangle",0,0,200,500);

galaxianGroup = new  Group();
galaxian1Group = new Group();
bulletGroup = new Group();
starsGroup = new Group();
asteroidsGroup = new Group();

gameOver = createSprite(650,300);
restart = createSprite(650,400);
gameOver.addImage(gameOverImage);
restart.addImage(restartImage);

gameOver.scale = 1.5;
restart.scale = 1.5;

gameOver.visible = false;
restart.visible = false;

}

function draw() {  
    
//set the background
background(galaxyImage);

//backgroundLoopSound.play();
console.log(gameState) ;

if (gameState === PLAY){

//make the player move with the mouse
player.x = World.mouseX;

//display the player's score
textSize(28);
textFont("Georgia");
stroke("red");
fill("white");
text("PLAYER SCORE: "+ score, 10, 30);

//display the number of stars
stroke("red");
fill("white");
textSize(28);
text ("stars:"+stars,10,50) ;

//make the player able to shoot at it's enemies
if (keyDown("space")) {
createBullet(player.x);
laserSound.play();
}
  
//define the scoring system
if (bulletGroup.isTouching(galaxianGroup)) {
galaxianGroup.destroyEach();
bulletGroup.destroyEach();
score = score + 4;
shootingSound.play();
}

else if (bulletGroup.isTouching(galaxian1Group)) {
galaxian1Group.destroyEach();
bulletGroup.destroyEach();
score = score + 4;
shootingSound.play();
}

if (player.isTouching(starsGroup)){
score = score+5;
stars = stars+1;
starsGroup.destroyEach();
checkPointSound.play();
}

if (player.isTouching(asteroidsGroup)){
score = score-5;
asteroidsGroup.destroyEach();
asteroidSound.play(); 
player.destroy();     
gameState = END;
}

if (bulletGroup.isTouching(starsGroup)){
score = score-5;
stars = stars - 1;
starsGroup.destroyEach();
bulletGroup.destroyEach();
}  

if (bulletGroup.isTouching(asteroidsGroup)){
score = score+5;
asteroidsGroup.destroyEach(); 
asteroidSound.play();
bulletGroup.destroyEach();
}
  
createGalaxian();
createGalaxian1();
createBullet();
spawnStars();
spawnAsteroids();  

}

else if (gameState === END){
    
gameOver.visible = true;
restart.visible = true;  

  //set each game object's velocity to zero
galaxianGroup.setVelocityYEach(0);
galaxian1Group.setVelocityYEach(0);
starsGroup.setVelocityYEach(0);
asteroidsGroup.setVelocityYEach(0);
asteroidsGroup.setVelocityXEach(0);

//make all the game objects invisible
galaxianGroup.destroyEach();
galaxian1Group.destroyEach();
starsGroup.destroyEach();
asteroidsGroup.destroyEach();
bulletGroup.destroyEach();

backgroundLoopSound.stop();

}

if (galaxianGroup.isTouching(player)){
score = score - 0;
gameState = END;
}

if(galaxian1Group.isTouching(player)){
score = score - 0;
gameState = END;
} 

if (asteroidsGroup.isTouching(player)){
score = score - 0;
gameState = END;
}     

if(mousePressedOver(restart)) {
reset();
}

//display the objects

drawSprites();

}      

 //spawn various game objects
function createGalaxian() {
if (frameCount % 50 === 0){
galaxian = createSprite(random(0,600), 0, 10, 10);
galaxian.addImage(alienShuttleImage);
galaxian.scale = 0.3;
galaxian.velocityY = 5;
galaxian.lifetime = 2000;
galaxianGroup.add(galaxian);
}
}

function createGalaxian1() {
if (frameCount % 60 ===0){
galaxian1 = createSprite(random(500,1050), 0, 10, 10);
galaxian1.addImage(alienShuttle2Image);
galaxian1.scale = 0.3;
galaxian1.velocityY = 5;
galaxian1.lifetime = 2000;
galaxian1Group.add(galaxian1);
}
}

function createBullet(x) {
bullet = createSprite(100, 100, 5, 10);
bullet.y = 460;
bullet.x = x;                                           
bullet.shapeColor = "yellow";
bullet.velocityY = -4;
bullet.lifetime = 1000;
bulletGroup.add(bullet);
}

function spawnStars(){
if (frameCount % 300 === 0){
star = createSprite(random(50,300,),50,30,30);
star.addImage(starImage);
star.scale = 0.07;
star.velocityY = random(3,5);
star.lifetime = 1000;
starsGroup.add(star);
}
}

function spawnAsteroids (){
if (frameCount % 90 === 0 ) {
asteroid = createSprite(random(100,2000),50,20,20);
asteroid.addImage(asteroidImage);
asteroid.scale  = 0.4;
asteroid.velocityY = 4;
asteroid.velocityX = -4;
asteroid.lifetime = 2000;
asteroidsGroup.add(asteroid);
}
}

function reset(){
gameState = PLAY;

gameOver.visible = false;
restart.visible = false;
player.visible = true;

stars = 0;
score = 0;
}

  
function getBgImage(){

//load the images for the background

if (gameState = PLAY){
galaxyImage = "galaxy(1).jpg";
}

backgroundImg = loadImage(galaxyImage);
}





 
  
 

   

  
 
    
 

        
          
            
        

          
          
          
        
  

 

 
















  

  




  






 
 


     
      

     
        
   
  
      

   
   
   
   
    
  

  
   
       
        
    
   
    
  
  
    
  









