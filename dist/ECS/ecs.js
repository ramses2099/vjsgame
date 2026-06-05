"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECS = void 0;
const constants_1 = require("../constants");
const components_1 = require("./components");
const entity_1 = require("./entity");
class ECS {
    constructor() {
        this.nextEntityId = 1000;
        this.entities = new Array();
        this.systems = new Array();
    }
    //
    createEntity(name) {
        const entity = new entity_1.Entity(name + '- ' + this.nextEntityId++);
        this.entities.push(entity);
        return entity;
    }
    //
    addSystem(system) {
        this.systems.push(system);
    }
    //
    update(deletaTime) {
        this.systems.forEach((system) => {
            system.update(this.entities, deletaTime);
        });
    }
    //
    resetEntities() {
        this.entities = [];
    }
    //
    cleanUpEntities() {
        this.entities = this.entities.filter((entity) => {
            let actionComp = entity.getComponent(components_1.Action);
            return !actionComp || actionComp.action == constants_1.StatusEntity.Dead;
        });
    }
}
exports.ECS = ECS;
//# sourceMappingURL=ecs.js.map