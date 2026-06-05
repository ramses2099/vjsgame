"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("./ECS/components");
const ecs_1 = require("./ECS/ecs");
const systems_1 = require("./ECS/systems");
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
        // test ecs
        this.world = new ecs_1.ECS();
        const position = new components_1.Position(this.width / 2, this.height / 2);
        const staticImage = new components_1.StaticImage(64, 64);
        const action = new components_1.Action();
        const entity = this.world.createEntity('player');
        entity.addComponent(position);
        entity.addComponent(staticImage);
        entity.addComponent(action);
        const renderSystem = new systems_1.RenderSystem(this.ctx);
        this.world.addSystem(renderSystem);
        this.initInput();
        // 4. Bind the loop to maintain correct 'this' context
        this.loop = this.loop.bind(this);
    }
    // Set up global event listeners for controls
    initInput() { }
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
        this.update(cappedDt);
        //this.render()
        // Request next frame
        requestAnimationFrame(this.loop);
    }
    // Update game logic and physics
    update(dt) {
        // Handle global game state inputs
        if (this.ctx != null) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            // Draw background
            this.ctx.fillStyle = '#1a1a2e';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.world.update(dt);
        }
    }
    // Render everything to the canvas
    render() {
        // Clear the entire canvas for the new frame
        if (this.ctx != null) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            // Draw background
            this.ctx.fillStyle = '#1a1a2e';
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
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
//# sourceMappingURL=main.js.map