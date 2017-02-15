window.addEventListener("resize", handleResize);

// TypeScript
interface p2d {  
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

function handleResize() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas01');
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    if (canvas.width  != displayWidth || canvas.height != displayHeight) {
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
    console.log("displayHeight="+ displayHeight);
    if (canvas.getContext) {
      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
      const ctx : CanvasRenderingContext2D  = canvas.getContext('2d');
      draw(ctx, displayWidth, displayHeight);
    }
    else {
      console.log("Canvas not valid");
    }  
}


function drawLunarModule(ctx : CanvasRenderingContext2D) {
    console.log("drawLunarModule");
    ctx.fillStyle = 'rgba(0,0,255,0.5)';
    ctx.fillRect(25,25,100,100);
    ctx.clearRect(45,45,60,60);
    ctx.strokeStyle = 'rgba(255, 255, 0, 1)';
    ctx.strokeRect(50,50,50,50);
    console.log("drawLunarModule finished");
}

function draw2(ctx : CanvasRenderingContext2D, cw: number, ch: number) {
    console.log("draw2");
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 30, 30);
    ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
    ctx.beginPath();
    ctx.moveTo(0,0);    
    ctx.lineWidth = 3;
    ctx.lineTo(0, ch);
    ctx.lineTo(cw/2, ch);
    ctx.stroke();
    console.log("draw2 finished");
}

function drawTerrain(terrain: Array<p2d>,
                      ctx : CanvasRenderingContext2D,
                      cw: number, ch: number)
{  
  // console.log(terrain[1].a);
  for(const t of terrain) {
    console.log(t.x2);
  }
  
}

function draw(ctx : CanvasRenderingContext2D, cw: number, ch: number) {
    const terrain = [ { x1: 0, y1: 100, x2: 1000, y2: 500 }, { x1: 1000, y1: 500, x2: 1500, y2: 100 }, { x1: 1500, y1: 100, x2: 3000, y2: 100 }, { x1: 3000, y1: 100, x2: 5000, y2: 1500 }, { x1: 5000, y1: 1500, x2: 6999, y2: 1000 } ];
  
    drawTerrain(terrain, ctx, cw, ch);
    draw2(ctx, cw, ch);
    drawLunarModule(ctx);      
}
  