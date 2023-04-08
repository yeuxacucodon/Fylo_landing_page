const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.onload = () => {
	gameLoop();
};

let cw = window.innerWidth;
let ch = window.innerHeight;
canvas.width = cw;
canvas.height = ch;

function gameLoop() {
	setInterval(show, 1000 / 10);
}

function show() {
	update();
	draw();
}

// rome-ignore format: easier to read
window.addEventListener("resize", () => {
		cw = window.innerWidth;
		ch = window.innerHeight;
		canvas.width = cw;
		canvas.height = ch;
	},
	true,
);

function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	snake.move();
	eatFood();
}

function eatFood() {
	// rome-ignore format: easier to read
	if (snake.tail[snake.tail.length - 1].x === food.x && snake.tail[snake.tail.length - 1].y === food.y) {
		snake.tail[snake.tail.length] = { x: food.x, y: food.y };
		food = new Food();
	}
}

function draw() {
	createRect(0, 0, canvas.width, canvas.height, "black");
	createRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < snake.tail.length; i++) {
		// rome-ignore format: easier to read
		createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size - 5, "red");
	}
	createRect(food.x, food.y, food.size, food.size, food.color);
}

function createRect(x, y, width, height, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
}

window.addEventListener("keydown", (event) => {
	setTimeout(() => {
		if (event.key === "ArrowLeft" && snake.rotateX !== 1) {
			snake.rotateX = -1;
			snake.rotateY = 0;
		} else if (event.key === "ArrowRight" && snake.rotateX !== -1) {
			snake.rotateX = 1;
			snake.rotateY = 0;
		} else if (event.key === "ArrowUp" && snake.rotateY !== 1) {
			snake.rotateX = 0;
			snake.rotateY = -1;
		} else if (event.key === "ArrowDown" && snake.rotateY !== -1) {
			snake.rotateX = 0;
			snake.rotateY = 1;
		}
	}, 1);
});

class Snake {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.tail = [{ x: this.x, y: this.y }];
		this.rotateX = 0;
		this.rotateY = 1;
	}

	move() {
		let newRect;
		if (this.rotateX === 1) {
			newRect = {
				x: this.tail[this.tail.length - 1].x + this.size,
				y: this.tail[this.tail.length - 1].y,
			};
		} else if (this.rotateX === -1) {
			newRect = {
				x: this.tail[this.tail.length - 1].x - this.size,
				y: this.tail[this.tail.length - 1].y,
			};
		} else if (this.rotateY === 1) {
			newRect = {
				x: this.tail[this.tail.length - 1].x,
				y: this.tail[this.tail.length - 1].y + this.size,
			};
		} else if (this.rotateY === -1) {
			newRect = {
				x: this.tail[this.tail.length - 1].x,
				y: this.tail[this.tail.length - 1].y - this.size,
			};
		}
		this.tail.shift();
		this.tail.push(newRect);
	}
}

class Food {
	constructor() {
		let isTouching;
		while (true) {
			isTouching = false;
			// rome-ignore format: easier to read
			this.x = Math.floor((Math.random() * canvas.width) / snake.size) * snake.size;
			// rome-ignore format: easier to read
			this.y = Math.floor((Math.random() * canvas.height) / snake.size) * snake.size;

			for (let i = 0; i < snake.tail.length; ++i) {
				if (this.x === snake.tail[i].x && this.y === snake.tail[i].y) {
					isTouching = true;
				}
			}

			this.color = "pink";
			this.size = snake.size;

			if (!isTouching) {
				break;
			}
		}
	}
}

const snake = new Snake(20, 20, 20);
let food = new Food();
