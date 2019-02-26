// init canvas
const draw = document.getElementById("draw");
const ctx = draw.getContext("2d");

// auto-update canvas size
updateSize();
window.onresize = function() {
    updateSize();
}
function updateSize() {
    const CANVAS_WIDTH = document.documentElement.clientWidth;
    const CANVAS_HEIGHT = document.documentElement.clientHeight;
    draw.width = CANVAS_WIDTH;
    draw.height = CANVAS_HEIGHT;
}

//  draw canvas
let is_paint = false;
let is_erase = false;

const RADIUS = 1;
let last_point = [undefined, undefined];

// touchable check
if (document.body.ontouchstart !== undefined) {
    
    draw.ontouchstart = function (e) {
        const [x, y] = [e.touches["0"].clientX, e.touches["0"].clientY];
        is_paint = true;
        last_point = [x, y];
        if(is_erase) {
            ctx.clearRect(x, y, 10, 10);
        }
    }
    draw.ontouchmove = function (e) {
        const [x, y] = [e.touches["0"].clientX, e.touches["0"].clientY];
        if(is_paint) {
            if (is_erase) {
                ctx.strokeStyle = "#E4B871";
                ctx.lineWidth = 20;
            } else {
                ctx.strokeStyle = "black";
                ctx.lineWidth = 5;
            }
            drawLine(last_point[0], last_point[1],  x, y)
            last_point = [x, y]
        }
    }
    draw.ontouchend = function () {
        is_paint = false;
    }
} else {
    draw.onmousedown = function(e) {
        const [x, y] = [e.clientX, e.clientY];
        is_paint = true;
        last_point = [x, y];
        if(is_erase) {
            ctx.clearRect(x, y, 10, 10);
        }
    }
    draw.onmousemove = function(e) {
        const [x, y] = [e.clientX, e.clientY];
        if(is_paint) {
            if (is_erase) {
                ctx.strokeStyle = "#E4B871";
                ctx.lineWidth = 20;
            } else {
                ctx.strokeStyle = "black";
                ctx.lineWidth = 5;
            }
            drawLine(last_point[0], last_point[1],  x, y)
            last_point = [x, y]
        }
    }
    draw.onmouseup = function(e) {
            is_paint = false;
    }
}

// eraser button
eraser.onclick = function(e) {
    is_erase = true;
    actions.className = "actions eraser"
}
pen.onclick = function(e) {
    is_erase = false;
    actions.className = "actions"

}
// line
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
// function drawCircle(x, y, radius=RADIUS) {
//     ctx.beginPath();
//     ctx.fillStyle = "black";
//     ctx.arc(x,y,radius,0,Math.PI*2);
//     ctx.fill();
// }

