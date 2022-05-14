var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var snake = new drawComponent(40, 280, "green", 40, 40);
var apple = new drawComponent(441, 281, "red", 38, 38);
var directionX = 0;
var directionY = 0;
var game = {
	start : function() {
		this.updateBoard = function() {
			for (let row = 1; row <= 17; ++row) {
				for (let column = 1; column <= 15; ++column) {
			    	if (row % 2 !== 0 && column % 2 === 0 || row % 2 === 0 && column % 2 !== 0) {
			        	ctx.fillStyle = "#A9A9A9";
						ctx.fillRect((row - 1) * 40, (column - 1) * 40, 40, 40);
			        }
			    }
			}
		}
		this.interval = setInterval(updateGame, 20);
		window.addEventListener('keydown', function (e) {
			game.key = e.keyCode;
		})
	},
	clear : function() {ctx.clearRect(0, 0, c.width, c.height);
  	},
  	stop : function() {
        clearInterval(this.interval);
    }
}
game.start();

function drawComponent(x, y, color, width, height) {
	this.width = width;
	this.height = height;
	this.speedX = 0;
  	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.update = function() {
	  ctx.fillStyle = color;
	  ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	this.newPos = function() {
	    this.x += this.speedX;
	    this.y += this.speedY;
  	}
	
function snakeDirection() {
	if (snake.x % 40 == 0 && snake.y % 40 == 0) {
		if (game.key == 37 && directionX == 0) {
			directionX = -5;
			directionY = 0;
		} else if (game.key == 39 && directionX == 0) {
			directionX = 5;
			directionY = 0;
		} else if (game.key == 38 && directionY == 0) {
			directionY = -5;
			directionX = 0;
		} else if (game.key == 40 && directionY == 0) {
			directionY = 5;
			directionX = 0;
		}
	}
	snake.speedX = directionX;
	snake.speedY = directionY;
}
	
function updateGame() {
	game.clear();
	game.updateBoard();
	apple.update();
	snake.newPos();
	snake.update();
	if (snake.x < 0 || snake.x + snake.width > c.width || snake.y < 0 || snake.y + snake.height > c.height) {
		game.stop();
	}
	snake.speedX = 0;
	snake.speedY = 0;
	snakeDirection();
}
