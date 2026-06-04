const DIRECTION = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
};

const VELOCITY = {
    HORIZONTAL: {
        NONE: 'NONE',
        LEFT: 'LEFT',
        RIGHT: 'RIGHT',
    },
    VERTICAL: {
        NONE: 'NONE',
        UP: 'UP',
        DOWN: 'DOWN',
    },
};

const ACTION = {
    IDLE: 'IDLE',
    WALK: 'WALK',
    ATTACK: 'ATTACK',
    DEAD: 'DEAD',
};

const USER_COMMANDS = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    UP: 'UP',
    DOWN: 'DOWN',
    ATTACK: 'ATTACK',
};

const AI_TYPE = {
    RANDOM: 'RANDOM',
    CLOSE_ATTACK: 'CLOSE_ATTACK',
}

const COMBAT_TYPE = {
    PLAYER: 'PLAYER',
    MONSTER: 'MONSTER',
    NEUTRAL: 'NEUTRAL',
}
//===========================Component===============================

class Position {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

// Used for collision detection. See Animation for display size.
// Offset is from Position component
class BoundingBox {
    constructor(offsetX = 0, offsetY = 0, width = 0, height = 0, passable = true) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.width = width;
        this.height = height;
        this.passable = passable;
    }
}

class Movement {
    constructor(speed = 0,
                horizontalVelocity = VELOCITY.HORIZONTAL.NONE,
                verticalVelocity = VELOCITY.VERTICAL.NONE) {
        this.speed = speed;
        this.horizontalVelocity = horizontalVelocity;
        this.verticalVelocity = verticalVelocity;
    }
}

class Direction {
    constructor(currentDirection) {
        this.currentDirection = currentDirection;
    }
}

class Action {
    constructor(action) {
        this.action = action;
    }
}

class Combat {
    constructor(damage = 0, type = COMBAT_TYPE.NEUTRAL, attackBox = null) {
        this.damage = damage;
        this.type = type;
        this.woundedTimer = 0;
        this.attackingTimer = 0;
        // The hit box for the entities attack, offset from their main bounding box
        this.attackBox = attackBox;
    }
}

class Health {
    constructor(health = 100) {
        this.health = health;
    }
}

class Points {
    constructor(points = 0) {
        this.points = points;
    }
}

class Collectable {
    constructor(health = 0, points = 0) {
        this.health = health;
        this.points = points;
    }
}

class KeyboardControls {
    constructor(keyboardControls) {
        this.keyboardControls = keyboardControls;
    }
}

class Animations {
    constructor(sheet, animations, currentAnimation, spriteWidth, spriteHeight, displayWidth, displayHeight) {
        this.sheet = sheet;
        this.animations = animations;
        this.currentAnimation = currentAnimation;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.displayHeight = displayHeight;
        this.displayWidth = displayWidth;
        this.animationTimer = 0;
    }
}

class StaticImage {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class AIControl {
    constructor(type) {
        this.type = type;
        this.movementTimer = Math.random() * 5000;
    }
}

//===========================Component===============================

class Entity {
    constructor(id) {
        this.id = id;
        this.components = {};
    }

    addComponent(component) {
        this.components[component.name] = component;
        return this; // for method chaining
    }

    getComponent(name) {
        return this.components[name];
    }

    hasComponent(name) {
        return !!this.components[name];
    }

    removeComponent(name) {
        delete this.componentsp[name];
        return this;
    }
}

class ECS {
    constructor() {
        this.entities = [];
        this.systems = [];
        this.nextEntityId = 1000;
    }

    createEntity(name) {
        const entity = new Entity(name + ' ' + this.nextEntityId++);
        this.entities.push(entity);
        return entity;
    }

    addSystem(system) {
        this.systems.push(system);
    }

    update(dt) {
        this.systems.forEach(system => {
            system.update(this.entities, dt)
        });

        this.celanUpEntities();
    }

    resetEnties() {
        this.entities = [];
    }

    celanUpEntities() {
        this.entities = this.entities.filter(entity => {
            let actionComp = entity.getComponent(Action);
        
            return !actionComp || actionComp.action !== ACTION.DEAD
        })
    }
}





class Game {
    constructor(canvasId) {
        // 1. Initialize Canvas and Context
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Set display dimensions
        this.width = this.canvas.width = 800;
        this.height = this.canvas.height = 600;

        // 2. Game State Tracking
        this.isRunning = false;
        this.lastTime = 0;
        this.entities = []; // Holds players, enemies, particles, etc.

        // 3. Input Handling
        this.keys = new Set();
        this.initInput();

        // 4. Bind the loop to maintain correct 'this' context
        this.loop = this.loop.bind(this);
    }

    // Set up global event listeners for controls
    initInput() {
        window.addEventListener('keydown', (e) => {
            this.keys.add(e.code);
            // Prevent scrolling with space/arrow keys
            if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) e.preventDefault();
        });

        window.addEventListener('keyup', (e) => {
            this.keys.delete(e.code);
        });
    }

    // Entry point to start the game
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();

        // Spawn initial entities (e.g., Player, level boundaries)
        this.initLevel();

        // Start the loop
        requestAnimationFrame(this.loop);
        console.log("Game started successfully.");
    }

    initLevel() {
        // Placeholder for entity instantiation
        // e.g., this.entities.push(new Player(this));
        this.entities = [
            { x: 100, y: 100, vx: 2, vy: 1, size: 30 } // Dummy entity
        ];
    }

    // The Main Game Loop running at ~60fps
    loop(timeStamp) {
        if (!this.isRunning) return;

        // Calculate Delta Time (dt) in seconds
        const dt = (timeStamp - this.lastTime) / 1000;
        this.lastTime = timeStamp;

        // Cap dt to prevent massive jumps during lag spikes
        const cappedDt = Math.min(dt, 0.1);

        this.update(cappedDt);
        this.render();

        // Request next frame
        requestAnimationFrame(this.loop);
    }

    // Update game logic and physics
    update(dt) {
        // Handle global game state inputs
        if (this.keys.has('KeyP')) this.togglePause();

        // Update all active game entities
        for (let i = this.entities.length - 1; i >= 0; i--) {
            const entity = this.entities[i];

            // Example basic physics integration: x = x + (v * dt)
            entity.x += entity.vx * 60 * dt;
            entity.y += entity.vy * 60 * dt;

            // Simple screen boundary bounce for demo
            if (entity.x < 0 || entity.x > this.width - entity.size) entity.vx *= -1;
            if (entity.y < 0 || entity.y > this.height - entity.size) entity.vy *= -1;

            // If entity has a custom update method, run it
            if (typeof entity.update === 'function') {
                entity.update(this, dt);
            }
        }
    }

    // Render everything to the canvas
    render() {
        // Clear the entire canvas for the new frame
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw background
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Render all entities
        this.entities.forEach(entity => {
            if (typeof entity.render === 'function') {
                entity.render(this.ctx);
            } else {
                // Fallback demo draw
                this.ctx.fillStyle = '#e94560';
                this.ctx.fillRect(entity.x, entity.y, entity.size, entity.size);
            }
        });
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