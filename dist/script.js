const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_SIZE = { w: 640, h: 480 };
const log = (msg) => {
    console.log(`[DEBUG] - ${msg}`);
};
//=====================VARIABLE CONST======================
let lastTime = 0;
let LEFT = false;
let RIGHT = false;
let UP = false;
let DOWN = false;
let MSG = '';
//=========================================================
class Vec2 {
    x;
    y;
    constructor(a = 0, b) {
        if (a instanceof Vec2) {
            this.x = a.x;
            this.y = a.y;
        }
        else if (b == undefined) {
            this.x = a;
            this.y = 0;
        }
        else {
            this.x = a;
            this.y = b;
        }
    }
    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }
    mult(n) {
        return new Vec2(this.x * n, this.y * n);
    }
    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    unit() {
        if (this.mag() === 0) {
            return new Vec2();
        }
        else {
            return new Vec2(this.x / this.mag(), this.y / this.mag());
        }
    }
    normal() {
        return new Vec2(-this.y, this.x).unit();
    }
    show() {
        return `{x:${this.x},y:${this.y}}`;
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
}
class Helper {
    static randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //
    static round(num, precision) {
        let fact = 10 ** precision;
        return Math.round(num * fact) / fact;
    }
}
//=========================================================
/*--
for (let i = 0; i < 10; i++) {
  let x = Helper.randInt(100, 500)
  let y = Helper.randInt(50, 400)
  let r = Helper.randInt(10, 30)
  let m = Helper.randInt(0, 10)
  const other = new Ball(new Vec2(x, y), r, m)
  objectArray.push(other)
}
--*/
//======================Input Event========================
window.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        LEFT = true;
    }
    else if (e.key === 'ArrowRight') {
        RIGHT = true;
    }
    else if (e.key === 'ArrowUp') {
        UP = true;
    }
    else if (e.key === 'ArrowDown') {
        DOWN = true;
    }
});
window.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft') {
        LEFT = false;
    }
    else if (e.key === 'ArrowRight') {
        RIGHT = false;
    }
    else if (e.key === 'ArrowUp') {
        UP = false;
    }
    else if (e.key === 'ArrowDown') {
        DOWN = false;
    }
});
//======================Input Event========================
const drawObject = () => {
    //clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE.w, CANVAS_SIZE.h);
};
const updateObject = (deltatime) => {
};
const drawText = (pos) => {
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText(MSG, pos.x, pos.y);
};
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