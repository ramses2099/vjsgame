import { Action, Component, Position, StaticImage } from './components'
import { Entity } from './entity'

export interface AbstractSystem {
  requieredComponents: Array<Component>
  update(entities: Array<Entity>, deletaTime: number): void
  before(entities: Array<Entity>, deletaTime: number): void
  updateForEntity(entities: Entity, deletaTime: number): void
}

export class RenderSystem implements AbstractSystem {
  requieredComponents: Array<Component>
  ctx: CanvasRenderingContext2D | null

  constructor (ctx: CanvasRenderingContext2D | null) {
    this.requieredComponents = [Position, StaticImage, Action]
    this.ctx = ctx
  }
  //
  update (entities: Array<Entity>, deletaTime: number): void {
    entities.forEach((entity: Entity) => {
      if (
        this.requieredComponents.every((comp: Component) => {
          return entity.hasComponnet(comp)
        })
      ) {
        this.updateForEntity(entity, deletaTime)
      }
    })
  }
  //
  before (entities: Array<Entity>, deletaTime: number): void {}
  //
  updateForEntity (entity: Entity, deletaTime: number): void {
    const positionComp = entity.getComponent(Position) as Position
    const staticImageComp = entity.getComponent(StaticImage) as StaticImage

    if (this.ctx != null) {
      this.ctx.fillStyle = staticImageComp.color
      this.ctx.fillRect(
        positionComp.x,
        positionComp.y,
        staticImageComp.width,
        staticImageComp.height
      )
    }
  }
}
