import { StatusEntity } from '../constants'
import { Action, Component } from './components'
import { Entity } from './entity'
import { AbstractSystem } from './systems'

export class ECS {
  entities: Array<Entity>
  systems: Array<any> // todo remover when we have the systems
  nextEntityId: number = 1000

  constructor () {
    this.entities = new Array<Entity>()
    this.systems = new Array<AbstractSystem>()
  }
  //
  createEntity (name: string): Entity {
    const entity = new Entity(name + '- ' + this.nextEntityId++)
    this.entities.push(entity)
    return entity
  }
  //
  addSystem (system: AbstractSystem): void {
    this.systems.push(system)
  }
  //
  update (deletaTime: number) {
    this.systems.forEach((system: AbstractSystem) => {
      system.update(this.entities, deletaTime)
    })
  }
  //
  resetEntities (): void {
    this.entities = []
  }
  //
  cleanUpEntities () {
    this.entities = this.entities.filter((entity: Entity) => {
      let actionComp = entity.getComponent(Action) as Action
      return !actionComp || actionComp.action == StatusEntity.Dead
    })
  }
}
