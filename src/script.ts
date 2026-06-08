//=======================================================================================================================//
const CANVAS_SIZE = { w: 800, h: 600 } as const

enum SHAPE {
  CIRCLE,
  SQUARE
}

interface RGBColor {
  r: number
  g: number
  b: number
}

interface Boundaries {
  x: number
  y: number
  w: number
  h: number
}

interface GameObject {
  draw(ctx: CanvasRenderingContext2D | null): void
  update(delataTime: number): void
}

class Vector {
  x: number
  y: number

  constructor (x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }
  /**
   * Adds a vector to this vector
   *
   * @param v - The Vector.
   *
   */
  add (v: Vector): void {
    this.x = this.x + v.x
    this.y = this.y + v.y
  }
  //
  /**
   * Subtracts a vector from this vector
   *
   * @param v - The Vector.
   *
   */
  sub (v: Vector): void {
    this.x = this.x + v.x
    this.y = this.y + v.y
  }
  //
  /**
   * Scales this vector with multiplication
   *
   * @param n - The number.
   *
   */
  mult (n: number): void {
    this.x = this.x * n
    this.y = this.y * n
  }
  //
  /**
   * Scales this vector with division
   *
   * @param n - The number.
   *
   */
  div (n: number): void {
    this.x = this.x / n
    this.y = this.y / n
  }
  //
  /**
   * Returns the magnitude of this vector
   *
   * @param n - The number.
   * @returns number
   *
   */
  mag (): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
  //
  /**
   * Returns the magnitude of this vector
   *
   * @param n - The number.
   * @returns number
   *
   */
  lenghtSq (): number {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2)
  }
  //
  /**
   * Normalizes this vector to a unit length of 1
   *
   */
  normalize (): void {
    let m = this.mag()
    if (m > 0) {
      this.div(m)
    }
  }
  //
  /**
   * Limits the magnitude of this vector
   *
   * @param max - The number.
   *
   * @returns number
   */
  limit (max: number): void {
    const length = this.mag()
    if (length > max && length > 0) {
      this.x = (this.x / length) * max
      this.y = (this.y / length) * max
    }
  }
  //
  /**
   * Returns the Euclidean distance between two vectors (considered as points)
   *
   * @param v - The Vector.
   *
   */
  dist (v: Vector): number {
    return Math.hypot(v.x - this.x, v.y - this.y)
  }
  //
  /**
   * Returns the dot product of two vectors
   *
   * @param v - The Vector.
   * @returns number
   */
  dot (v: Vector): number {
    return this.x * v.x + this.y * v.y
  }
  //
  /**
   * Returns the copy of the vector
   *
   * @return v - The Vector.
   *
   */
  copy (): Vector {
    return new Vector(this.x, this.y)
  }
  //
  /**
   * Returns a random 2D vector
   *
   * @return v - The Vector.
   *
   */
  random2D (): Vector {
    const angle = Math.random() * Math.PI * 2
    return new Vector(Math.cos(angle), Math.sin(angle))
  }
  //
  /**
   * Static Subtracts a vector from this vector
   *
   * @param v - The Vector.
   *
   */
  static sub (v1: Vector, v2: Vector): Vector {
    return new Vector(v1.x - v2.x, v1.y - v2.y)
  }
  //
  /**
   * Static Subtracts a vector from this vector
   *
   * @param v - The Vector.
   *
   */
  static add (v1: Vector, v2: Vector): Vector {
    return new Vector(v1.x + v2.x, v1.y + v2.y)
  }
  //
  /**
   * Static Subtracts a vector from this vector
   *
   * @param v - The Vector.
   *
   */
  static dot (v1: Vector, v2: Vector): number {
    return v1.x * v2.x + v1.y * v2.y
  }
  //
  static mult (v1: Vector, n: number): Vector {
    return new Vector(v1.x * n, v1.y * n)
  }
  //
  /**
   * Returns a random 2D vector
   *
   * @return v - The Vector.
   *
   */
  static random2D (min: number, max: number): Vector {
    let minCeiled = Math.ceil(min)
    let maxFloored = Math.floor(max)
    let x = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
    let y = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
    return new Vector(x, y)
  }
  //

  /**
   * Vector to string
   *
   * @return v - The Vector to strig representation.
   *
   */
  toString (): string {
    return `{x: ${this.x}, y: ${this.y}}`
  }
}

class Body implements GameObject {
  radius: number
  isStatic: boolean
  type: string
  shape: SHAPE
  position: Vector
  velocity: Vector
  accelaration: Vector
  mass: number
  restitution: number
  friction: number
  isGravity: boolean
  color: string
  width: number
  height: number
  lineWidth: number
  strokeStyle: string

  constructor (
    position: Vector,
    radius: number = 25,
    isStatic: boolean = false,
    color: string = 'rgba(33, 204, 113, 1)',
    mass: number = 1,
    shape: SHAPE = SHAPE.CIRCLE,
    lineWidth: number = 3,
    strokeStyle: string = '#ffff'
  ) {
    this.position = position
    this.velocity = new Vector()
    this.accelaration = new Vector(0, 0)
    this.radius = radius
    this.mass = mass
    this.shape = shape
    this.isStatic = isStatic
    this.isGravity = false
    this.restitution = 1
    this.friction = 0.98
    this.color = color
    this.type = 'na'
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle
    this.width = 40
    this.height = 40
  }
  //
  setGravity (isGravity: boolean): void {
    this.isGravity = isGravity
    if (isGravity) {
      this.restitution = 0.7
    } else {
      this.restitution = 1
    }
  }

  //
  applyForce (force: Vector) {
    this.accelaration.add(force)
  }
  //
  draw (ctx: CanvasRenderingContext2D | null): void {
    if (this.shape == SHAPE.CIRCLE) {
      if (ctx != null) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.strokeStyle = this.strokeStyle
        ctx.lineWidth = this.lineWidth
        ctx.stroke()
      }
    } else if (this.shape == SHAPE.SQUARE) {
      if (ctx != null) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.strokeStyle = this.strokeStyle
        ctx.lineWidth = this.lineWidth
        ctx.strokeRect(
          this.position.x,
          this.position.y,
          this.width,
          this.height
        )
      }
    }
  }
  //
  update (delataTime: number): void {
    if (this.isStatic) return

    this.accelaration.mult(delataTime)
    this.velocity.add(this.accelaration)
    this.position.add(this.velocity)
  }
  //
}

class PhysicsWorld {
  objects: Array<Body>
  boundaries: Boundaries
  gravity: Vector
  objectCount: number

  constructor (boundaries: Boundaries, gravity: Vector = new Vector(0, 10.0)) {
    this.objects = new Array<Body>()
    this.boundaries = boundaries
    this.gravity = gravity
    this.objectCount = 0
  }

  addObjectToWorld (obj: Body): void {
    this.objects.push(obj)
    this.objectCount++
  }

  draw (ctx: CanvasRenderingContext2D | null): void {
    // Draw object
    this.objects.forEach((o: Body) => {
      o.draw(ctx)
    })
  }

  update (delataTime: number): void {
    // update object
    this.objects.forEach((o: Body) => {
      //apply gravity
      if (o.isGravity) {
        o.applyForce(this.gravity)
      }
      o.update(delataTime)
    })
    //
    this.checkWallCollision()
    // collition
    for (let i = 0; i < this.objects.length; i++) {
      const body1 = this.objects.at(i)
      for (let j = 1; i < this.objects.length; i++) {
        const body2 = this.objects.at(j)
        if (body1 != undefined && body2 != undefined) {
          if (body1.shape == SHAPE.CIRCLE && body2.shape == SHAPE.CIRCLE) {
            if (this.checkCircleToCircle(body1, body2)) {
              let mass1 = body1.mass * -1
              let mass2 = body2.mass * -1
              // body1.velocity.mult(mass1)
              // body2.velocity.mult(mass2)
              console.log('hit')
            }
          }
        }
      }
    }
  }

  checkWallCollision () {
    for (let i = 0; i < this.objects.length; i++) {
      const body = this.objects.at(i)
      if (body != undefined) {
        if (body.isStatic) continue

        if (body.shape == SHAPE.CIRCLE) {
          if (
            body.position.x > this.boundaries.w - body.radius ||
            body.position.x <= body.radius
          ) {
            body.velocity.x *= -body.restitution
          }
          //
          if (
            body.position.y > this.boundaries.h - body.radius ||
            body.position.y <= body.radius
          ) {
            if (body.isGravity) {
              // Friction
              if (body.position.y + body.radius >= this.boundaries.h) {
                body.position.y = this.boundaries.h - body.radius
                body.velocity.y = -body.velocity.y * body.restitution
                body.velocity.x *= body.friction
              }
            } else {
              body.velocity.y *= -body.restitution
            }
          }
        } else if (body.shape == SHAPE.SQUARE) {
          if (
            body.position.x > this.boundaries.w - body.width ||
            body.position.x <= this.boundaries.x
          ) {
            body.velocity.x *= -body.restitution
          }
          //
          if (
            body.position.y > this.boundaries.h - body.height ||
            body.position.y <= this.boundaries.y
          ) {
            body.velocity.y *= -body.restitution
          }
        }
      }
    }
  }

  checkCircleToRectCollision (circle: Body, box: Body): boolean {
    const closetX = Math.max(
      box.position.x,
      Math.min(circle.position.x, box.position.x + box.width)
    )
    const closetY = Math.max(
      box.position.y,
      Math.min(circle.position.y, box.position.y + box.height)
    )
    const distX = circle.position.x - closetX
    const distY = circle.position.y - closetY
    const distSqueared = distX * distX + distY * distY

    return distSqueared < circle.radius * circle.radius
  }

  checkRectToRectCollision (box1: Body, box2: Body): boolean {
    return (
      box1.position.x < box2.position.x + box2.width &&
      box1.position.x + box1.width > box2.position.x &&
      box1.position.y < box2.position.y + box2.height &&
      box1.position.y + box1.height > box2.position.y
    )
  }

  checkCircleToCircle (circle1: Body, circle2: Body): boolean {
    const dx = circle1.position.x - circle2.position.x
    const dy = circle1.position.y - circle2.position.y

    const dist = Math.sqrt(dx * dx + dy * dy)

    const radiiSum = circle1.radius + circle2.radius
    console.log(dist)
    return dist <= radiiSum
  }
}

//================================================MAIN====================================================================//
class Game {
  canvas: HTMLCanvasElement | null
  ctx: CanvasRenderingContext2D | null

  // Set display dimensions
  width: number
  height: number

  world: PhysicsWorld

  // 2. Game State Tracking
  isRunning: boolean
  lastTime: number

  keys: Set<string>

  constructor (canvasId: string) {
    // 1. Initialize Canvas and Context
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

    // Set display dimensions
    this.width = this.canvas.width = CANVAS_SIZE.w
    this.height = this.canvas.height = CANVAS_SIZE.h

    // 2. Game State Tracking
    this.isRunning = false
    this.lastTime = 0

    // Object
    this.world = new PhysicsWorld({ x: 0, y: 0, w: this.width, h: this.height })
    this.world.addObjectToWorld(
      new Body(new Vector(250, 250), 15, false, '#45ff', 25, SHAPE.SQUARE)
    )

    const body = new Body(new Vector(30, 50))
    body.setGravity(true)
    this.world.addObjectToWorld(body)

    const body2 = new Body(new Vector(30, 50))
    body2.applyForce(new Vector(200, 300))
    body2.isStatic = true
    body2.width = 350
    body2.color = 'rgba(239, 13, 239, 1)'
    body2.shape = SHAPE.SQUARE
    this.world.addObjectToWorld(body2)

    const body3 = new Body(new Vector(30, 50))
    body3.applyForce(new Vector(3, 7))
    body3.color = 'rgb(243, 21, 39)'

    this.world.addObjectToWorld(body3)

    //test
    for (let i = 0; i < 4; i++) {
      let position: Vector = Vector.random2D(this.world.boundaries.w, 50)
      let b = new Body(position)
      b.radius = 25 //this.getRandomInt(20)
      b.color = this.getRandomColor()
      b.mass = this.getRandomInt(20)
      let x = this.getRandomInt(10)
      let y = this.getRandomInt(15)
      b.applyForce(new Vector(x, y))

      this.world.addObjectToWorld(b)
    }
    console.log(`Count object: ${this.world.objectCount}`)

    // 3. Input Handling
    this.keys = new Set<string>()
    this.initInput()

    // 4. Bind the loop to maintain correct 'this' context
    this.loop = this.loop.bind(this)
  }

  // Set up global event listeners for controls
  initInput (): void {
    window.addEventListener('keydown', e => {
      this.keys.add(e.code)
      // Prevent scrolling with space/arrow keys
      if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) e.preventDefault()
    })

    window.addEventListener('keyup', e => {
      this.keys.delete(e.code)
    })
  }

  // Entry point to start the game
  start (): void {
    if (this.isRunning) return
    this.isRunning = true
    this.lastTime = performance.now()

    // Spawn initial entities (e.g., Player, level boundaries)
    this.initLevel()

    // Start the loop
    requestAnimationFrame(this.loop)
    console.log('Game started successfully.')
  }

  initLevel () {
    // Placeholder for entity instantiation
    // e.g., this.entities.push(new Player(this));
  }

  // The Main Game Loop running at ~60fps
  loop (timeStamp: number): void {
    if (!this.isRunning) return

    // Calculate Delta Time (dt) in seconds
    const dt = (timeStamp - this.lastTime) / 1000
    this.lastTime = timeStamp

    // Cap dt to prevent massive jumps during lag spikes
    const cappedDt = Math.min(dt, 0.1)

    if (this.ctx != null) {
      this.ctx.clearRect(0, 0, this.width, this.height)

      // Draw background
      this.ctx.fillStyle = '#1a1a2e'
      this.ctx?.fillRect(0, 0, this.width, this.height)

      // update object
      this.world.update(cappedDt)

      // Draw object
      this.world.draw(this.ctx)
    }

    // Request next frame
    requestAnimationFrame(this.loop)
  }

  getRandomColor (): string {
    const color: RGBColor = {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256)
    }

    return `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
  }

  getRandomInt (n: number): number {
    return Math.floor(Math.random() * n)
  }

  stop () {
    this.isRunning = false
  }
}

const myGame = new Game('canvas1')
myGame.start()
