"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderSystem = void 0;
const components_1 = require("./components");
class RenderSystem {
    constructor(ctx) {
        this.requieredComponents = [components_1.Position, components_1.StaticImage, components_1.Action];
        this.ctx = ctx;
    }
    //
    update(entities, deletaTime) {
        entities.forEach((entity) => {
            if (this.requieredComponents.every((comp) => {
                return entity.hasComponnet(comp);
            })) {
                this.updateForEntity(entity, deletaTime);
            }
        });
    }
    //
    before(entities, deletaTime) { }
    //
    updateForEntity(entity, deletaTime) {
        const positionComp = entity.getComponent(components_1.Position);
        const staticImageComp = entity.getComponent(components_1.StaticImage);
        if (this.ctx != null) {
            this.ctx.fillStyle = staticImageComp.color;
            this.ctx.fillRect(positionComp.x, positionComp.y, staticImageComp.width, staticImageComp.height);
        }
    }
}
exports.RenderSystem = RenderSystem;
//# sourceMappingURL=systems.js.map