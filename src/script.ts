const canvas: HTMLCanvasElement = document.getElementById(
  'canvas1'
) as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext(
  '2d'
) as CanvasRenderingContext2D

const CANVAS_SIZE = { w: 640, h: 480 } as const

const log = <T>(msg: T): void => {
  console.log(`[DEBUG] - ${msg}`)
}

//=====================VARIABLE CONST======================
let lastTime: number = 0
let LEFT: boolean = false
let RIGHT: boolean = false
let UP: boolean = false
let DOWN: boolean = false
let MSG: string = ''

//=========================================================

class Vec2 {
  x: number
  y: number

  private constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  static CreateVector(x: number = 0, y: number = 0): Vec2 {
    return new Vec2(x, y)
  }

  static Add(v1: Vec2, v2: Vec2): Vec2 {
    return new Vec2(v1.x + v2.x, v1.y + v2.y)
  }

  static Sub(v1: Vec2, v2: Vec2): Vec2 {
    return new Vec2(v1.x - v2.x, v1.y - v2.y)
  }

  static Mult(v1: Vec2, n: number): Vec2 {
    return new Vec2(v1.x * n, v1.y * n)
  }

  static Mag(v1: Vec2): number {
    return Math.sqrt(v1.x ** 2 + v1.y ** 2)
  }

  static Unit(v1: Vec2): Vec2 {
    const mag: number = Vec2.Mag(v1)
    if (mag === 0) {
      return new Vec2(v1.x, v1.y)
    } else {
      return new Vec2(v1.x / mag, v1.y / mag)
    }
  }

  static Normal(v1: Vec2): Vec2 {
    const v = new Vec2(-v1.y, v1.x)
    return Vec2.Unit(v)
  }

  static Dot(v1: Vec2, v2: Vec2): number {
    return v1.x * v2.x + v1.y * v2.y
  }

  static Dir(v1: Vec2): number {
    return Math.atan2(v1.y, v1.x)
  }

  static SetDirection(v1: Vec2, dir: number): Vec2 {
    const mag = Vec2.Mag(v1)
    return Vec2.CreateVector(Math.cos(dir) * mag, Math.sign(dir) * mag)
  }

  static SetMagnitude(v1: Vec2, mag: number): Vec2 {
    const dir = Vec2.Dir(v1)
    return Vec2.CreateVector(Math.cos(dir) * mag, Math.sign(dir) * mag)
  }

  static CrossProduct(v1: Vec2, v2: Vec2): Vec2 {
    return Vec2.CreateVector(v1.x * v2.x, v1.y * v2.y)
  }

  static Copy(v1: Vec2): Vec2 {
    return Vec2.CreateVector(v1.x, v1.y)
  }

  static FromPolar(length: number, angle: number): Vec2 {
    return Vec2.CreateVector(length * Math.cos(angle), length * Math.sin(angle))
  }

  static RandomVec(min: number, max: number): Vec2 {
    const x: number = Math.floor(Math.random() * (max - min + 1)) + min
    const y: number = Math.floor(Math.random() * (max - min + 1)) + min
    return Vec2.CreateVector(x, y)
  }

  static ToString(v1: Vec2, polar: boolean = false): string {
    if (polar) {
      return `Vector (p) <x:${v1.x},y:${v1.y}>`
    } else {
      return `Vector <x:${v1.x},y:${v1.y}>`
    }
  }
  //Direction equal to angle
  static ToArray(v1: Vec2): number[] {
    return [v1.x, v1.y, Vec2.Dir(v1), Vec2.Mag(v1)]
  }

  //Direction equal to angle
  static ToObject(v1: Vec2): any {
    return { x: v1.x, y: v1.y, angle: Vec2.Dir(v1), length: Vec2.Mag(v1) }
  }
}

class MathHelper {
  static randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  //
  static round(num: number, precision: number): number {
    let fact: number = 10 ** precision
    return Math.round(num * fact) / fact
  }
  //
}

abstract class Body {
  pos: Vec2
  vel: Vec2
  acc: Vec2
  mass: number

  constructor(pos: Vec2, mass: number = 1) {
    this.pos = pos
    this.vel = Vec2.CreateVector()
    this.acc = Vec2.CreateVector()
    this.mass = mass
  }

  abstract Draw(ctx: CanvasRenderingContext2D): void
  abstract Update(deltatime: number): void
}

class Ball extends Body {
  r: number
  fsc: string
  sts: string
  lw: number
  constructor(
    pos: Vec2,
    radius: number = 25,
    mass: number = 1,
    fsc: string = '#2d889c',
    sts: string = '#fff',
    lw: number = 3
  ) {
    super(pos, mass)
    this.vel = Vec2.CreateVector()
    this.acc = Vec2.CreateVector()
    this.r = radius
    this.fsc = fsc
    this.sts = sts
    this.lw = lw
  }
  
  Draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.fsc
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.strokeStyle = this.sts
    ctx.lineWidth = this.lw
    ctx.stroke()
  }

  Update(deltatime: number): void {
    //
    this.vel = Vec2.Add(this.vel, this.acc)
    this.vel = Vec2.Mult(this.vel, deltatime)
    this.pos = Vec2.Add(this.pos, this.vel)
    this.acc = Vec2.Mult(this.acc, 0)
    //
    if (this.pos.x > CANVAS_SIZE.w - this.r || this.pos.x < this.r) {
      this.vel.x *= -1
    }
        //
    if (this.pos.y > CANVAS_SIZE.h - this.r || this.pos.y < this.r) {
      this.vel.y *= -1    
    }
  }
}

//=========================================================

/*--
for (let i = 0; i < 10; i++) {
  let x = Helper.randInt(100, 500)
  let y = Helper.randInt(50, 400)
  let r = Helper.randInt(10, 30)
  let m = Helper.randInt(0, 10)
  const other = new Ball(new Vec2(x, y), r, m)
  objectArray.push(other)
}
--*/

//======================Input Event========================
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    LEFT = true
  } else if (e.key === 'ArrowRight') {
    RIGHT = true
  } else if (e.key === 'ArrowUp') {
    UP = true
  } else if (e.key === 'ArrowDown') {
    DOWN = true
  }
})

window.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft') {
    LEFT = false
  } else if (e.key === 'ArrowRight') {
    RIGHT = false
  } else if (e.key === 'ArrowUp') {
    UP = false
  } else if (e.key === 'ArrowDown') {
    DOWN = false
  }
})
//======================Input Event========================

const drawObject = (): void => {
  //clear canvas
  ctx.clearRect(0, 0, CANVAS_SIZE.w, CANVAS_SIZE.h)
}

const updateObject = (deltatime: number): void => {}

const drawText = (pos: Vec2): void => {
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 16px Arial, sans-serif'
  ctx.fillText(MSG, pos.x, pos.y)
}

// animation frame loop
const animateloop = (timeStamp: number) => {
  // calculate the delta time
  const dt = (timeStamp - lastTime) / 1000
  lastTime = timeStamp
  const cappeDt = Math.min(dt, 0.16)

  // Update
  updateObject(cappeDt)
  // Render
  drawObject()

  requestAnimationFrame(animateloop)
}
requestAnimationFrame(animateloop)
