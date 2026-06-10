//=======================================================================================================================//
const CANVAS_SIZE = { w: 800, h: 600 };
const DEBUG = true;
const log = (msg) => {
    console.log(`[DEV] ${msg}`);
};
var SHAPE;
(function (SHAPE) {
    SHAPE[SHAPE["CIRCLE"] = 0] = "CIRCLE";
    SHAPE[SHAPE["SQUARE"] = 1] = "SQUARE";
})(SHAPE || (SHAPE = {}));
class Vector {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /**
     * Adds a vector to this vector
     *
     * @param v - The Vector.
     *
     */
    add(v) {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
    }
    //
    /**
     * Subtracts a vector from this vector
     *
     * @param v - The Vector.
     *
     */
    sub(v) {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
    }
    //
    /**
     * Scales this vector with multiplication
     *
     * @param n - The number.
     *
     */
    mult(n) {
        this.x = this.x * n;
        this.y = this.y * n;
    }
    //
    /**
     * Scales this vector with division
     *
     * @param n - The number.
     *
     */
    div(n) {
        this.x = this.x / n;
        this.y = this.y / n;
    }
    //
    /**
     * Returns the magnitude of this vector
     *
     * @param n - The number.
     * @returns number
     *
     */
    mag() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    //
    /**
     * Returns the magnitude of this vector
     *
     * @param n - The number.
     * @returns number
     *
     */
    lenghtSq() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }
    //
    /**
     * Normalizes this vector to a unit length of 1
     *
     */
    normalize() {
        let m = this.mag();
        if (m > 0) {
            this.div(m);
        }
    }
    //
    /**
     * Limits the magnitude of this vector
     *
     * @param max - The number.
     *
     * @returns number
     */
    limit(max) {
        const length = this.mag();
        if (length > max && length > 0) {
            this.x = (this.x / length) * max;
            this.y = (this.y / length) * max;
        }
    }
    //
    /**
     * Returns the Euclidean distance between two vectors (considered as points)
     *
     * @param v - The Vector.
     *
     */
    dist(v) {
        return Math.hypot(v.x - this.x, v.y - this.y);
    }
    //
    /**
     * Returns the dot product of two vectors
     *
     * @param v - The Vector.
     * @returns number
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    //
    /**
     * Returns the copy of the vector
     *
     * @return v - The Vector.
     *
     */
    copy() {
        return new Vector(this.x, this.y);
    }
    //
    /**
     * Returns a random 2D vector
     *
     * @return v - The Vector.
     *
     */
    random2D() {
        const angle = Math.random() * Math.PI * 2;
        return new Vector(Math.cos(angle), Math.sin(angle));
    }
    //
    /**
     * Static Subtracts a vector from this vector
     *
     * @param v - The Vector.
     *
     */
    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
    //
    /**
     * Static Subtracts a vector from this vector
     *
     * @param v - The Vector.
     *
     */
    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
    //
    /**
     * Static Subtracts a vector from this vector
     *
     * @param v - The Vector.
     *
     */
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    //
    static mult(v1, n) {
        return new Vector(v1.x * n, v1.y * n);
    }
    //
    /**
     * Returns a random 2D vector
     *
     * @return v - The Vector.
     *
     */
    static random2D(min, max) {
        let minCeiled = Math.ceil(min);
        let maxFloored = Math.floor(max);
        let x = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
        let y = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
        return new Vector(x, y);
    }
    //
    /**
     * Vector to string
     *
     * @return v - The Vector to strig representation.
     *
     */
    toString() {
        return `{x: ${this.x}, y: ${this.y}}`;
    }
}
class Body {
    position;
    velocity;
    acceleration;
    size;
    shape;
    radius;
    isStatic;
    constructor() {
        this.position = new Vector();
        this.size = { w: 32, h: 32 };
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.shape = SHAPE.CIRCLE;
        this.radius = 25;
        this.isStatic = false;
    }
    applyForce(force) {
        this.acceleration.add(force);
    }
}
class CollisionSystem {
    static checkCircleCollision(a, b) {
        const ax = a.position.x + a.size.w / 2;
        const ay = a.position.y + a.size.h / 2;
        const bx = b.position.x + b.size.w / 2;
        const by = b.position.y + b.size.h / 2;
        const dx = ax - bx;
        const dy = ay - by;
        const distSq = dx * dx + dy * dy;
        const radSum = a.radius + b.radius;
        return distSq < radSum * radSum;
    }
    //
    static checkCircleCollisionBoundaries(body, boundaries) {
        if (body.isStatic)
            return;
        if (body.shape == SHAPE.CIRCLE) {
            if (body.position.x > boundaries.w - body.radius ||
                body.position.x <= body.radius) {
                body.velocity.x *= -1;
            }
            //
            if (body.position.y > boundaries.h - body.radius ||
                body.position.y <= body.radius) {
                body.velocity.y *= -1;
            }
        }
        else if (body.shape == SHAPE.SQUARE) {
            if (body.position.x > boundaries.w - body.size.w ||
                body.position.x <= boundaries.x) {
                body.velocity.x *= -1;
            }
            //
            if (body.position.y > boundaries.h - body.size.h ||
                body.position.y <= boundaries.y) {
                body.velocity.y *= -1;
            }
        }
    }
}
class Player {
    body;
    lineWidth;
    color;
    strokeStyle;
    constructor(x, y) {
        this.body = new Body();
        this.body.position = new Vector(x, y);
        this.color = 'rgb(50, 66, 241)';
        this.lineWidth = 5;
        this.strokeStyle = 'rgb(243, 243, 248)';
    }
    update(delataTime) {
        if (this.body.isStatic)
            return;
        this.body.acceleration.mult(delataTime);
        this.body.velocity.add(this.body.acceleration);
        this.body.position.add(this.body.velocity);
    }
    draw(ctx) {
        if (this.body.shape == SHAPE.CIRCLE) {
            if (ctx != null) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.body.position.x, this.body.position.y, this.body.radius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.strokeStyle = this.strokeStyle;
                ctx.lineWidth = this.lineWidth;
                ctx.stroke();
            }
        }
        else if (this.body.shape == SHAPE.SQUARE) {
            if (ctx != null) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.body.position.x, this.body.position.y, this.body.size.w, this.body.size.h);
                ctx.strokeStyle = this.strokeStyle;
                ctx.lineWidth = this.lineWidth;
                ctx.strokeRect(this.body.position.x, this.body.position.y, this.body.size.w, this.body.size.h);
            }
        }
    }
}
class Enemy {
    body;
    lineWidth;
    color;
    strokeStyle;
    constructor(x, y) {
        this.body = new Body();
        this.body.position = new Vector(x, y);
        this.color = this.getRandomColor();
        this.lineWidth = 5;
        this.strokeStyle = 'rgb(243, 243, 248)';
    }
    getRandomColor() {
        const color = {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };
        return `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
    }
    update(delataTime) {
        if (this.body.isStatic)
            return;
        this.body.acceleration.mult(delataTime);
        this.body.velocity.add(this.body.acceleration);
        this.body.position.add(this.body.velocity);
    }
    draw(ctx) {
        if (this.body.shape == SHAPE.CIRCLE) {
            if (ctx != null) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.body.position.x, this.body.position.y, this.body.radius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.strokeStyle = this.strokeStyle;
                ctx.lineWidth = this.lineWidth;
                ctx.stroke();
            }
        }
        else if (this.body.shape == SHAPE.SQUARE) {
            if (ctx != null) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.body.position.x, this.body.position.y, this.body.size.w, this.body.size.h);
                ctx.strokeStyle = this.strokeStyle;
                ctx.lineWidth = this.lineWidth;
                ctx.strokeRect(this.body.position.x, this.body.position.y, this.body.size.w, this.body.size.h);
            }
        }
    }
}
class World {
    width;
    height;
    player;
    enemies;
    constructor(w, h) {
        this.width = w;
        this.height = h;
        //player
        this.player = new Player(this.width / 2, 250);
        // enemies
        this.enemies = new Array();
        for (let i = 0; i < 5; i++) {
            let x = Math.random() * this.width;
            let y = Math.random() * this.height;
            const en = new Enemy(x, y);
            en.body.applyForce(new Vector(5, 3));
            this.enemies.push(en);
        }
    }
    update(delataTime) {
        //update enemys
        for (const e of this.enemies) {
            e.update(delataTime);
            //collision with the player
            if (CollisionSystem.checkCircleCollision(this.player.body, e.body)) {
                log('hit');
            }
            //collision wall
            CollisionSystem.checkCircleCollisionBoundaries(e.body, {
                w: this.width,
                h: this.height,
                y: 0,
                x: 0
            });
        }
    }
    draw(ctx) {
        //player draw
        this.player.draw(ctx);
        //draw enemys
        for (const e of this.enemies) {
            e.draw(ctx);
        }
    }
}
//================================================MAIN====================================================================//
class Game {
    canvas;
    ctx;
    // Set display dimensions
    width;
    height;
    //world: PhysicsWorld
    world;
    // 2. Game State Tracking
    isRunning;
    lastTime;
    keys;
    constructor(canvasId) {
        // 1. Initialize Canvas and Context
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        // Set display dimensions
        this.width = this.canvas.width = CANVAS_SIZE.w;
        this.height = this.canvas.height = CANVAS_SIZE.h;
        this.world = new World(this.canvas.width, this.canvas.height);
        // 2. Game State Tracking
        this.isRunning = false;
        this.lastTime = 0;
        // 3. Input Handling
        this.keys = new Set();
        this.initInput();
        // 4. Bind the loop to maintain correct 'this' context
        this.loop = this.loop.bind(this);
    }
    // Set up global event listeners for controls
    initInput() {
        window.addEventListener('keydown', e => {
            this.keys.add(e.code);
            // Prevent scrolling with space/arrow keys
            if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code))
                e.preventDefault();
        });
        window.addEventListener('keyup', e => {
            this.keys.delete(e.code);
        });
    }
    // Entry point to start the game
    start() {
        if (this.isRunning)
            return;
        this.isRunning = true;
        this.lastTime = performance.now();
        // Spawn initial entities (e.g., Player, level boundaries)
        this.initLevel();
        // Start the loop
        requestAnimationFrame(this.loop);
        console.log('Game started successfully.');
    }
    initLevel() {
        // Placeholder for entity instantiation
        // e.g., this.entities.push(new Player(this));
    }
    // The Main Game Loop running at ~60fps
    loop(timeStamp) {
        if (!this.isRunning)
            return;
        // Calculate Delta Time (dt) in seconds
        const dt = (timeStamp - this.lastTime) / 1000;
        this.lastTime = timeStamp;
        // Cap dt to prevent massive jumps during lag spikes
        const cappedDt = Math.min(dt, 0.1);
        if (this.ctx != null) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            // Draw background
            this.ctx.fillStyle = '#1a1a2e';
            this.ctx?.fillRect(0, 0, this.width, this.height);
            //update
            this.world.update(cappedDt);
            //draw world
            this.world.draw(this.ctx);
        }
        // Request next frame
        requestAnimationFrame(this.loop);
    }
    getRandomColor() {
        const color = {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };
        return `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
    }
    getRandomInt(n) {
        return Math.floor(Math.random() * n);
    }
    stop() {
        this.isRunning = false;
    }
}
const myGame = new Game('canvas1');
myGame.start();
export {};
//# sourceMappingURL=script.js.map