const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
gameRulles();
var snakeHead = new drawComponent(40, 280, "#196F3D", 40, 40);
var apple = new drawComponent(440, 280, "#C0392B", 40, 40);
var snake = [snakeHead];
var score = 0;
var highScore = sessionStorage.getItem("highScore");
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
        ctx.fillStyle = "#C0392B";
        ctx.font="100px Comic Sans MS";
        ctx.fillText("GAME OVER",50, 200);
    },
    restart : function() {
    	location.reload();
    }
}

function gameRulles() {
	this.x = 10;
	this.y = 120;
	this.lineHeight = 25;
	this.txt = "Snake - the rules of the game:\n\nThe player uses the arrow keys to move a snake around the board.\nAs the snake finds food, it eats the food, and thereby grows larger.\nThe game ends when the snake either moves off the screen or moves;\ninto itself.\nThe goal is to make the snake as large as possible before that happens.\n\n\nPress the Start button to play the game!";
	this.lines = txt.split('\n');
	ctx.font = "20px Comic Sans MS";
	for (let i = 0; i < lines.length; ++i) {
	    ctx.fillText(lines[i], x, y + (i * lineHeight));
	}
	this.img = new Image();
	img.addEventListener('load', function() {
		ctx.drawImage(img, 200, 400, 250, 180);
	}, false);
	img.src = "myImg.png";
}

function drawComponent(x, y, color, width, height) {
	this.width = width;
	this.height = height;
	this.speedX = 0;
  	this.speedY = 0;
  	this.peviousSpeedX = 0;
  	this.peviousSpeedY = 0;
	this.x = x;
	this.y = y;
	this.update = function() {
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = "#196F3D";
		ctx.font="25px Comic Sans MS";
		ctx.fillText("Score: " + score, 0, 25);
		ctx.fillText("High Score: " + highScore, 150, 25);
		if (highScore === null) {
			sessionStorage.setItem("highScore", score);      
		} else if (score > highScore) {
			sessionStorage.setItem("highScore", score);
		}
	}
	this.newPos = function() {
	    this.x += this.speedX;
	    this.y += this.speedY;
  	}
}

function snakeHeadDirection() {
	snakeHead.peviousSpeedX = snakeHead.speedX;
	snakeHead.peviousSpeedY = snakeHead.speedY;
	if (snakeHead.x % 40 == 0 && snakeHead.y % 40 == 0) {
		if (game.key == 37 && snakeHead.speedX == 0) {
			snakeHead.speedX = -5;
			snakeHead.speedY = 0;
		} else if (game.key == 39 && snakeHead.speedX == 0) {
			snakeHead.speedX = 5;
			snakeHead.speedY = 0;
		} else if (game.key == 38 && snakeHead.speedY == 0) {
			snakeHead.speedY = -5;
			snakeHead.speedX = 0;
		} else if (game.key == 40 && snakeHead.speedY == 0) {
			snakeHead.speedY = 5;
			snakeHead.speedX = 0;
		}
	}
}

function snakeDirection(i) {
	snake[i].peviousSpeedX = snake[i].speedX;
	snake[i].peviousSpeedY = snake[i].speedY;
	if (snake[i].x % 40 == 0 && snake[i].y % 40 == 0) {
		snake[i].speedX = snake[i - 1].peviousSpeedX;
		snake[i].speedY = snake[i - 1].peviousSpeedY;
	}
}

function increaseSnake() {
	let length = snake.length;
	if (snake[length - 1].speedX > 0) {
		snake.push(new drawComponent(snake[length - 1].x - 40, snake[length - 1].y, "#28B463", 40, 40));
	} else if (snake[length - 1].speedX < 0) {
		snake.push(new drawComponent(snake[length - 1].x + 40, snake[length - 1].y, "#28B463", 40, 40));
	} else if (snake[length - 1].speedY > 0) {
		snake.push(new drawComponent(snake[length - 1].x, snake[length - 1].y - 40, "#28B463", 40, 40));
	} else if (snake[length - 1].speedY < 0) {
		snake.push(new drawComponent(snake[length - 1].x, snake[length - 1].y + 40, "#28B463", 40, 40));
	}
	snake[length].speedX = snake[length - 1].speedX;
	snake[length].speedY = snake[length - 1].speedY;
}

function updateGame() {
	game.clear();
	game.updateBoard();
	apple.update();
	snakeHead.newPos();
	snakeHead.update();
	if (snakeHead.x + 20 == apple.x + 20 && snakeHead.y + 20 == apple.y + 20) {	
		apple.x = Math.floor(Math.random() * 17) * 40;
		apple.y = Math.floor(Math.random() * 15) * 40;
		increaseSnake();
		++score;
	}
	if (snakeHead.x < 0 || snakeHead.x + snakeHead.width > c.width || snakeHead.y < 0 || snakeHead.y + snakeHead.height > c.height) {
		game.stop();
	}
	for (let i = 1; i < snake.length; ++ i) {
		if (snakeHead.x == snake[i].x && snakeHead.y == snake[i].y && snakeHead.x + snakeHead.width == snake[i].x + snake[i].width && snakeHead.y + snakeHead.height == snake[i].y + snake[i].height) {
			game.stop();
		}
		snake[i].newPos();
		snake[i].update();
		snakeDirection(i);
	}
	snakeHeadDirection();
}
