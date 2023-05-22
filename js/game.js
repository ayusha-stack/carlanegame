import PlayerCar from './car.js';
import Highway from './highway.js';
import ObstacleCar from './obstacle_car.js';
import Bullet from './bullet.js';
import Ammo from './ammo.js';
export default function Game(ctx){
  var self = this;
  this.ctx = ctx;
  this.playerCar = new PlayerCar(this);
  this.highway = new Highway(this);
  var self = this;
  this.obstacles = [];
  this.bullets = [];
  this.ammos = [];
  

  this.update = function(){
    this.highway.update();
    this.playerCar.update();
    for(var i = 0; i < this.obstacles.length; i++){
      this.obstacles[i].update();
      if(this.obstacles[i].yOffset > 570 && !(this.obstacles[i].counted) ){
        this.playerCar.score += 1;
        this.obstacles[i].counted = true;
      }
      if(this.obstacles[i].yOffset >= 720){
        this.obstacles.splice(i, 1);
      }
      if(this.hasCollided(this.playerCar, this.obstacles[i])){
        this.gameOver();
      }
    }


    for(var i = 0; i < this.bullets.length; i++){
      this.bullets[i].update();

      if(this.bullets[i].yOffset <= 0){
        this.bullets.splice(i,1);
      }
      for(var j = 0; j < this.obstacles.length; j++){
        if(self.hasCollided(self.bullets[i], self.obstacles[j])){
          self.obstacles.splice(j,1);
          self.bullets.splice(i,1);
        }
      }
    }

    for(var i = 0; i < this.ammos.length; i++){
    self.ammos[i].update();
      if(self.ammos[i].yOffset >= 720){
        self.ammos.splice(i,1);
        if(self.hasCollided(self.ammos[i], self.playerCar)){
          self.playerCar.availableBullets += 3;
          self.ammos.splice(i,1);
        }
    }
  }
    }
    

  var images = [

    'green_car.png',
    'police.png',
    'red_car.png'
  ];
  var lanes = [111, 244, 378];

  var lastObstacleY = 0;
  function initObstacles(){
    var lane = Math.floor(Math.random() * lanes.length);
    var xOffset = lanes[lane];
    var yOffset = (Math.random() * -100) - 80;
    yOffset = checkSeparation(lastObstacleY, yOffset);
    var avatar = new Image ();
    avatar.src = 'assets/'+ images[Math.floor(Math.random() * images.length)];
    self.obstacles.push(new ObstacleCar(self, xOffset, yOffset, avatar));
    lastObstacleY = yOffset;
  }

  function checkSeparation(lastObstacleY, newObstacleY){
    if(Math.abs(newObstacleY) - Math.abs(lastObstacleY) < 50)
    {
      return newObstacleY - 240; 
    }
    else if(Math.abs(newObstacleY) - Math.abs(lastObstacleY) < 100)
    {
      return newObstacleY - 140;
    }
    else if(Math.abs(newObstacleY) - Math.abs(lastObstacleY) < 200)
    {
      return newObstacleY - 100;
    }
    else{
      return newObstacleY;
    }
  }
  var generateObstacle = setInterval(initObstacles, 1200);

  var generateAmmo = setInterval(function(){
    var lane = Math.floor(Math.random() * lanes.length);
    var xOffset = lanes[lane];
    var yOffset = (Math.random() * -100) - 80;
    yOffset = checkSeparation(lastObstacleY, yOffset);
    self.ammos.push(new Ammo(self, xOffset, yOffset));
  },8000);

  var gameOverScreen = document.getElementById('game-over-overlay');
  this.gameOver = function(){
    this.highway.dy = 0;
    this.obstacles.forEach(function(obstacle){
      obstacle.dy = 0;
    });
    var scored = document.getElementById('scored');
    scored.innerHTML = this.playerCar.score;
    gameOverScreen.style.display = 'block';
  
  }

  this.reset = function(){
    gameOverScreen.style.display = 'none';
    this.obstacles = [];
    this.highway.dy = 10;
    this.playerCar.score = 0;
    this.playerCar.avaiableBullets = 3;

  }

  this.hasCollided = function(firstItem, secondItem){
    if(firstItem.xOffset < secondItem.xOffset + secondItem.width && 
      firstItem.xOffset + firstItem.width > secondItem.xOffset && 
      firstItem.yOffset < secondItem.yOffset + secondItem.height &&
      firstItem.yOffset + firstItem.height > secondItem.yOffset){
        return true;
      }
  }

  var restartBtn = document.getElementById('retry');
  restartBtn.onclick = function(){
    self.reset();
  }

  var increaseSpeed = setInterval(function(){
    for(var i = 0; i < self.obstacles.length; i++){
      self.obstacles[i].dy++;
    }
    self.highway.dy++;
  },2000);
}