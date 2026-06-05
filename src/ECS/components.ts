import { StatusEntity } from '../constants'

export interface Component {
  name: string
}

export class Action implements Component {
  name: string
  action: StatusEntity

  constructor () {
    this.name = Action.name
    this.action = StatusEntity.Life
  }
}

export class Position implements Component {
  name: string
  x: number
  y: number

  constructor (x: number, y: number) {
    this.x = x
    this.y = y
    this.name = Position.name
  }
}

export class BoundingBox implements Component {
  name: string
  offsetX: number
  offsetY: number
  width: number
  height: number
  passable: boolean

  constructor (
    width: number = 0,
    height: number = 0,
    passable: boolean = false,
    offsetX: number = 0,
    offsetY: number = 0
  ) {
    this.name = BoundingBox.name
    this.width = width
    this.height = height
    this.passable = passable
    this.offsetX = offsetX
    this.offsetY = offsetY
  }
}

export class Movement implements Component {
  name: string
  dx: number
  dy: number

  constructor (dx: number = 0, dy: number = 0) {
    this.name = Movement.name
    this.dx = dx
    this.dy = dy
  }
}

export class Health implements Component {
  name: string
  health: number

  constructor (health: number = 100) {
    this.name = Health.name
    this.health = health
  }
}

export class Points implements Component {
  name: string
  points: number

  constructor (points = 0) {
    this.name = Points.name
    this.points = points
  }
}

export class Collectable implements Component {
  name: string
  points: number
  health: number

  constructor (points: number = 0, health: number = 0) {
    this.name = Points.name
    this.points = points
    this.health = health
  }
}

export class StaticImage implements Component {
  name: string
  width: number
  height: number
  color: string

  constructor (    
    width: number,
    height: number,
    color: string = '#4592e9'
  ) {
    this.name = StaticImage.name  
    this.width = width
    this.height = height
    this.color = color
  }
}

export class KeyboardControls implements Component {
  name: string
  keys: Set<number>

  constructor (keys: Set<number>) {
    this.name = KeyboardControls.name
    this.keys = keys
  }
}

export class AIControl implements Component {
  name: string
  movementTimer: number

  constructor () {
    this.name = AIControl.name
    this.movementTimer = Math.random() * 5000
  }
}
