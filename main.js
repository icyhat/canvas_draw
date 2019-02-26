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
let pen_color = "red";
let line_size = 5;

const sieze_map = {
    big : "10",
    small : "5",
}
const RADIUS = 1;
let last_point = [undefined, undefined];

// init
ctx.fillStyle = "white"
ctx.fillRect(0,0, draw.width, draw.height)
// touchable check

function move (x, y) {
    if(is_paint) {
        if (is_erase) {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 20;
        } else {
            ctx.strokeStyle = pen_color;
            ctx.lineWidth = line_size;
        }
        drawLine(last_point[0], last_point[1],  x, y)
        last_point = [x, y]
    }
}
function start (x, y) {
    is_paint = true;
    last_point = [x, y];
    if(is_erase) {
        ctx.clearRect(x, y, 10, 10);
    }
}
if (document.body.ontouchstart !== undefined) {
    draw.ontouchstart = function (e) {
        const [x, y] = [e.touches["0"].clientX, e.touches["0"].clientY];
        start(x, y)
    }
    draw.ontouchmove = function (e) {
        const [x, y] = [e.touches["0"].clientX, e.touches["0"].clientY];
        move(x, y);
    }
    draw.ontouchend = function () {
        is_paint = false;
    }
} else {
    draw.onmousedown = function(e) {
        const [x, y] = [e.clientX, e.clientY];
        start(x, y)
    }
    draw.onmousemove = function(e) {
        const [x, y] = [e.clientX, e.clientY];
        move(x, y);
    }
    draw.onmouseup = function(e) {
            is_paint = false;
    }
}

// pen and eraser

pen.onclick = function () {
    is_erase = false;
    pen.classList.add("active");
    eraser.classList.remove("active");
}
eraser.onclick = function () {
    is_erase = true;
    eraser.classList.add("active");
    pen.classList.remove("active");
}
reset.onclick = function () {
    ctx.clearRect(0, 0, draw.width, draw.height);
}
download.onclick = function () {
    const url = draw.toDataURL("image/jpg")
    const a = document.createElement("a")
    document.body.appendChild(a)
    a.href = url
    a.download = "my_darw"
    a.click()
}
// color selection

const colors_ol = document.querySelector(".colors");
const colors_list = Array.prototype.slice.call(colors_ol["children"], [0, colors_ol["children"].length]);

colors_list.forEach((li_click)=>{  
    li_click.onclick = function (e) {
        pen_color = li_click.id;
        // ensure only one color selected
        colors_list.forEach((li)=>{
            if (li==li_click) {
                li.classList.add("active");
            } else {
                li.classList.remove("active");
            }
        })
    }
})

// line events
const sizes_ol = document.querySelector(".sizes");
const sizes_list = Array.prototype.slice.call(sizes_ol["children"], [0, sizes_ol["children"].length]);

sizes_list.forEach((li_click)=>{
    li_click.onclick = function (e) {
        line_size = sieze_map[li_click.id];
    
        sizes_list.forEach((li) => {
            if (li==li_click) {
                li.classList.add("active");
            } else {
                li.classList.remove("active");
            }
        })
    }
})

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

