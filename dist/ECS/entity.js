"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(id) {
        this.id = id;
        this.components = new Map();
    }
    //
    getComponent(componet) {
        return this.components.get(componet.name);
    }
    //
    addComponent(component) {
        this.components.set(component.name, component);
    }
    //
    hasComponnet(component) {
        return !!this.components.get(component.name);
    }
    //
    removeComponent(component) {
        this.components.delete(component.name);
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map