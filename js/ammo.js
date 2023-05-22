export default function Ammo(game, xOffset, yOffset){
  this.game = game;
  this.ctx = this.game.ctx;
  this.ammo = new Image();
  this.ammo.src = 'assets/ammo.png';
  this.xOffset = xOffset;
  this.yOffset = yOffset;
  this.dy = 5;
  this.height = 50;
  this.width = 50;

  this.update = function(){
    this.ctx.drawImage(this.ammo, this.xOffset, this.yOffset);
    this.yOffset += this.dy;
  }
}
