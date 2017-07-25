function preload(){
  glovePic = loadImage('MOBALIB_Mascotte.png');
  ballPic = loadImage('bonus.png')
}

function setup() {
  createCanvas(700, 500);
  imageMode(CENTER)
  angleMode(DEGREES)
  rectMode(CENTER)
  textAlign(CENTER)
  textSize(16)
  smooth();
  gloveX = width/2; gloveY = height/2;
  
  gloveSpeed = 3;
  ballSpeed = 0.6;
  
  
  gloveAngle = 0;
  gloveChange();
  ballSize = 50;
  gloveSize = 50;
  ballsCaught = -1;
  newBall();
  stroke(255);
  lStroke = 255; lFill = false;
  rStroke = 255; rFill = false;
}

function draw() {
  background(theBG)
  image(glovePic, gloveX, gloveY, 150, 150)
  noFill();
  updatePos()
  image(ballPic, ballX, ballY, 50, 50)
  
  //if(keyIsDown(RIGHT_ARROW)){gloveAngle -= 3; gloveChange(); rStroke = theBG; rFill = true}
  //if(keyIsDown(LEFT_ARROW)){gloveAngle += 3; gloveChange(); lStroke = theBG; lFill = true}
  gloveXChange = 0;
  gloveYChange = 0;
  if(keyIsDown(RIGHT_ARROW)){gloveXChange = gloveSpeed; rStroke = theBG; rFill = true}
  if(keyIsDown(LEFT_ARROW)){gloveXChange = -1 * gloveSpeed; lStroke = theBG; lFill = true}
  if(keyIsDown(UP_ARROW)){gloveYChange = -1 * gloveSpeed}
  if(keyIsDown(DOWN_ARROW)){gloveYChange = gloveSpeed}
  
  if(dist(gloveX, gloveY, ballX, ballY) <= (ballSize/2) + (gloveSize/2)){newBall()}
  dispBalls();
  fill(255);noStroke();text('pseudo', width/2, 450)
  noFill();stroke(255);rect(width/2,height/2,width-2,height-2);
  stroke(lStroke);if(lFill){fill(255);lStroke=color(255);lFill=false}
  rect(600, 450, 30, 30); line(610, 450, 590, 450); line(590, 450, 600, 445); line(590, 450, 600, 455);
  noFill();
  stroke(rStroke);if(rFill){fill(255);rStroke=color(255);rFill=false}
  rect(650, 450, 30, 30); line(640, 450, 660, 450); line(660, 450, 650, 445); line(660, 450, 650, 455);
}

function newBall(){
  ballSpeed += 0.2;
  ballX = random(ballSize, width-ballSize); ballY = random(ballSize, height-ballSize);
  while(dist(ballX, ballY, gloveX, gloveY) <= 200){
    ballX = random(ballSize, width-ballSize); ballY = random(ballSize, height-ballSize);
  }
  ballAngle = random(360);
  ballXChange = sin(ballAngle) * ballSpeed; ballYChange = cos(ballAngle) * ballSpeed;
  theBG = color(random(106), random(106), random(106))
  ballsCaught ++;
}

function updatePos(){
  gloveX += gloveXChange;
  gloveY += gloveYChange;
  ballX += ballXChange;
  ballY += ballYChange;
  if(gloveX > width + 50){gloveX = 0}if(gloveX < 0 - 50){gloveX = width}
  if(gloveY > height + 50){gloveY = 0}if(gloveY < 0 - 50){gloveY = height}
  if(ballX + (ballSize/2) > width || ballX - (ballSize/2) < 0){ballXChange *= -1}
  if(ballY + (ballSize/2) > height || ballY - (ballSize/2) < 0){ballYChange *= -1}
}

function dispBalls(){
  for(var i = 0; i < ballsCaught; i ++){
    image(ballPic, 20 + (i * 30), 470, 25, 25)
  }
}

function gloveChange(){
  gloveXChange = sin(gloveAngle) * gloveSpeed;
  gloveYChange = cos(gloveAngle) * gloveSpeed;
}