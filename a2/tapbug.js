var 
canvas,
ctx,
EMPTY = 0,
BUG = 1,
FRUIT = 2,
COLS = 26,
ROWS = 26,
countdown,
score;

/**
// game status information
countdown=0;
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");


ctx.moveTo(0, 65);
ctx.lineTo(500, 65);
ctx.strokeStyle = "black";
ctx.stroke();

ctx.font = "12px Arial";
ctx.fillText("Score:",300,40);
ctx.fillText(countdown + " sec",20,40);


//drawing bugs
var path=new Path2D();

//Bug drawing
path.arc(60,105,5,0,Math.PI*2,true);  // Left eye
path.moveTo(65,105);
path.arc(70,105,5,0,Math.PI*2,true);  // Right eye
ctx.stroke(path);
**/


grid = {
	width: null,  /* number, the number of columns */
	height: null, /* number, the number of rows */
	_grid: null,  /* Array<any>, data representation */
	/**
	 * Initiate and fill a c x r grid with the value of d
	 * @param  {any}    d default value to fill with
	 * @param  {number} c number of columns
	 * @param  {number} r number of rows
	 */
	init: function(d, c, r) {
		this.width = c;
		this.height = r;
		this._grid = [];
		for (var x=0; x < c; x++) {
			this._grid.push([]);
			for (var y=0; y < r; y++) {
				this._grid[x].push(d);
			}
		}
	},
	/**
	 * Set the value of the grid cell at (x, y)
	 * 
	 * @param {any}    val what to set
	 * @param {number} x   the x-coordinate
	 * @param {number} y   the y-coordinate
	 */
	set: function(val, x, y) {
		this._grid[x][y] = val;
	},
	/**
	 * Get the value of the cell at (x, y)
	 * 
	 * @param  {number} x the x-coordinate
	 * @param  {number} y the y-coordinate
	 * @return {any}   the value at the cell
	 */
	get: function(x, y) {
		return this._grid[x][y];
	}
}

//handle countdown
function countDown(secs, elem) {
   var element = document.getElementById(elem);
   element.innerHTML = secs;

   if (secs < 0) {
   		clearTimeout(timer);
   }

   secs--;
   var timer = setTimeout('countDown('+secs+',"'+elem+'")',1000);
}

function setFood() {
	var empty = [];
	// iterate through the grid and find all empty cells
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			if (grid.get(x, y) === EMPTY) {
				empty.push({x:x, y:y});
			}
		}
	}
	// chooses a random cell
	var randpos = empty[Math.round(Math.random()*(empty.length - 1))];
	grid.set(FRUIT, randpos.x, randpos.y);
}

/**
 * Resets and inits game objects
 */
function init() {
	score = 0;
	grid.init(EMPTY, COLS, ROWS);
	var sp = {x:Math.floor(COLS/2), y:ROWS-1};
	snake.init(UP, sp.x, sp.y);
	grid.set(SNAKE, sp.x, sp.y);
	setFood();
}


/ ** Start game **/
function main () {
//keep track of the mouse point
// place 5pcs. of food on the table
// initiate
//init();
// for updating and rendering
//loop();
	frames=0;
	canvas = document.createElement("canvas");
	canvas.width = COLS*20;
	canvas.height = ROWS*20;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	
	init();
	loop();
} 

function loop() {
	update();
	draw();
	// When ready to redraw the canvas call the loop function
	// first. Runs about 60 frames a second
	window.requestAnimationFrame(loop, canvas);
}

function update() {
	frames++;

}

function draw() {
	// calculate tile-width and -height
	var tw = canvas.width/grid.width;
	var th = canvas.height/grid.height;
	// iterate through the grid and draw all cells
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			// sets the fillstyle depending on the id of
			// each cell
			switch (grid.get(x, y)) {
				case EMPTY:
					ctx.fillStyle = "#fff";
					break;
				case SNAKE:
					ctx.fillStyle = "#0ff";
					break;
				case FRUIT:
					ctx.fillStyle = "#f00";
					break;
			}
			ctx.fillRect(x*tw, y*th, tw, th);
		}
	}
	// changes the fillstyle once more and draws the score
	// message to the canvas
	ctx.fillStyle = "#000";
	ctx.fillText("SCORE: " + score, 10, canvas.height-10);
}

main();
