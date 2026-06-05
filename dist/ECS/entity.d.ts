import { Component } from './components';
export declare class Entity {
    id: string;
    components: Map<String, Component>;
    constructor(id: string);
    getComponent(componet: Component): Component | undefined;
    addComponent(component: Component): void;
    hasComponnet(component: Component): boolean;
    removeComponent(component: Component): void;
}
//# sourceMappingURL=entity.d.ts.map