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
const save = () => {
    ctx.save();
};
const scale = (x, y) => {
    ctx.scale(x, y);
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
const randomRange = (min, max) => {
    return min + Math.random() * (max - min);
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
    setTo(x, y) {
        this.x = x;
        this.y = y;
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
    static randomNumBetween2D(minX, maxX, minY, maxY) {
        const x = randomRange(minX, maxX);
        const y = randomRange(minY, maxY);
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
class Component {
}
class TransfromComponent extends Component {
    pos;
    rotation;
    scale;
    constructor(options) {
        super();
        this.pos = options.pos ?? createVector();
        this.rotation = options.rotation ?? 0;
        this.scale = options.scale ?? createVector(0, 0);
    }
}
class MotionComponent extends Component {
    vel;
    acc;
    angularVelocity;
    constructor(options) {
        super();
        this.vel = options.vel ?? createVector(0, 0);
        this.acc = options.acc ?? createVector(0, 0);
        this.angularVelocity = options.angularVelocity ?? 0;
    }
}
class ShapeTypeComponent extends Component {
    shapeType;
    constructor(shapeType) {
        super();
        this.shapeType = shapeType;
    }
}
class RectangleComponent extends Component {
    width;
    height;
    centered;
    rotation;
    constructor(options) {
        super();
        this.width = options.width ?? 32;
        this.height = options.height ?? 32;
        this.centered = options.centered ?? false;
        this.rotation = options.rotation ?? 0;
    }
}
class TriangleComponent extends Component {
    p1;
    p2;
    p3;
    centered;
    rotation;
    constructor(options) {
        super();
        this.p1 = options.p1 ?? createVector(50, 150);
        this.p2 = options.p2 ?? createVector(200, 50);
        this.p3 = options.p3 ?? createVector(200, 250);
        this.centered = options.centered ?? false;
        this.rotation = options.rotation ?? 0;
    }
}
class CircleComponent extends Component {
    radius;
    constructor(options) {
        super();
        this.radius = options.radius ?? 25;
    }
}
class TextComponent extends Component {
    content;
    size;
    constructor(options) {
        super();
        this.content = options.content ?? 'Text';
        this.size = options.size ?? 12;
    }
}
class StyleComponent extends Component {
    fillStyle;
    strokeStyle;
    lineWidth;
    constructor(options) {
        super();
        this.fillStyle = options.fillStyle ?? randomColor();
        this.strokeStyle = options.strokeStyle ?? '#fff';
        this.lineWidth = options.lineWidth ?? 3;
    }
}
class EntityActiveComponent extends Component {
    isActive;
    constructor(options) {
        super();
        this.isActive = options.isActive ?? true;
    }
}
class EntityTypeComponent extends Component {
    entityType;
    constructor(options) {
        super();
        this.entityType = options.entityType ?? 'None';
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
class System {
}
class RenderShapeSystem extends System {
    compoenentRequired = new Set([
        ShapeTypeComponent,
        TransfromComponent,
        StyleComponent
    ]);
    ecs;
    constructor(ecs) {
        super();
        this.ecs = ecs;
    }
    update(entities, delatatime) { }
    draw(entities, ctx) {
        for (let entity of entities) {
            let comp = this.ecs.getComponents(entity);
            if (comp.hasAll(this.compoenentRequired)) {
                const shape = comp.get(ShapeTypeComponent);
                const style = comp.get(StyleComponent);
                const trans = comp.get(TransfromComponent);
                //
                if (shape.shapeType == 'Rectangle') {
                    const dims = comp.get(RectangleComponent);
                    beginPath();
                    fillColor(style.fillStyle);
                    fillRect(trans.pos.x, trans.pos.y, dims.width, dims.height);
                    strokeStyle(style.strokeStyle);
                    lineWidth(style.lineWidth);
                    strokeRect(trans.pos.x, trans.pos.y, dims.width, dims.height);
                    closePath();
                }
                //
                if (shape.shapeType == 'Circle') {
                    const cir = comp.get(CircleComponent);
                    beginPath();
                    fillColor(style.fillStyle);
                    circle(trans.pos.x, trans.pos.y, cir.radius);
                    fill();
                    strokeStyle(style.strokeStyle);
                    lineWidth(style.lineWidth);
                    stroke();
                    closePath();
                }
                //
                if (shape.shapeType == 'Triangle') {
                    const trig = comp.get(TriangleComponent);
                    beginPath();
                    fillColor(style.fillStyle);
                    trinagle({ x: trig.p1.x, y: trig.p1.y }, { x: trig.p2.x, y: trig.p2.y }, { x: trig.p3.x, y: trig.p3.y });
                    fill();
                    strokeStyle(style.strokeStyle);
                    lineWidth(style.lineWidth);
                    stroke();
                    closePath();
                }
            }
        }
    }
}
class RenderTextSystem extends System {
    compoenentRequired = new Set([
        TextComponent,
        TransfromComponent,
        StyleComponent
    ]);
    ecs;
    constructor(ecs) {
        super();
        this.ecs = ecs;
    }
    update(entities, delatatime) { }
    draw(entities, ctx) {
        for (let entity of entities) {
            let comp = this.ecs.getComponents(entity);
            if (comp.hasAll(this.compoenentRequired)) {
                const tex = comp.get(TextComponent);
                const style = comp.get(StyleComponent);
                const trans = comp.get(TransfromComponent);
                //
                beginPath();
                fillColor(style.fillStyle);
                font(`${tex.size}px serif`);
                fillText(tex.content, trans.pos.x, trans.pos.y);
                closePath();
            }
        }
    }
}
class MotionSystem extends System {
    compoenentRequired = new Set([MotionComponent, TransfromComponent]);
    ecs;
    constructor(ecs) {
        super();
        this.ecs = ecs;
    }
    draw(entities, ctx) { }
    update(entities, delatatime) {
        for (let entity of entities) {
            let comp = this.ecs.getComponents(entity);
            if (comp.hasAll(this.compoenentRequired)) {
                const trans = comp.get(TransfromComponent);
                const mot = comp.get(MotionComponent);
                mot.acc.mult(delatatime);
                mot.vel.add(mot.acc);
                trans.pos.add(mot.vel);
            }
        }
    }
}
class BoundariesSystem extends System {
    compoenentRequired = new Set([MotionComponent, TransfromComponent]);
    ecs;
    constructor(ecs) {
        super();
        this.ecs = ecs;
    }
    draw(entities, ctx) { }
    update(entities, delatatime) {
        for (let entity of entities) {
            let comp = this.ecs.getComponents(entity);
            if (comp.hasAll(this.compoenentRequired)) {
                const trans = comp.get(TransfromComponent);
                const mot = comp.get(MotionComponent);
                const shape = comp.get(ShapeTypeComponent);
                if (shape.shapeType === 'Rectangle') {
                    const dims = comp.get(RectangleComponent);
                    //
                    if (trans.pos.x > CANVAS_SIZE.w - dims.width || trans.pos.x < 0) {
                        mot.vel.x *= -1;
                    }
                    //
                    if (trans.pos.y > CANVAS_SIZE.h - dims.height || trans.pos.y < 0) {
                        mot.vel.y *= -1;
                    }
                }
                else if (shape.shapeType === 'Circle') {
                    const dims = comp.get(CircleComponent);
                    //
                    if (trans.pos.x > CANVAS_SIZE.w - dims.radius ||
                        trans.pos.x < dims.radius) {
                        mot.vel.x *= -1;
                    }
                    //
                    if (trans.pos.y > CANVAS_SIZE.h - dims.radius ||
                        trans.pos.y < dims.radius) {
                        mot.vel.y *= -1;
                    }
                }
            }
        }
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
        this.systems.set(system, new Set());
        for (let entity of this.entities.keys()) {
            this.checkES(entity, system);
        }
    }
    removeSystem(system) {
        this.systems.delete(system);
    }
    update(deltatime) {
        for (let [system, entities] of this.systems.entries()) {
            system.update(entities, deltatime);
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
class EntityTemplate {
    ecs;
    constructor(ecs) {
        this.ecs = ecs;
    }
    //
    createEmptyEntity() {
        const entity = ecs.addEntity();
        this.ecs.addComponent(entity, new EntityTypeComponent({}));
        ecs.addComponent(entity, new EntityActiveComponent({}));
        ecs.addComponent(entity, new TransfromComponent({}));
        ecs.addComponent(entity, new StyleComponent({}));
        return entity;
    }
    //
    createCircleEntity(pos, radius) {
        const entity = ecs.addEntity();
        ecs.addComponent(entity, new EntityTypeComponent({}));
        ecs.addComponent(entity, new EntityActiveComponent({}));
        ecs.addComponent(entity, new ShapeTypeComponent('Circle'));
        ecs.addComponent(entity, new CircleComponent({ radius: radius }));
        ecs.addComponent(entity, new TransfromComponent({ pos: pos }));
        ecs.addComponent(entity, new StyleComponent({}));
        return entity;
    }
    //
    createRectangleEntity(pos, width, height) {
        const entity = ecs.addEntity();
        ecs.addComponent(entity, new EntityTypeComponent({}));
        ecs.addComponent(entity, new EntityActiveComponent({}));
        ecs.addComponent(entity, new ShapeTypeComponent('Rectangle'));
        ecs.addComponent(entity, new RectangleComponent({ width: width, height: height }));
        ecs.addComponent(entity, new TransfromComponent({ pos: pos }));
        ecs.addComponent(entity, new StyleComponent({}));
        return entity;
    }
    //
    createTriangleEntity(vertx1, vertx2, vertx3) {
        const entity = ecs.addEntity();
        ecs.addComponent(entity, new EntityTypeComponent({}));
        ecs.addComponent(entity, new EntityActiveComponent({}));
        ecs.addComponent(entity, new ShapeTypeComponent('Triangle'));
        ecs.addComponent(entity, new TriangleComponent({
            p1: vertx1,
            p2: vertx2,
            p3: vertx3,
            centered: false,
            rotation: 0
        }));
        ecs.addComponent(entity, new StyleComponent({}));
        return entity;
    }
    //
    createTextEntity(text, size, pos, color = '#fff') {
        const entity = ecs.addEntity();
        ecs.addComponent(entity, new EntityTypeComponent({}));
        ecs.addComponent(entity, new EntityActiveComponent({}));
        ecs.addComponent(entity, new TextComponent({ content: text, size: size }));
        ecs.addComponent(entity, new TransfromComponent({ pos: pos }));
        ecs.addComponent(entity, new StyleComponent({ fillStyle: color }));
        return entity;
    }
}
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
const ecs = new ECS();
const ett = new EntityTemplate(ecs);
const entity01 = ett.createTextEntity('Text Test', 12, createVector(350, 50));
const entity02 = ett.createCircleEntity(createVector(250, 50), 15);
ecs.addComponent(entity02, new MotionComponent({ acc: createVector(10, 9) }));
const entity03 = ett.createRectangleEntity(createVector(50, 50), 25, 25);
ecs.addSystem(new RenderShapeSystem(ecs));
ecs.addSystem(new MotionSystem(ecs));
ecs.addSystem(new BoundariesSystem(ecs));
ecs.addSystem(new RenderTextSystem(ecs));
const drawObject = () => {
    //clear canvas
    clearRect(0, 0, CANVAS_SIZE.w, CANVAS_SIZE.h);
    //
    ecs.draw(ctx);
};
const updateObject = (deltatime) => {
    //
    ecs.update(deltatime);
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