import Bullet from './bullet.js';
import Car from './game.js';
export default function PlayerCar(game){
  var self = this;
  this.game = game;
  this.ctx = this.game.ctx;
  this.car = new Image();
  this.car.src = 'assets/yellow_car.png';
  this.xOffset = 244;
  this.yOffset = 450;
  this.score = 0;
  this.width = 62;
  this.height = 120;

  this.availableBullets = 3;


  this.update = function(){
    this.ctx.drawImage(this.car, this.xOffset, this.yOffset);
    var scoreboard = document.getElementById('score-number');
    scoreboard.innerHTML = this.score;

  }
  

  this.changeLaneLeft = function(){
    if(this.xOffset > 111){
      this.xOffset -= 134;
    }
  }

  this.changeLaneRight = function(){
    if(this.xOffset < 378){
      this.xOffset += 134;
    }
  }

  this.fireBullet = function(){
    if(this.availableBullets > 0){
      this.game.bullets.push(new Bullet(this, this.xOffset + 25, this.yOffset));
      this.availableBullets -= 1;
    }
    else return;

  }

  document.addEventListener('keydown',function(ev){
    if(ev.keyCode == 37){
      self.changeLaneLeft();
    }
    else if(ev.keyCode == 39){
      self.changeLaneRight();
    }
    else if(ev.keyCode == 38){
      self.fireBullet();
    }
  });

}