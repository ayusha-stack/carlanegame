export default function Bullet(playerCar, xOffset, yOffset){
  this.playerCar = playerCar;
  this.ctx = this.playerCar.game.ctx;
  this.bullet = new Image();
  this.bullet.src = 'assets/bullet.png';
  this.xOffset = xOffset;
  this.yOffset = yOffset;
  this.width = 9;
  this.height = 20;
  this.dy = -4;

  this.update = function(){
    this.ctx.drawImage(this.bullet, this.xOffset, this.yOffset, this.width, this.height);
    this.yOffset += this.dy;
  }
}