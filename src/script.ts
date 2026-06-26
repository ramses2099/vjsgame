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

//=================INTERFACES=============================
interface Point {
  x: number
  y: number
}
//=================INTERFACES==========================

//=================2D Primitives==========================
const rect = (x: number, y: number, w: number, h: number): void => {
  ctx.rect(x, y, w, h)
}

const line = (x: number, y: number): void => {
  ctx.lineTo(x, y)
}

const ellipse = (
  x: number,
  y: number,
  radiusX: number,
  radiusY: number,
  rotation: number,
  startAngle: number,
  endAngle: number,
  counterclockwise?: boolean
): void => {
  ctx.ellipse(
    x,
    y,
    radiusX,
    radiusY,
    rotation,
    startAngle,
    endAngle,
    counterclockwise
  )
}

const circle = (x: number, y: number, r: number): void => {
  ctx.arc(x, y, r, 0, 2 * Math.PI)
}

const trinagle = (p1: Point, p2: Point, p3: Point): void => {
  // Move to the first vertex
  ctx.moveTo(p1.x, p1.y)

  // Draw lines to the second and third vertices
  ctx.lineTo(p2.x, p2.y)
  ctx.lineTo(p3.x, p3.y)
}

//=================2D Primitives==========================
const color = (r: number, g: number, b: number): string => {
  return `rgb(${r},${g},${b})`
}

const randomColor = (): string => {
  const r: number = Math.floor(Math.random() * 256)
  const g: number = Math.floor(Math.random() * 256)
  const b: number = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}

const fill = (): void => {
  ctx.fill()
}

const fillColor = (color: string): void => {
  ctx.fillStyle = color
}

const fillRect = (x: number, y: number, w: number, h: number): void => {
  ctx.fillRect(x, y, w, h)
}

const stroke = (path?: Path2D): void => {
  if (path) {
    ctx.stroke(path)
  } else {
    ctx.stroke()
  }
}

const noStroke = (): void => {
  ctx.strokeStyle = 'rgba(1, 1, 1, 0)'
}

const strokeStyle = (color: string): void => {
  ctx.strokeStyle = color
}

const strokeRect = (x: number, y: number, w: number, h: number): void => {
  ctx.strokeRect(x, y, w, h)
}

const lineWidth = (width: number): void => {
  ctx.lineWidth = width
}

const clearRect = (x: number, y: number, w: number, h: number): void => {
  ctx.clearRect(x, y, w, h)
}

const moveTo = (x: number, y: number): void => {
  ctx.moveTo(x, y)
}

const translate = (x: number, y: number): void => {
  ctx.translate(x, y)
}

const resetTransform = (): void => {
  // Reset current transformation matrix to the identity matrix
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

const font = (fontStyle: string): void => {
  ctx.font = fontStyle
}

const fillText = (text: string, x: number, y: number): void => {
  ctx.fillText(text, x, y)
}

const beginPath = (): void => {
  ctx.beginPath()
}

const closePath = (): void => {
  ctx.closePath()
}

//======================Input Event========================
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
  } else if (e.key === 'ArrowRight') {
  } else if (e.key === 'ArrowUp') {
  } else if (e.key === 'ArrowDown') {
  }
})

window.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft') {
  } else if (e.key === 'ArrowRight') {
  } else if (e.key === 'ArrowUp') {
  } else if (e.key === 'ArrowDown') {
  }
})
//======================Input Event========================

const c: string = randomColor()

const drawObject = (): void => {
  //clear canvas
  clearRect(0, 0, CANVAS_SIZE.w, CANVAS_SIZE.h)
  beginPath()
  fillColor(c)
  fillRect(250, 250, 25, 25)
  strokeStyle('#fff')
  lineWidth(2)
  strokeRect(250, 250, 25, 25)

  moveTo(30, 50) // Move the pen to (30, 50)
  line(150, 100) // Draw a line to (150, 100)
  stroke()
  closePath()

  // Draw the ellipse
  beginPath()
  ellipse(100, 300, 50, 75, Math.PI / 4, 0, 2 * Math.PI)
  stroke()
  closePath()

  beginPath()
  fillColor(c)
  circle(500, 250, 25)
  fill()
  strokeStyle('#fff')
  lineWidth(2)
  stroke()

  closePath()
  beginPath()
  fillColor('#fff')
  font('50px serif')
  fillText('Hello world', 350, 90)
  closePath()

  beginPath()
  fillColor(c)
  const p1: Point = { x: 150, y: 50 }
  const p2: Point = { x: 50, y: 200 }
  const p3: Point = { x: 250, y: 200 }
  trinagle(p1, p2, p3)
  fill()
  closePath()
  strokeStyle('#fff')
  lineWidth(2)
  stroke()
}

const updateObject = (deltatime: number): void => {
  //
}

let lastTime: number = 0

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
