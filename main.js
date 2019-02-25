const draw = document.getElementById("draw");
const ctx = draw.getContext("2d");

let is_paint = false;
const RADIUS = 1;
let last_point = [undefined, undefined];

draw.onmousedown = function(e) {
    is_paint = true;
    last_point = [e.clientX, e.clientY];
    drawCircle(x, y);
}
draw.onmousemove = function(e) {
    if(is_paint) {
        const [x, y] = [e.clientX, e.clientY];
        drawCircle(x, y);
        drawLine(last_point[0], last_point[1],  x, y)
        last_point = [x, y]
    }
}
draw.onmouseup = function(e) {
    is_paint = false;
}
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(x1, y1);
    ctx.lineWidth = 5;
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
function drawCircle(x, y, radius=RADIUS) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.fill();
}