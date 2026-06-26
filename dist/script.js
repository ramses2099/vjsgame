const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_SIZE = { w: 640, h: 480 };
const log = (msg) => {
    console.log(`[DEBUG] - ${msg}`);
};
//=================INTERFACES==========================
//=================2D Primitives==========================
const rect = (x, y, w, h) => {
    ctx.rect(x, y, w, h);
};
const line = (x, y) => {
    ctx.lineTo(x, y);
};
const ellipse = (x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) => {
    ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise);
};
const circle = (x, y, r) => {
    ctx.arc(x, y, r, 0, 2 * Math.PI);
};
const trinagle = (p1, p2, p3) => {
    // Move to the first vertex
    ctx.moveTo(p1.x, p1.y);
    // Draw lines to the second and third vertices
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
};
//=================2D Primitives==========================
const color = (r, g, b) => {
    return `rgb(${r},${g},${b})`;
};
const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};
const fill = () => {
    ctx.fill();
};
const fillColor = (color) => {
    ctx.fillStyle = color;
};
const fillRect = (x, y, w, h) => {
    ctx.fillRect(x, y, w, h);
};
const stroke = (path) => {
    if (path) {
        ctx.stroke(path);
    }
    else {
        ctx.stroke();
    }
};
const noStroke = () => {
    ctx.strokeStyle = 'rgba(1, 1, 1, 0)';
};
const strokeStyle = (color) => {
    ctx.strokeStyle = color;
};
const strokeRect = (x, y, w, h) => {
    ctx.strokeRect(x, y, w, h);
};
const lineWidth = (width) => {
    ctx.lineWidth = width;
};
const clearRect = (x, y, w, h) => {
    ctx.clearRect(x, y, w, h);
};
const moveTo = (x, y) => {
    ctx.moveTo(x, y);
};
const translate = (x, y) => {
    ctx.translate(x, y);
};
const resetTransform = () => {
    // Reset current transformation matrix to the identity matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
};
const font = (fontStyle) => {
    ctx.font = fontStyle;
};
const fillText = (text, x, y) => {
    ctx.fillText(text, x, y);
};
const beginPath = () => {
    ctx.beginPath();
};
const closePath = () => {
    ctx.closePath();
};
//======================Input Event========================
window.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
    }
    else if (e.key === 'ArrowRight') {
    }
    else if (e.key === 'ArrowUp') {
    }
    else if (e.key === 'ArrowDown') {
    }
});
window.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft') {
    }
    else if (e.key === 'ArrowRight') {
    }
    else if (e.key === 'ArrowUp') {
    }
    else if (e.key === 'ArrowDown') {
    }
});
//======================Input Event========================
const c = randomColor();
const drawObject = () => {
    //clear canvas
    clearRect(0, 0, CANVAS_SIZE.w, CANVAS_SIZE.h);
    beginPath();
    fillColor(c);
    fillRect(250, 250, 25, 25);
    strokeStyle('#fff');
    lineWidth(2);
    strokeRect(250, 250, 25, 25);
    moveTo(30, 50); // Move the pen to (30, 50)
    line(150, 100); // Draw a line to (150, 100)
    stroke();
    closePath();
    // Draw the ellipse
    beginPath();
    ellipse(100, 300, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
    stroke();
    closePath();
    beginPath();
    fillColor(c);
    circle(500, 250, 25);
    fill();
    strokeStyle('#fff');
    lineWidth(2);
    stroke();
    closePath();
    beginPath();
    fillColor('#fff');
    font('50px serif');
    fillText('Hello world', 350, 90);
    closePath();
    beginPath();
    fillColor(c);
    const p1 = { x: 150, y: 50 };
    const p2 = { x: 50, y: 200 };
    const p3 = { x: 250, y: 200 };
    trinagle(p1, p2, p3);
    fill();
    closePath();
    strokeStyle('#fff');
    lineWidth(2);
    stroke();
};
const updateObject = (deltatime) => {
    //
};
let lastTime = 0;
// animation frame loop
const animateloop = (timeStamp) => {
    // calculate the delta time
    const dt = (timeStamp - lastTime) / 1000;
    lastTime = timeStamp;
    const cappeDt = Math.min(dt, 0.16);
    // Update
    updateObject(cappeDt);
    // Render
    drawObject();
    requestAnimationFrame(animateloop);
};
requestAnimationFrame(animateloop);
export {};
//# sourceMappingURL=script.js.map