		var
/**
 * Constats
 */
COLS = 20,
ROWS = 30,
EMPTY = 0,
BUG = 1,
FRUIT = 2,
LEFT  = 0,
UP    = 1,
RIGHT = 2,
DOWN  = 3,

/**
 * Game objects
 */
canvas,	  /* HTMLCanvas */
ctx,	  /* CanvasRenderingContext2d */
keystate, /* Object, used for keyboard inputs */
frames,   /* number, used for animation */
count,
score,	  /* number, keep track of the player score */

/**
 * Grid datastructor, usefull in games where the game world is
 * confined in absolute sized chunks of data or information.
 * 
 * @type {Object}
 */
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
},
/**
 * The bug, works as a queue (FIFO, first in first out) of data
 * with all the current positions in the grid with the snake id
 * 
 * @type {Object}
 */


 bug = {
 	direction: null, 
	last: null,		 
	_queue: null,

	init: function(d, x, y) {
		this.direction = d;
		this._queue = [];
		this.insert(x, y);
	},
	/**
	 * Adds an element to the queue
	 * 
	 * @param  {number} x x-coordinate
	 * @param  {number} y y-coordinate
	 */
	insert: function(x, y) {
		// unshift prepends an element to an array
		this._queue.unshift({x:x, y:y});
		this.last = this._queue[0];
	},
	/**
	 * Removes and returns the first element in the queue.
	 * 
	 * @return {Object} the first element
	 */
	remove: function() {
		// pop returns the last element of an array
		return this._queue.pop();
	}

 };

/**
 * Set a food id at a random free cell in the grid
 */
function setFood() {
	var empty = [];
	// iterate through the grid and find all empty cells
	for (var x=0; x < grid.width; x++) {
		for (var y=10; y < grid.height; y++) {
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
 * Starts the game
 */
function main() {
	// create and initiate the canvas element
	canvas = document.createElement("canvas");
	canvas.width = COLS*20;
	canvas.height = ROWS*20;
	ctx = canvas.getContext("2d");

	// add the canvas element to the body of the document
	document.body.appendChild(canvas);

	// sets an base font for bigger score display
	ctx.font = "12px Helvetica";
	frames = 0;

	// intatiate game objects and starts the game loop
	init();
	loop();
}
/**
 * Resets and inits game objects
 */
function init() {
	score = 0;
	grid.init(EMPTY, COLS, ROWS);
	var sp = {x:Math.floor(COLS/2), y:5};

	bug.init(UP, sp.x, sp.y);
	grid.set(BUG, sp.x, sp.y);

	// call this five times
	setFood();
	setFood();
	setFood();
	setFood();
	setFood();
}
/**
 * The game loop function, used for game updates and rendering
 */
function loop() {
	update();
	draw();
	// When ready to redraw the canvas call the loop function
	// first. Runs about 60 frames a second
	window.requestAnimationFrame(loop, canvas);
}
/**
 * Updates the game logic
 */
function update() {
	frames++;
	// changing direction of the snake depending on which keys
	// that are pressed
}


function countDown(secs, elem) {
   count = 0;
   var element = document.getElementById(elem);
   element.innerHTML = secs;

   if (secs < 0) {
   		clearTimeout(timer);
   }

   secs--;
   var timer = setTimeout('countDown('+secs+',"'+elem+'")',1000);
}

/**
 * Render the grid to the canvas.
 */
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
				case EMPTY: //value 0
					ctx.fillStyle = "#fff";
					break;

				case BUG: //value 0
					ctx.fillStyle = "#0ff";
					break;

				case FRUIT:// value 2
					ctx.fillStyle = "#f00";
					break;
			}
			
			ctx.fillRect(x*tw, y*th, tw, th);
		}
	}
	// changes the fillstyle once more and draws the score
	// message to the canvas
	count = 0;
	ctx.fillStyle = "#000";
	ctx.fillText(count + " SEC: ", 10, 50);
	ctx.fillText("SCORE: " + score, 300, 50);
}

// start and run the game
main();