var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var snake = new drawSnake(65, 285, "green", 110, 30);
var	apple = new drawApple(420, 300, "red", 15, 0, 2 * Math.PI);
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
	},
	clear : function() {ctx.clearRect(snake.x, snake.y, snake.width, snake.height);
  	}
}
game.start();

function drawSnake(x, y, color, width, height) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.update = function() {
	  ctx.fillStyle = color;
	  ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

function drawApple(x, y, color, radius, startingAngle, endingAngle) {
	this.radius = radius;
	this.startingAngle = startingAngle;
	this.endingAngle = endingAngle;
	this.x = x;
	this.y = y;
	this.update = function() {
		ctx.fillStyle = color;
		ctx.arc(this.x, this.y, this.radius, this.startingAngle, endingAngle);
		ctx.fill();
	}
}

function updateGame() {
  game.clear();
  snake.x += 1;
  game.updateBoard();
  snake.update();
  apple.update(); 
}
