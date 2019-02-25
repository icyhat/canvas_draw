
const draw = document.getElementById("draw");

let is_paint = false;

draw.onmousedown = function (e) {
    is_paint = true;
    const [x, y] = [e.clientX, e.clientY];
    const pen = document.createElement('div');
    pen.style = "width: 6px; height: 6px;"  +
                "background: black;" +
                "border-radius: 3px;" +
                "position: absolute; left: "+ (x-3) +"px;" + "top: " + (y-3) + "px;";
    draw.appendChild(pen);
}

draw.onmousemove = function (e) {
    if(is_paint) {
        const [x, y] = [e.clientX, e.clientY];
        const pen = document.createElement('div');
        pen.style = "width: 6px; height: 6px;"  +
                     "background: black;" +
                     "border-radius: 3px;" +
                     "position: absolute; left: "+ (x-3) +"px;" + "top: " + (y-3) + "px;";
        draw.appendChild(pen);
        console.log(x, y)
    }
}

draw.onmouseup = function (e) {
    is_paint = false;
    const [x, y] = [e.clientX, e.clientY];
    const pen = document.createElement('div');
    pen.style = "width: 6px; height: 6px;"  +
                "background: black;" +
                "border-radius: 3px;" +
                "position: absolute; left: "+ (x-3) +"px;" + "top: " + (y-3) + "px;";
    draw.appendChild(pen);
}