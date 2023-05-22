export default function Highway(game){
  this.game = game;
  this.ctx = this.game.ctx;
  this.roadYOffset = -223;
  this.road = new Image();
  this.road.src = 'assets/road.png';
  this.dy = 10;

  this.update = function(){
    if(this.roadYOffset >= 0){
      this.roadYOffset = -223;
    }
    this.ctx.drawImage(this.road, 0, this.roadYOffset, 550, 223);
    this.ctx.drawImage(this.road, 0, this.roadYOffset + 223, 550, 223);
    this.ctx.drawImage(this.road, 0, this.roadYOffset + 446, 550, 223);
    this.ctx.drawImage(this.road, 0, this.roadYOffset + 669, 550, 223); 
    
    this.roadYOffset += this.dy;
  }
}