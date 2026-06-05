import { StatusEntity } from '../constants';
export interface Component {
    name: string;
}
export declare class Action implements Component {
    name: string;
    action: StatusEntity;
    constructor();
}
export declare class Position implements Component {
    name: string;
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare class BoundingBox implements Component {
    name: string;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    passable: boolean;
    constructor(width?: number, height?: number, passable?: boolean, offsetX?: number, offsetY?: number);
}
export declare class Movement implements Component {
    name: string;
    dx: number;
    dy: number;
    constructor(dx?: number, dy?: number);
}
export declare class Health implements Component {
    name: string;
    health: number;
    constructor(health?: number);
}
export declare class Points implements Component {
    name: string;
    points: number;
    constructor(points?: number);
}
export declare class Collectable implements Component {
    name: string;
    points: number;
    health: number;
    constructor(points?: number, health?: number);
}
export declare class StaticImage implements Component {
    name: string;
    width: number;
    height: number;
    color: string;
    constructor(width: number, height: number, color?: string);
}
export declare class KeyboardControls implements Component {
    name: string;
    keys: Set<number>;
    constructor(keys: Set<number>);
}
export declare class AIControl implements Component {
    name: string;
    movementTimer: number;
    constructor();
}
//# sourceMappingURL=components.d.ts.map