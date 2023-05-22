import Game from './game.js';
var canvas = document.getElementById('car-game');
var ctx = canvas.getContext('2d');

var game;
var home = document.getElementById('home-screen');
var playButton = document.getElementById('play-game');
playButton.addEventListener('click',function(){
  home.style.display = 'none';
  game = new Game(ctx);
  var req;
function gameLoop(){
  req = window.requestAnimationFrame(gameLoop);
  game.update();
}
gameLoop();
})

