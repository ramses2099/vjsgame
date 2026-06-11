//=======================================================================================================================//
const CANVAS_SIZE = { w: 800, h: 600 };
const DEBUG = true;
const log = (msg) => {
    console.log(`[DEV] ${msg}`);
};
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
class Component {
}
class Body extends Component {
    kind;
    radius;
    position;
    velocity;
    acceleration;
    dimension;
    isStatic;
    constructor(shape) {
        super();
        this.kind = shape.kind;
        this.radius = shape.kind == 'square' ? 0 : shape.radius;
        this.position = new Vector(shape.position.x, shape.position.y);
        this.dimension = shape.kind == 'square' ? shape.dimension : { w: 0, h: 0 };
        this.acceleration = new Vector();
        this.velocity = new Vector();
        this.isStatic = false;
    }
}
class Sprite extends Component {
    color;
    lineWidth;
    strokeStyle;
    constructor(styleSprite) {
        super();
        this.color = styleSprite.color;
        this.lineWidth = styleSprite.lineWidth;
        this.strokeStyle = styleSprite.strokeStyle;
    }
}
class System {
}
class RenderSystem extends System {
    compoenentRequired = new Set([Body, Sprite]);
    ecs;
    constructor(ecs) {
        super();
        this.ecs = ecs;
    }
    update(entities, delatatime, ctx) {
        for (let entity of entities) {
            let comp = this.ecs.getComponents(entity);
            if (comp.hasAll(this.compoenentRequired)) {
                let body = comp.get(Body);
                let sprite = comp.get(Sprite);
                if (body.kind == 'circle') {
                    if (ctx != null) {
                        ctx.fillStyle = sprite.color;
                        ctx.beginPath();
                        ctx.arc(body.position.x, body.position.y, body.radius, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.strokeStyle = sprite.strokeStyle;
                        ctx.lineWidth = sprite.lineWidth;
                        ctx.stroke();
                    }
                }
                else if (body.kind == 'square') {
                    if (ctx != null) {
                        ctx.fillStyle = sprite.color;
                        ctx.fillRect(body.position.x, body.position.y, body.dimension.w, body.dimension.h);
                        ctx.strokeStyle = sprite.strokeStyle;
                        ctx.lineWidth = sprite.lineWidth;
                        ctx.strokeRect(body.position.x, body.position.y, body.dimension.w, body.dimension.h);
                    }
                }
            }
        }
    }
}
class GravitySystem extends System {
    compoenentRequired = new Set([Body, Sprite]);
    ecs;
    constructor(ecs) {
        super();
        this.ecs = ecs;
    }
    update(entities, delatatime, ctx) {
        for (let entity of entities) {
            let comp = this.ecs.getComponents(entity);
            if (comp.hasAll(this.compoenentRequired)) {
                let body = comp.get(Body);
                if (body.isStatic)
                    return;
                body.acceleration.mult(delatatime);
                body.velocity.add(body.acceleration);
                body.position.add(body.velocity);
            }
        }
    }
}
class ComponentContainer {
    map = new Map();
    add(component) {
        this.map.set(component.constructor, component);
    }
    get(componentClass) {
        return this.map.get(componentClass);
    }
    has(componentClass) {
        return this.has(componentClass);
    }
    hasAll(componentClasses) {
        for (let cls of componentClasses) {
            if (!this.map.has(cls)) {
                return false;
            }
        }
        return true;
    }
    delete(componentClass) {
        this.map.delete(componentClass);
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
    removeComponent(entity, componentClass) {
        this.entities.get(entity)?.delete(componentClass);
        this.checkE(entity);
    }
    addSystem(system) {
        if (system.compoenentRequired.size == 0) {
            console.warn('System not added: empty Component lsit.');
            console.warn(system);
            return;
        }
        system.ecs = this;
        this.systems.set(system, new Set());
        for (let entity of this.entities.keys()) {
            this.checkES(entity, system);
        }
    }
    removeSystem(system) {
        this.systems.delete(system);
    }
    update(deltatime, ctx) {
        for (let [system, entities] of this.systems.entries()) {
            system.update(entities, deltatime, ctx);
        }
        while (this.entitiesToDestroy.length > 0) {
            this.destroyEntity(this.entitiesToDestroy.pop());
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
        let need = system.compoenentRequired;
        if (have?.hasAll(need)) {
            this.systems.get(system)?.add(entity);
        }
        else {
            this.systems.get(system)?.delete(entity);
        }
    }
}
class EntityFactory {
    static create(world, shape, sts) {
        let entity = world.addEntity();
        if (shape.kind == 'circle') {
            world.addComponent(entity, new Body({
                kind: shape.kind,
                radius: shape.radius,
                position: shape.position
            }));
        }
        else if (shape.kind == 'square') {
            world.addComponent(entity, new Body({
                kind: shape.kind,
                position: shape.position,
                dimension: shape.dimension
            }));
        }
        world.addComponent(entity, new Sprite({
            color: sts.color,
            lineWidth: sts.lineWidth,
            strokeStyle: sts.strokeStyle
        }));
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
        //ECS
        this.world = new ECS();
        let entity = this.world.addEntity();
        this.world.addComponent(entity, new Body({ kind: 'circle', radius: 25, position: { x: 250, y: 50 } }));
        this.world.addComponent(entity, new Sprite({
            color: 'rgba(33, 204, 113, 1)',
            lineWidth: 3,
            strokeStyle: '#ffff'
        }));
        let entity2 = this.world.addEntity();
        this.world.addComponent(entity2, new Body({
            kind: 'square',
            position: { x: 450, y: 50 },
            dimension: { w: 32, h: 32 }
        }));
        this.world.addComponent(entity2, new Sprite({
            color: 'rgb(17, 33, 204)',
            lineWidth: 3,
            strokeStyle: '#ffff'
        }));
        for (let i = 0; i < 10; i++) {
            let sh;
            if (i % 2 == 0) {
                sh = {
                    kind: 'circle',
                    radius: this.getRandomInt(25),
                    position: { x: this.getRandomInt(350), y: this.getRandomInt(450) }
                };
            }
            else {
                sh = {
                    kind: 'square',
                    position: { x: this.getRandomInt(350), y: this.getRandomInt(450) },
                    dimension: { w: 32, h: 32 }
                };
            }
            let ss = {
                color: this.getRandomColor(),
                lineWidth: 3,
                strokeStyle: 'fff'
            };
            EntityFactory.create(this.world, sh, ss);
        }
        this.world.addSystem(new RenderSystem(this.world));
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
            this.world.update(cappedDt, this.ctx);
            //draw world
            //this.world.draw(this.ctx)
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