import { Entity } from './entity';
import { AbstractSystem } from './systems';
export declare class ECS {
    entities: Array<Entity>;
    systems: Array<any>;
    nextEntityId: number;
    constructor();
    createEntity(name: string): Entity;
    addSystem(system: AbstractSystem): void;
    update(deletaTime: number): void;
    resetEntities(): void;
    cleanUpEntities(): void;
}
//# sourceMappingURL=ecs.d.ts.map