// to run: file:///C:/Users/a/Desktop/Github/samples-typescript/lander/wwwroot/lunar.html

// Main (entrypoint after page loads)
function onLoadMain() {
    //window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", onKeyDown, false); // capture = true
    requestAnimationFrame(gameLoop);
}

interface p2d {  
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

class LunarModule {
    centerX: number;
    centerY: number;
    speedY : number;
    constructor(initialX: number, initialY: number) {
        this.centerX = initialX;
        this.centerY = initialY;
        this.speedY = 0;
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
    accelerateY(accY : number) {
        this.speedY += accY;
    }
    updatePosition() {
        console.log("this.speedY=" + this.speedY);
         console.log("this.centerY=" + this.centerY);
        this.centerY += this.speedY;
    }
}

class LunarGame {

    gamePaused: boolean = true;
    tLastStep: number;
    tBeforePauseStep: number;

    terrain: Array<p2d>;
    lunarModule: LunarModule;

    constructor() {
        this.tLastStep = window.performance.now();
        this.tBeforePauseStep = 0;
        this.terrain = [ { x1: 0, y1: 100, x2: 1000, y2: 500 }, { x1: 1000, y1: 500, x2: 1500, y2: 100 }, { x1: 1500, y1: 100, x2: 3000, y2: 100 }, { x1: 3000, y1: 100, x2: 5000, y2: 1500 }, { x1: 5000, y1: 1500, x2: 6999, y2: 1000 } ];
        this.lunarModule = new LunarModule(2500, 2500);
    }
    isGamePaused() : boolean {
        return this.gamePaused;
    }
    pause() {
        this.tBeforePauseStep += window.performance.now() - this.tLastStep;
        this.tLastStep = null;
        this.gamePaused = true;
    }
    continue() {
        this.tLastStep = window.performance.now() - this.tBeforePauseStep;
        this.tBeforePauseStep = 0;
        this.gamePaused = false;
    }
    executeLoop() {
        if(this.gamePaused === false) {
            let now = window.performance.now();
            let step = now - this.tLastStep;
            this.tLastStep = now;
            handleResize(step);
        }
    }

    updatePhysics(tStepMillis : number) {
        console.log("tStepMillis=" + tStepMillis);
        this.lunarModule.accelerateY(-0.003711 * tStepMillis); // our fake gravity is 3.711 per second = 003711 per millisecond
        this.lunarModule.updatePosition();
    }

    draw(ctx : CanvasRenderingContext2D, cw: number, ch: number) {
        drawTerrain(this.terrain, ctx, cw, ch);
        drawLunarModule(this.lunarModule, ctx, cw, ch);
    }

}
var game: LunarGame = new LunarGame();

function gameLoop() {
    // console.log("gameLoop()");
    game.executeLoop();
    requestAnimationFrame(gameLoop);
}

function onKeyDown(e :KeyboardEvent) {
    console.log("onKeyDown() :: e.keyCode="+e.keyCode);
    // Space
    if(e.keyCode == 32) {
        if(game.isGamePaused()) {
            game.continue();
        }
        else {
            game.pause();
        }
    }
}

function scaleX(x: number, cw: number) : number {
    return (x * cw) / 6999;
}

function scaleY(y: number, ch: number) : number {
    return ((2999-y) * ch) / 2999;
}

const offCanvas = <HTMLCanvasElement>document.createElement('canvas');
function handleResize(tStep: number) {

    if(game.isGamePaused()) {
        return;
    }

    if(!(tStep > 0)) {
        console.error("Unexpected tStep! tStep="+tStep);
        return;
    }

    game.updatePhysics(tStep);

    const canvas = <HTMLCanvasElement>document.getElementById('canvas01');
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    if (canvas.width  != displayWidth || canvas.height != displayHeight) {
        canvas.width  = displayWidth;
        canvas.height = displayHeight;
    }
    if (offCanvas.width  != displayWidth || offCanvas.height != displayHeight) {
        offCanvas.width  = displayWidth;
        offCanvas.height = displayHeight;
    }

    const offCtx : CanvasRenderingContext2D = offCanvas.getContext('2d');
    const ctx : CanvasRenderingContext2D = canvas.getContext('2d');
    if (ctx && offCtx) {
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        game.draw(offCtx, displayWidth, displayHeight);
        ctx.clearRect(0, 0, displayWidth, displayHeight);
        ctx.drawImage(offCanvas, 0, 0);
        offCtx.clearRect(0, 0, displayWidth, displayHeight);
    }
    else {
        console.log("Canvas not valid");
    }

}

function drawLunarModule(lunarModule: LunarModule, ctx: CanvasRenderingContext2D, cw: number, ch: number) {
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
