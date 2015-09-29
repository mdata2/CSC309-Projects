
/** Canvas **/
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
context.font = "15px Arial";
context.fillText("Score:",300,50);
context.fillText("x sec:",20,50);
context.fillText("| |",180,50);

/** place the food randomly on the table **/
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 70;

context.beginPath();
context.arc(100,150,5,0,2*Math.PI);
context.fillStyle = 'gray';
context.fill;
context.lineWidth = 1;
context.stroke();

/** Draw bugs **/