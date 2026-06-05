import { Component } from './components'

export class Entity {
  id: string
  components: Map<String, Component>

  constructor (id: string) {
    this.id = id
    this.components = new Map<String, Component>()
  }
  //
  getComponent (componet: Component): Component | undefined{
    return this.components.get(componet.name)
  }
  //
  addComponent (component: Component) {
    this.components.set(component.name, component)
  }
  //
  hasComponnet (component: Component): boolean {
    return !!this.components.get(component.name)
  }
  //
  removeComponent (component: Component) {
    this.components.delete(component.name)
  }
}
