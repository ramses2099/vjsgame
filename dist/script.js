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
const drawImage = (image, x, y, w, h) => {
    ctx.drawImage(image, x, y, w, h);
};
const moveTo = (x, y) => {
    ctx.moveTo(x, y);
};
const translate = (x, y) => {
    ctx.translate(x, y);
};
const rotate = (angle) => {
    ctx.rotate(angle);
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
const strokeText = (text, x, y) => {
    ctx.strokeText(text, x, y);
};
const beginPath = () => {
    ctx.beginPath();
};
const closePath = () => {
    ctx.closePath();
};
//=================Math==========================
const min = (nums1, nums2) => {
    return Math.min(nums1, nums2);
};
const max = (nums1, nums2) => {
    return Math.max(nums1, nums2);
};
const ceil = (num) => {
    return Math.ceil(num);
};
const floor = (num) => {
    return Math.floor(num);
};
const abs = (num) => {
    return Math.abs(num);
};
const exp = (num) => {
    return Math.exp(num);
};
const pow = (base, exp) => {
    return Math.pow(base, exp);
};
const dist = (p1, p2) => {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
};
const constrain = (val, min, max) => {
    return Math.min(Math.max(val, min), max);
};
const mag = (p1) => {
    return Math.sqrt(p1.x ** 2 + p1.y ** 2);
};
const random = (n) => {
    return Math.floor(Math.random() * n);
};
//=================Math=================================================
//=================Vec2=================================================
class Vect2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
    }
    sub(v) {
        this.x = this.x - v.x;
        this.y = this.y - v.y;
    }
    mult(n) {
        this.x = this.x * n;
        this.y = this.y * n;
    }
    div(n) {
        this.x = this.x / n;
        this.y = this.y / n;
    }
    dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    cross(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    }
    lerp(v1, n) {
        const clamp = Math.max(0, Math.min(1, n));
        this.x = this.x + (v1.x - this.x) * clamp;
        this.y = this.y + (v1.y - this.y) * clamp;
    }
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        let m = this.mag();
        if (m > 0) {
            this.div(m);
        }
    }
    limit(max) {
        if (this.mag() > max) {
            this.normalize();
            this.mult(max);
        }
    }
    heading(inDegress = false) {
        let angle = Math.atan2(this.y, this.x);
        if (angle < 0) {
            angle += 2 * Math.PI;
        }
        if (inDegress) {
            return angle * (180 / Math.PI);
        }
        return angle;
    }
    copy() {
        return new Vect2(this.x, this.y);
    }
    equals(v1) {
        return this.x === v1.x && this.y === v1.y;
    }
    ToString() {
        return `<x:${this.x}, y:${this.y}>`;
    }
    static random2D() {
        const x = Math.floor(Math.random());
        const y = Math.floor(Math.random());
        return new Vect2(x, y);
    }
    static add(v1, v2) {
        const x = v1.x + v2.x;
        const y = v1.y + v2.y;
        return new Vect2(x, y);
    }
    static sub(v1, v2) {
        const x = v1.x - v2.x;
        const y = v1.y - v2.y;
        return new Vect2(x, y);
    }
    static mult(v1, n) {
        const x = v1.x * n;
        const y = v1.y * n;
        return new Vect2(x, y);
    }
    static div(v1, n) {
        const x = v1.x / n;
        const y = v1.y / n;
        return new Vect2(x, y);
    }
    static lerp(v1, v2, n) {
        const clamp = Math.max(0, Math.min(1, n));
        const x = v1.x + (v2.x - v1.x) * clamp;
        const y = v1.y + (v2.y - v1.y) * clamp;
        return new Vect2(x, y);
    }
    static equals(v1, v2) {
        return v1.x === v2.x && v1.y === v2.y;
    }
    static ToString(v1) {
        return `<x:${v1.x}, y:${v1.y}>`;
    }
}
const createVector = (x = 0, y = 0) => {
    return new Vect2(x, y);
};
//=================Vec2=================================================
//=================Test=================================================
let v0 = createVector(1, 1);
let v1 = createVector(3, 3);
let r = v0.heading(true);
log(r.toString());
const image = new Image(60, 45); // Using optional size for image
image.onload = drawImageActualSize; // Draw when image has loaded
// Load an image of intrinsic size 300x227 in CSS pixels
image.src = 'img/test.jpg';
function drawImageActualSize() {
    // Use the intrinsic size of image in CSS pixels for the canvas element
    drawImage(image, 70, 450, 45, 45);
}
//=================Test=================================================
//======================Input Event=====================================
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
    // beginPath()
    // ellipse(100, 300, 50, 75, Math.PI / 4, 0, 2 * Math.PI)
    // stroke()
    // closePath()
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
    drawImage(image, 70, 400, 45, 45);
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