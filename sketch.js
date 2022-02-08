var bg;
var spaceShip, spaceShipImg;
var enemy1, enemy1Img, enemy1G;
var enemy2, enemy2Img, enemy2G;
var bullet1, bullet1Img, bullet1G;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  bg = loadImage("assets/space1.jpg")
  spaceShipImg = loadImage("assets/space-ship4.png");
  enemy1Img = loadImage("assets/enemy1.png");
  enemy2Img = loadImage("assets/enemy2.png");
  bullet1Img = loadImage("assets/bullet1.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  spaceShip = createSprite(width/2,height/1.25);
  spaceShip.addImage(spaceShipImg);
  spaceShip.scale=0.3;
  // spaceShip.translate(20, 20);

  // add 45 degrees rotation
  // spaceShip.rotate(45 * Math.PI / 180);
  // spaceShip.velocityX = 2;

  enemy1G=new Group();
  enemy2G=new Group();
  bullet1G=new Group();
}

function draw() {
  background(bg);

  if (gameState === PLAY) {
    // spaceShip rotates
    // giving velocity to the spaceship
    if (keyDown("left")) {
      spaceShip.x = spaceShip.x-5;
    }

    if (keyDown("right")) {
      spaceShip.x = spaceShip.x+5;
    }


    // randomly spawning the enemy
    createEnemy1();
    createEnemy2();
    // creating bullet when space key is pressed
    if(keyDown("space")){
      createBullet1();
    }
    if (bullet1G.isTouching(enemy1G)) {
      enemy1G.destroyEach();
      bullet1G.destroyEach();
    }
    if (bullet1G.isTouching(enemy2G)) {
      enemy2G.destroyEach();
      bullet1G.destroyEach();
    }
    else if (enemy1G || enemy2G.isTouching(spaceShip)) {
      
    }
  }

  drawSprites();
}

function createEnemy1() {
  if (World.frameCount % 100 == 0) {
  var enemy1 = createSprite(Math.round(random(50, width-50),40, 10, 10));
  enemy1.addImage(enemy1Img);
  enemy1.scale=0.045;
  enemy1.velocityY = 3;
  // enemy1.lifetime = 300;
  enemy1G.add(enemy1);
  }
}

function createEnemy2() {
  if (World.frameCount % 100 == 0) {
  var enemy2 = createSprite(Math.round(random(50, width-50),40, 10, 10));
  enemy2.addImage(enemy2Img);
  enemy2.scale=0.15;
  enemy2.velocityY = 3;
  // enemy2.lifetime = 300;
  enemy2G.add(enemy2);
  }
}

function createBullet1() {
  // var bullet1 = createSprite(Math.round(random()));
  bullet1= createSprite(spaceShip.y+195, width/2, 50,20)
  bullet1.y= spaceShip.y-100;
  bullet1.addImage(bullet1Img);
  bullet1.scale=0.1;
  bullet1.velocityY = -3;
  bullet1.lifetime = 300;
  bullet1G.add(bullet1);
}