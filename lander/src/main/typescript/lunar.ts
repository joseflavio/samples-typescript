window.addEventListener("resize", handleResize);

// TypeScript
interface p2d {  
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

class LunarModule {
    centerX: number;
    centerY: number;
    constructor(initialX: number, initialY: number) {
        this.centerX = initialX;
        this.centerY = initialY;
    }
    getMinY() : number {
        return this.centerY - 50;
    }
    getMinX() : number {
        return this.centerX - 50;
    }
    getMaxX() : number {
        return this.centerX + 50;
    }
}
let lunarModule = new LunarModule(2500, 2500);

function scaleX(x: number, cw: number) : number {
    return (x * cw) / 6999;
}

function scaleY(y: number, ch: number) : number {
    return ((2999-y) * ch) / 2999;
}

function handleResize() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas01');
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    if (canvas.width  != displayWidth || canvas.height != displayHeight) {
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
    if (canvas.getContext) {
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        console.log("displayWidth="+ displayWidth);
        console.log("displayHeight="+ displayHeight);
        const ctx : CanvasRenderingContext2D = canvas.getContext('2d');
        draw(ctx, displayWidth, displayHeight);
    }
    else {
      console.log("Canvas not valid");
    }
}

function drawLunarModule(ctx : CanvasRenderingContext2D, cw: number, ch: number) {
    // ctx.fillStyle = 'rgba(0,0,255,0.5)';
    ctx.strokeStyle = 'rgba(255, 255, 0, 1)';
    ctx.lineWidth = 3;
    ctx.beginPath();

        const radius = scaleX((lunarModule.getMaxX()-lunarModule.getMinX())/2, cw);
    ctx.arc(scaleX(lunarModule.centerX, cw), scaleY(lunarModule.centerY, cw), radius, 0, 2 * Math.PI, false);
    
    ctx.moveTo(scaleX(lunarModule.centerX, cw), scaleY(lunarModule.centerY, cw));
    ctx.lineTo(scaleX(lunarModule.getMinX(), cw), scaleY(lunarModule.getMinY(), cw));
    ctx.lineTo(scaleX(lunarModule.getMaxX(), cw), scaleY(lunarModule.getMinY(), cw));
    ctx.lineTo(scaleX(lunarModule.centerX, cw), scaleY(lunarModule.centerY, cw));
    ctx.stroke();

    ctx.stroke();
}

function draw2(ctx : CanvasRenderingContext2D, cw: number, ch: number) {
    console.log("draw2");
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 30, 30);
    ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0, ch);
    ctx.lineTo(cw/2, ch);
    ctx.stroke();
    console.log("draw2 finished");
}

function drawTerrain(terrain: Array<p2d>,
                      ctx : CanvasRenderingContext2D,
                      cw: number, ch: number) {
    // console.log(terrain[1].a);
    ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for(const t of terrain) {
        ctx.moveTo(scaleX(t.x1, cw), scaleY(t.y1, ch));
        ctx.lineTo(scaleX(t.x2, cw), scaleY(t.y2, ch));
    }
    ctx.stroke();
}

function draw(ctx : CanvasRenderingContext2D, cw: number, ch: number) {
    const terrain = [ { x1: 0, y1: 100, x2: 1000, y2: 500 }, { x1: 1000, y1: 500, x2: 1500, y2: 100 }, { x1: 1500, y1: 100, x2: 3000, y2: 100 }, { x1: 3000, y1: 100, x2: 5000, y2: 1500 }, { x1: 5000, y1: 1500, x2: 6999, y2: 1000 } ];

    drawTerrain(terrain, ctx, cw, ch);
    draw2(ctx, cw, ch);
    drawLunarModule(ctx, cw, ch);
}
