export default function ObstacleCar(game, xOffset, yOffset, avatar){
  this.game = game;
  this.ctx = this.game.ctx;
  this.xOffset = xOffset;
  this.yOffset = yOffset;
  this.avatar = avatar;
  this.counted = false;
  this.width = 62;
  this.height = 120;
  this.dy = 5;
  this.update = function(){
    this.yOffset += this.dy;
    this.ctx.drawImage(this.avatar, this.xOffset, this.yOffset);
  }

}