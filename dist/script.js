//=======================================================================================================================//
const CANVAS_SIZE = { w: 800, h: 600 };
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
    force;
    radius;
    isStatic;
    type;
    shape;
    position;
    velocity;
    accelaration;
    mass;
    restitution;
    color;
    width;
    height;
    lineWidth;
    strokeStyle;
    constructor(position, radius = 25, isStatic = false, color = 'rgba(33, 204, 113, 1)', mass = 1, shape = SHAPE.CIRCLE, lineWidth = 3, strokeStyle = '#ffff') {
        this.position = position;
        this.velocity = new Vector();
        this.accelaration = new Vector(5, 3);
        this.radius = radius;
        this.mass = mass;
        this.force = new Vector();
        this.shape = shape;
        this.isStatic = isStatic;
        this.restitution = 1;
        this.color = color;
        this.type = 'na';
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.width = 40;
        this.height = 40;
    }
    //
    applyForce(force) {
        this.force.add(force);
    }
    //
    draw(ctx) {
        if (this.shape == SHAPE.CIRCLE) {
            if (ctx != null) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.strokeStyle = this.strokeStyle;
                ctx.lineWidth = this.lineWidth;
                ctx.stroke();
            }
        }
        else if (this.shape == SHAPE.SQUARE) {
            if (ctx != null) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
                ctx.strokeStyle = this.strokeStyle;
                ctx.lineWidth = this.lineWidth;
                ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
            }
        }
    }
    //
    update(delataTime) {
        if (this.isStatic)
            return;
        this.accelaration.mult(delataTime);
        this.velocity.add(this.accelaration);
        this.position.add(this.velocity);
    }
}
class PhysicsWorld {
    objects;
    boundaries;
    gravity;
    objectCount;
    constructor(boundaries, gravity = new Vector(0, 10.0)) {
        this.objects = new Array();
        this.boundaries = boundaries;
        this.gravity = gravity;
        this.objectCount = 0;
    }
    addObjectToWorld(obj) {
        this.objects.push(obj);
        this.objectCount++;
    }
    draw(ctx) {
        // Draw object
        this.objects.forEach((o) => {
            o.draw(ctx);
        });
    }
    update(delataTime) {
        // update object
        this.objects.forEach((o) => {
            o.update(delataTime);
        });
        //
        this.checkWallCollision();
    }
    checkWallCollision() {
        for (let i = 0; i < this.objects.length; i++) {
            const body = this.objects.at(i);
            if (body != undefined) {
                if (body.isStatic)
                    continue;
                if (body.shape == SHAPE.CIRCLE) {
                    if (body.position.x > this.boundaries.w - body.radius ||
                        body.position.x <= body.radius) {
                        body.velocity.x *= -body.restitution;
                    }
                    //
                    if (body.position.y > this.boundaries.h - body.radius ||
                        body.position.y <= body.radius) {
                        body.velocity.y *= -body.restitution;
                    }
                }
                else if (body.shape == SHAPE.SQUARE) {
                    if (body.position.x > this.boundaries.w - body.width ||
                        body.position.x <= this.boundaries.x) {
                        body.velocity.x *= -body.restitution;
                    }
                    //
                    if (body.position.y > this.boundaries.h - body.height ||
                        body.position.y <= this.boundaries.y) {
                        body.velocity.y *= -body.restitution;
                    }
                }
            }
        }
    }
    checkCircleRectCollision(circle, box) {
        const closetX = Math.max(box.position.x, Math.min(circle.position.x, box.position.x + box.width));
        const closetY = Math.max(box.position.y, Math.min(circle.position.y, box.position.y + box.height));
        const distX = circle.position.x - closetX;
        const distY = circle.position.y - closetY;
        const distSqueared = distX * distX + distY * distY;
        return distSqueared < circle.radius * circle.radius;
    }
    checkRectRectCollision(box1, box2) {
        return (box1.position.x < box2.position.x + box2.width &&
            box1.position.x + box1.width > box2.position.x &&
            box1.position.y < box2.position.y + box2.height &&
            box1.position.y + box1.height > box2.position.y);
    }
}
//================================================MAIN====================================================================//
class Game {
    canvas;
    ctx;
    // Set display dimensions
    width;
    height;
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
        // 2. Game State Tracking
        this.isRunning = false;
        this.lastTime = 0;
        // Object
        this.world = new PhysicsWorld({ x: 0, y: 0, w: this.width, h: this.height });
        this.world.addObjectToWorld(new Body(new Vector(250, 250), 15, false, '#45ff', 25, SHAPE.SQUARE));
        const body = new Body(new Vector(30, 50));
        body.applyForce(new Vector(200, 300));
        this.world.addObjectToWorld(body);
        const body2 = new Body(new Vector(30, 50));
        body2.applyForce(new Vector(200, 300));
        body2.isStatic = true;
        body2.width = 350;
        body2.color = 'rgba(239, 13, 239, 1)';
        body2.shape = SHAPE.SQUARE;
        this.world.addObjectToWorld(body2);
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
            // update object
            this.world.update(cappedDt);
            // Draw object
            this.world.draw(this.ctx);
        }
        // Request next frame
        requestAnimationFrame(this.loop);
    }
    togglePause() {
        // Implementation of pause state logic
    }
    stop() {
        this.isRunning = false;
    }
}
const myGame = new Game('canvas1');
myGame.start();
export {};
//# sourceMappingURL=script.js.map