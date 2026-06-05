import { Component } from './components';
import { Entity } from './entity';
export interface AbstractSystem {
    requieredComponents: Array<Component>;
    update(entities: Array<Entity>, deletaTime: number): void;
    before(entities: Array<Entity>, deletaTime: number): void;
    updateForEntity(entities: Entity, deletaTime: number): void;
}
export declare class RenderSystem implements AbstractSystem {
    requieredComponents: Array<Component>;
    ctx: CanvasRenderingContext2D | null;
    constructor(ctx: CanvasRenderingContext2D | null);
    update(entities: Array<Entity>, deletaTime: number): void;
    before(entities: Array<Entity>, deletaTime: number): void;
    updateForEntity(entity: Entity, deletaTime: number): void;
}
//# sourceMappingURL=systems.d.ts.map