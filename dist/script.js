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
    radius;
    isStatic;
    type;
    shape;
    position;
    velocity;
    accelaration;
    mass;
    restitution;
    friction;
    isGravity;
    color;
    width;
    height;
    lineWidth;
    strokeStyle;
    constructor(position, radius = 25, isStatic = false, color = 'rgba(33, 204, 113, 1)', mass = 1, shape = SHAPE.CIRCLE, lineWidth = 3, strokeStyle = '#ffff') {
        this.position = position;
        this.velocity = new Vector();
        this.accelaration = new Vector(0, 0);
        this.radius = radius;
        this.mass = mass;
        this.shape = shape;
        this.isStatic = isStatic;
        this.isGravity = false;
        this.restitution = 1;
        this.friction = 0.98;
        this.color = color;
        this.type = 'na';
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.width = 40;
        this.height = 40;
    }
    //
    setGravity(isGravity) {
        this.isGravity = isGravity;
        if (isGravity) {
            this.restitution = 0.7;
        }
        else {
            this.restitution = 1;
        }
    }
    //
    applyForce(force) {
        this.accelaration.add(force);
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
            //apply gravity
            if (o.isGravity) {
                o.applyForce(this.gravity);
            }
            o.update(delataTime);
        });
        //
        this.checkWallCollision();
        // collition
        for (let i = 0; i < this.objects.length; i++) {
            const body1 = this.objects.at(i);
            for (let j = 1; i < this.objects.length; i++) {
                const body2 = this.objects.at(j);
                if (body1 != undefined && body2 != undefined) {
                    if (body1.shape == SHAPE.CIRCLE && body2.shape == SHAPE.CIRCLE) {
                        if (this.checkCircleToCircle(body1, body2)) {
                            let mass1 = body1.mass * -1;
                            let mass2 = body2.mass * -1;
                            // body1.velocity.mult(mass1)
                            // body2.velocity.mult(mass2)
                            console.log('hit');
                        }
                    }
                }
            }
        }
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
                        if (body.isGravity) {
                            // Friction
                            if (body.position.y + body.radius >= this.boundaries.h) {
                                body.position.y = this.boundaries.h - body.radius;
                                body.velocity.y = -body.velocity.y * body.restitution;
                                body.velocity.x *= body.friction;
                            }
                        }
                        else {
                            body.velocity.y *= -body.restitution;
                        }
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
    checkCircleToRectCollision(circle, box) {
        const closetX = Math.max(box.position.x, Math.min(circle.position.x, box.position.x + box.width));
        const closetY = Math.max(box.position.y, Math.min(circle.position.y, box.position.y + box.height));
        const distX = circle.position.x - closetX;
        const distY = circle.position.y - closetY;
        const distSqueared = distX * distX + distY * distY;
        return distSqueared < circle.radius * circle.radius;
    }
    checkRectToRectCollision(box1, box2) {
        return (box1.position.x < box2.position.x + box2.width &&
            box1.position.x + box1.width > box2.position.x &&
            box1.position.y < box2.position.y + box2.height &&
            box1.position.y + box1.height > box2.position.y);
    }
    checkCircleToCircle(circle1, circle2) {
        const dx = circle1.position.x - circle2.position.x;
        const dy = circle1.position.y - circle2.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radiiSum = circle1.radius + circle2.radius;
        console.log(dist);
        return dist <= radiiSum;
    }
}
class Component {
}
class Position extends Component {
    x;
    y;
    name = Position.name;
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
}
class Size extends Component {
    w;
    h;
    name = Size.name;
    constructor(w, h) {
        super();
        this.w = w;
        this.h = h;
    }
}
class Sprite extends Component {
    name = Sprite.name;
    color;
    lineWidth;
    strokeStyle;
    constructor(color = 'rgba(33, 204, 113, 1)', lineWidth = 3, strokeStyle = '#ffff') {
        super();
        this.color = color;
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
    }
}
class Shape extends Component {
    name = Shape.name;
    shape;
    constructor(shape = SHAPE.SQUARE) {
        super();
        this.shape = shape;
    }
}
class Dimension extends Component {
    name = Dimension.name;
    x;
    y;
    w;
    h;
    constructor(w, h, x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}
class RectBody extends Component {
    name = RectBody.name;
    x;
    y;
    w;
    h;
    constructor(x, y, w = 64, h = 64) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}
class CircBody extends Component {
    name = CircBody.name;
    x;
    y;
    r;
    constructor(x, y, r = 25) {
        super();
        this.x = x;
        this.y = y;
        this.r = r;
    }
}
class Physics extends Component {
    name = Physics.name;
    isStatic;
    position;
    velocity;
    accelaration;
    mass;
    restitution;
    friction;
    isGravity;
    constructor(isStatic = false, position = new Vector(0, 0), velocity = new Vector(0, 0), accelaration = new Vector(0, 0), mass = 1, restitution = 1, friction = 0.98, isGravity = true) {
        super();
        this.isStatic = isStatic;
        this.position = position;
        this.velocity = velocity;
        this.accelaration = accelaration;
        this.mass = mass;
        this.restitution = restitution;
        this.friction = friction;
        this.isGravity = isGravity;
    }
}
class System {
    ecs;
    constructor(ecs) {
        this.ecs = ecs;
    }
}
class RenderSystem extends System {
    name = RenderSystem.name;
    componentsRequired = new Set([Position, Size, Sprite, Shape]);
    constructor(ecs) {
        super(ecs);
    }
    update(entities, deltaTime) { }
    draw(entities, ctx) {
        for (let entity of entities) {
            let compos = this.ecs.getComponents(entity);
            if (compos.hasAll(this.componentsRequired)) {
                let pos = compos.get(Position.name);
                let size = compos.get(Size.name);
                let sprite = compos.get(Sprite.name);
                let sh = compos.get(Shape.name);
                if (sh.shape == SHAPE.CIRCLE) {
                    let body = compos.get(CircBody.name);
                    if (body) {
                        if (ctx != null) {
                            ctx.fillStyle = sprite.color;
                            ctx.beginPath();
                            ctx.arc(pos.x, pos.y, body.r, 0, 2 * Math.PI);
                            ctx.fill();
                            ctx.strokeStyle = sprite.strokeStyle;
                            ctx.lineWidth = sprite.lineWidth;
                            ctx.stroke();
                        }
                    }
                }
                else if (sh.shape == SHAPE.SQUARE) {
                    let body = compos.get(RectBody.name);
                    if (body) {
                        if (ctx != null) {
                            ctx.fillStyle = sprite.color;
                            ctx.fillRect(pos.x, pos.y, size.w, size.h);
                            ctx.strokeStyle = sprite.strokeStyle;
                            ctx.lineWidth = sprite.lineWidth;
                            ctx.strokeRect(pos.x, pos.y, size.w, size.h);
                        }
                    }
                }
            }
        }
    }
}
class GravitySystem extends System {
    name = RenderSystem.name;
    componentsRequired = new Set([
        Position,
        Size,
        Shape,
        Physics,
        Dimension
    ]);
    constructor(ecs) {
        super(ecs);
    }
    update(entities, deltaTime) {
        for (let entity of entities) {
            let compos = this.ecs.getComponents(entity);
            if (compos.hasAll(this.componentsRequired)) {
                let pos = compos.get(Position.name);
                let size = compos.get(Size.name);
                let sh = compos.get(Shape.name);
                if (sh.shape == SHAPE.CIRCLE) {
                    let body = compos.get(CircBody.name);
                    if (body) {
                    }
                }
                else if (sh.shape == SHAPE.SQUARE) {
                    let body = compos.get(RectBody.name);
                    if (body) {
                        let bPhysics = compos.get(Physics.name);
                        if (bPhysics.isStatic)
                            return;
                        if (bPhysics.isGravity) {
                            let dims = compos.get(Dimension.name);
                            bPhysics.accelaration.mult(deltaTime);
                            bPhysics.velocity.add(bPhysics.accelaration);
                            bPhysics.position.add(bPhysics.velocity);
                            //update position // Gravity
                            pos.y += bPhysics.position.y;
                            // Friction
                            if (pos.y + size.h >= dims.h) {
                                pos.y = dims.h - size.h;
                                bPhysics.velocity.y = -bPhysics.velocity.y * bPhysics.restitution;
                                bPhysics.velocity.x *= bPhysics.friction;
                            }
                        }
                    }
                }
            }
        }
    }
    draw(entities, ctx) { }
}
class ComponentContainer {
    map = new Map();
    add(component) {
        this.map.set(component.name, component);
    }
    get(componetName) {
        return this.map.get(componetName);
    }
    getAll() {
        return this.map.values();
    }
    has(componet) {
        return this.map.has(componet.name);
    }
    hasAll(components) {
        for (let comp of components) {
            if (!this.map.has(comp.name)) {
                return false;
            }
        }
        return true;
    }
    delete(componetName) {
        this.map.delete(componetName);
    }
}
class ECS {
    entities = new Map();
    systems = new Map();
    nextEntityID = 0;
    entitiesToDestroy = new Array();
    addEntity() {
        let entity = this.nextEntityID;
        this.nextEntityID++;
        this.entities.set(entity, new ComponentContainer());
        return entity;
    }
    removeEntity(entity) {
        this.entitiesToDestroy.push(entity);
    }
    addComponent(entity, component) {
        this.entities.get(entity)?.add(component);
        this.checkE(entity);
    }
    getComponents(entity) {
        return this.entities.get(entity);
    }
    removeComponent(entity, component) {
        this.entities.get(entity)?.delete(component.name);
        this.checkE(entity);
    }
    addSystem(system) {
        if (system.componentsRequired.size == 0) {
            console.warn('System no added: empty Component list');
            console.warn(system);
            return;
        }
        this.systems.set(system, new Set());
        for (let entity of this.entities.keys()) {
            this.checkES(entity, system);
        }
    }
    removeSystem(system) {
        this.systems.delete(system);
    }
    update(deltaTime) {
        for (let [system, entities] of this.systems.entries()) {
            system.update(entities, deltaTime);
        }
        while (this.entitiesToDestroy.length > 0) {
            this.destroyEntity(this.entitiesToDestroy.pop());
        }
    }
    draw(ctx) {
        for (let [system, entities] of this.systems.entries()) {
            system.draw(entities, ctx);
        }
    }
    logEntity(entity) {
        log(`Entity id: ${entity}`);
        let comps = this.getComponents(entity);
        for (const comp of comps.getAll()) {
            log(`Entity id: ${entity} has a compontent ${comp.name}`);
        }
        for (const syst of this.systems.keys()) {
            log(`ECS: has a system ${syst.name}`);
        }
    }
    destroyEntity(entity) {
        this.entities.delete(entity);
        for (let entities of this.systems.values()) {
            entities.delete(entity);
        }
    }
    checkE(entity) {
        for (let system of this.systems.keys()) {
            this.checkES(entity, system);
        }
    }
    checkES(entity, system) {
        let have = this.entities.get(entity);
        let need = system.componentsRequired;
        if (have?.hasAll(need)) {
            this.systems.get(system)?.add(entity);
        }
        else {
            this.systems.get(system)?.delete(entity);
        }
    }
}
//======================================================ECS=================================================================//
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
        // 2. Game State Tracking
        this.isRunning = false;
        this.lastTime = 0;
        this.world = new ECS();
        this.world.addSystem(new RenderSystem(this.world));
        this.world.addSystem(new GravitySystem(this.world));
        let entity = this.world.addEntity();
        this.world.addComponent(entity, new Position(250, 50));
        this.world.addComponent(entity, new Size(32, 32));
        this.world.addComponent(entity, new Sprite());
        this.world.addComponent(entity, new Shape());
        //this.world.addComponent(entity, new Shape(SHAPE.CIRCLE))
        this.world.addComponent(entity, new RectBody(25, 25, 32, 32));
        //this.world.addComponent(entity, new CircBody(250,250,30))
        this.world.addComponent(entity, new Dimension(CANVAS_SIZE.w, CANVAS_SIZE.h));
        //this.world.addComponent(entity, new Physics(false, new Vector(25, 25)))
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
            //this.world.update(cappedDt)
            // Draw object
            //this.world.draw(this.ctx)
            // update ECS
            this.world.update(cappedDt);
            // draw ECS
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