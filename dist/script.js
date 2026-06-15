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
class IObject {
    pos;
    vec;
    acc;
    r;
    speed;
    friction;
    elasticity;
    mass;
    inv_mass;
    constructor(pos, vec, acc, r = 25, mass = 0, speed = 1) {
        this.pos = pos;
        this.vec = vec;
        this.acc = acc;
        this.r = r;
        this.mass = mass;
        if (this.mass == 0) {
            this.inv_mass = 0;
        }
        else {
            this.inv_mass = 1 / this.mass;
        }
        this.speed = speed;
        this.friction = 0.05;
        this.elasticity = 1;
    }
}
class Vect2d {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vect2d(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vect2d(this.x - v.x, this.y - v.y);
    }
    mult(n) {
        return new Vect2d(this.x * n, this.y * n);
    }
    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    unit() {
        if (this.mag() === 0) {
            return new Vect2d();
        }
        else {
            return new Vect2d(this.x / this.mag(), this.y / this.mag());
        }
    }
    normal() {
        return new Vect2d(-this.y, this.x).unit();
    }
    show() {
        return `{x:${this.x},y:${this.y}}`;
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
}
class Player extends IObject {
    r;
    constructor(pos, r, mass) {
        super(pos, new Vect2d(0, 0), new Vect2d(0, 0), r, mass);
        this.r = r;
    }
    update(dt) {
        if (LEFT) {
            this.acc.x -= this.speed;
        }
        if (RIGHT) {
            this.acc.x += this.speed;
        }
        if (UP) {
            this.acc.y -= this.speed;
        }
        if (DOWN) {
            this.acc.y += this.speed;
        }
        if (!DOWN && !UP) {
            this.acc.y = 0;
        }
        //
        if (!RIGHT && !LEFT) {
            this.acc.x = 0;
        }
        this.vec = this.vec.add(this.acc);
        this.vec = this.vec.mult(1 - this.friction);
        this.pos.x += this.vec.x * dt;
        this.pos.y += this.vec.y * dt;
    }
    draw(ctx) {
        ctx.fillStyle = '#2d889c';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();
    }
    displayDirection(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x + this.acc.x * 2, this.pos.y + this.acc.y * 2);
        ctx.strokeStyle = '#0508a8';
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x + this.vec.x * 2, this.pos.y + this.vec.y * 2);
        ctx.strokeStyle = '#eb1e24';
        ctx.stroke();
    }
}
class Ball extends IObject {
    constructor(pos, r, mass) {
        super(pos, new Vect2d(0, 0), new Vect2d(0, 0), r, mass);
    }
    update(dt) {
        this.acc = this.acc.unit().mult(this.speed);
        this.vec = this.vec.add(this.acc);
        this.vec = this.vec.mult(1 - this.friction);
        this.pos = this.pos.add(this.vec);
    }
    draw(ctx) {
        ctx.fillStyle = '#ec2f0e';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}
class Wall {
    start;
    end;
    constructor(x1, y1, x2, y2, wall) {
        this.start = new Vect2d(x1, y1);
        this.end = new Vect2d(x2, y2);
        wall.push(this);
    }
    //
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#fff';
        ctx.stroke();
    }
    //
    wallUnit() {
        return this.end.sub(this.start).unit();
    }
}
class CollisionDetect {
    static distanceVector(pos1, pos2) {
        return pos1.sub(pos2).mag();
    }
    static collision_det_bb(b1, b2) {
        let dist = b2.pos.sub(b1.pos).mag();
        let rsum = b2.r + b2.r;
        if (rsum >= dist) {
            return true;
        }
        return false;
    }
    //
    static pen_res_bb(b1, b2) {
        let dist = b1.pos.sub(b2.pos);
        let pen_depth = b1.r + b2.r - dist.mag();
        let pen_res = dist.unit().mult(pen_depth / (b1.inv_mass + b2.inv_mass));
        b1.pos = b1.pos.add(pen_res.mult(b1.inv_mass));
        b2.pos = b2.pos.add(pen_res.mult(-b2.inv_mass));
    }
    //
    static coll_res_bb(b1, b2) {
        let normal = b1.pos.sub(b2.pos).unit();
        let relVel = b1.vec.sub(b2.vec);
        let sepVel = Vect2d.dot(relVel, normal);
        let new_sepVel = -sepVel * Math.min(b1.elasticity, b2.elasticity);
        let vsep_diff = new_sepVel - sepVel;
        let impulse = vsep_diff / (b1.inv_mass + b2.inv_mass);
        let impulseVec = normal.mult(impulse);
        b1.vec = b1.vec.add(impulseVec.mult(b1.inv_mass));
        b2.vec = b2.vec.add(impulseVec.mult(-b2.inv_mass));
    }
    //
    static clossestPointBW(b1, w1) {
        let ballToWallStart = w1.start.sub(b1.pos);
        if (Vect2d.dot(w1.wallUnit(), ballToWallStart) > 0) {
            return w1.start;
        }
        let wallEndToBall = b1.pos.sub(w1.end);
        if (Vect2d.dot(w1.wallUnit(), wallEndToBall) > 0) {
            return w1.end;
        }
        let closestDist = Vect2d.dot(w1.wallUnit(), ballToWallStart);
        let closestVect = w1.wallUnit().mult(closestDist);
        return w1.start.sub(closestVect);
    }
    //
    static coll_det_bw(b1, w1) {
        let ballToClosest = CollisionDetect.clossestPointBW(b1, w1).sub(b1.pos);
        if (ballToClosest.mag() <= b1.r) {
            return true;
        }
        return false;
    }
    //
    static pen_res_bw(b1, w1) {
        let penVect = b1.pos.sub(CollisionDetect.clossestPointBW(b1, w1));
        b1.pos = b1.pos.add(penVect.unit().mult(b1.r - penVect.mag()));
    }
    //
    static coll_res_bw(b1, w1) {
        let normal = b1.pos.sub(CollisionDetect.clossestPointBW(b1, w1)).unit();
        let sepVel = Vect2d.dot(b1.vec, normal);
        let new_sepVel = -sepVel * b1.elasticity;
        let vsep_diff = sepVel - new_sepVel;
        b1.vec = b1.vec.add(normal.mult(-vsep_diff));
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
const objectArray = new Array();
const player = new Player(new Vect2d(250, 50), 15, 2);
const WALL = new Array();
const wall1 = new Wall(200, 200, 400, 300, WALL);
const edge1 = new Wall(0, 0, CANVAS_SIZE.w, 0, WALL);
const edge2 = new Wall(CANVAS_SIZE.w, 0, CANVAS_SIZE.w, CANVAS_SIZE.h, WALL);
const edge3 = new Wall(CANVAS_SIZE.w, CANVAS_SIZE.h, 0, CANVAS_SIZE.h, WALL);
const edge4 = new Wall(0, CANVAS_SIZE.h, 0, 0, WALL);
/*--
for (let i = 0; i < 10; i++) {
  let x = Helper.randInt(100, 500)
  let y = Helper.randInt(50, 400)
  let r = Helper.randInt(10, 30)
  let m = Helper.randInt(0, 10)
  const other = new Ball(new Vect2d(x, y), r, m)
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
    // draw object
    for (const o of objectArray) {
        o.draw(ctx);
        let dv = CollisionDetect.distanceVector(o.pos, player.pos);
        let text = `Distances vec ${dv.toFixed(2)}`;
        //drawText(text, new Vect2d(510, 50))
    }
    //
    WALL.forEach(w => {
        w.draw(ctx);
    });
    //direction player
    player.draw(ctx);
    player.displayDirection(ctx);
};
const updateObject = (deltatime) => {
    for (const o of objectArray) {
        //collision
        if (CollisionDetect.collision_det_bb(o, player)) {
            CollisionDetect.pen_res_bb(o, player);
            CollisionDetect.coll_res_bb(o, player);
        }
        o.update(deltatime);
    }
    player.update(deltatime);
    //Collition with walls
    WALL.forEach(w => {
        if (CollisionDetect.coll_det_bw(player, w)) {
            CollisionDetect.pen_res_bw(player, w);
            CollisionDetect.coll_res_bw(player, w);
        }
    });
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
    // Render Messages
    drawText(new Vect2d(250, 50));
    requestAnimationFrame(animateloop);
};
requestAnimationFrame(animateloop);
export {};
//# sourceMappingURL=script.js.map