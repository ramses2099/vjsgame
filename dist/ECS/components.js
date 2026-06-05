"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIControl = exports.KeyboardControls = exports.StaticImage = exports.Collectable = exports.Points = exports.Health = exports.Movement = exports.BoundingBox = exports.Position = exports.Action = void 0;
const constants_1 = require("../constants");
class Action {
    constructor() {
        this.name = Action.name;
        this.action = constants_1.StatusEntity.Life;
    }
}
exports.Action = Action;
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.name = Position.name;
    }
}
exports.Position = Position;
class BoundingBox {
    constructor(width = 0, height = 0, passable = false, offsetX = 0, offsetY = 0) {
        this.name = BoundingBox.name;
        this.width = width;
        this.height = height;
        this.passable = passable;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
}
exports.BoundingBox = BoundingBox;
class Movement {
    constructor(dx = 0, dy = 0) {
        this.name = Movement.name;
        this.dx = dx;
        this.dy = dy;
    }
}
exports.Movement = Movement;
class Health {
    constructor(health = 100) {
        this.name = Health.name;
        this.health = health;
    }
}
exports.Health = Health;
class Points {
    constructor(points = 0) {
        this.name = Points.name;
        this.points = points;
    }
}
exports.Points = Points;
class Collectable {
    constructor(points = 0, health = 0) {
        this.name = Points.name;
        this.points = points;
        this.health = health;
    }
}
exports.Collectable = Collectable;
class StaticImage {
    constructor(width, height, color = '#4592e9') {
        this.name = StaticImage.name;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}
exports.StaticImage = StaticImage;
class KeyboardControls {
    constructor(keys) {
        this.name = KeyboardControls.name;
        this.keys = keys;
    }
}
exports.KeyboardControls = KeyboardControls;
class AIControl {
    constructor() {
        this.name = AIControl.name;
        this.movementTimer = Math.random() * 5000;
    }
}
exports.AIControl = AIControl;
//# sourceMappingURL=components.js.map