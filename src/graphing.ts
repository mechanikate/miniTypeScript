/*function generateGraph(maxWidth: number, maxHeight: number, yValues: number[]): string { // vpd = values/units per dot
		let vpd: number = Math.max(15, Math.max(...yValues)/maxHeight+1); 
        let gridVals = new Array(maxHeight); // value grid, not as chars yet
        let maxY = Math.floor(Math.max(...yValues.map(e => e/vpd)));
		yValues = yValues.slice(Math.max(yValues.length - maxWidth, 0));
        for(let r=0; r<maxHeight; r++) {
            gridVals[r] = new Array(maxWidth).fill(false);
        }

        yValues.forEach((e: number, i: number) => {
                gridVals[maxY-Math.floor(e/vpd)][i] = true;
        });

        return gridVals.map((e: boolean[]): string => e.map((f: boolean): string => f ? "@" : " ").join("")).join("\n");
}
function circle(ctx: CanvasRenderingContext2D, x:number, y:number, r:number, fillColor: string = "#bababa") {
	ctx.beginPath();
	ctx.arc(x,y, r, 0, 2*Math.PI);
	ctx.fillStyle = fillColor;
	ctx.fill();
}*/
function generateGraph(canvasEle: HTMLCanvasElement, yValues: number[]) {
	let ctx: CanvasRenderingContext2D = canvasEle.getContext("2d");
	let width: number = canvasEle.width;
	let height: number = canvasEle.height;
	let hpd: number = width/yValues.length;
	let minV: number = Math.min(...yValues);
	let maxV: number = Math.max(...yValues);
	let range: number = maxV - minV;
	let vpd: number = range/height;
	let maxYVal: number = Math.floor(Math.max(...yValues.map(e => e/vpd)));
	ctx.clearRect(0,0, width, height);
	let oneDone: boolean = false;
	ctx.font = "28px monospace";
	ctx.strokeStyle = "#494949";
	ctx.strokeText(isFinite(maxV) ? Math.ceil(maxV).toString() : "0", 0,28);
	ctx.strokeText(isFinite(minV) ? Math.floor(minV).toString() : "0", 0,height-14);
	for(let h=0; h<=height; h+=height/5) {
		ctx.beginPath();
		ctx.moveTo(0,h);
		ctx.lineTo(width,h);
		ctx.strokeStyle = "#5a5a5a";
		ctx.lineWidth=3;
		ctx.stroke();
	}
	ctx.beginPath();
	yValues.forEach((y: number, x: number) => {
		let params: [number, number] = [x*hpd, height-(y-minV)/vpd];
		if(!oneDone) { 
			ctx.moveTo(...params);
			oneDone = true;
		} else {
			ctx.lineTo(...params);
		}
	});
	ctx.strokeStyle = "#bababa";
	ctx.lineWidth = 2;
	ctx.stroke();
}
