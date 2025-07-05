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
interface Vec2d {
	x: number;
	y: number;
}
function generateGraph(canvasEle: HTMLCanvasElement, yValues: number[]) {
	let asVecs: Vec2d[] = yValues.map((e: number, i: number): Vec2d => ({x: i, y: e}));
	let currentMax = -1;
	let pbVecs: Vec2d[] = asVecs.filter((e: Vec2d, i: number, arr: Vec2d[]) => {
		return i === 0 || Math.max(...(arr.map((n: Vec2d): number => n.y).slice(0, i))) < e.y;
	});
	let ctx: CanvasRenderingContext2D = canvasEle.getContext("2d");
	let width: number = canvasEle.width;
	let height: number = canvasEle.height;
	let hpd: number = width/yValues.length;
	let minV: number = Math.min(...yValues);
	let maxV: number = Math.max(...yValues);
	let range: number = maxV - minV;
	let vpd: number = range/(height-10);
	let maxYVal: number = Math.floor(Math.max(...yValues.map(e => e/vpd)));
	let oneDone: boolean = false;
	ctx.clearRect(0,0, width, height);
	ctx.setLineDash([]);
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
	oneDone = false;
	ctx.beginPath();
	ctx.setLineDash([10, 15]);
	let prev = 0;
	pbVecs.forEach((vec: Vec2d) => {
		let params: [number, number] = [vec.x*hpd, height-(vec.y-minV)/vpd];
		if(!oneDone) {
			ctx.moveTo(...params);
			oneDone = true;
		} else {
			ctx.lineTo(vec.x*hpd, height-(prev-minV)/vpd);
			ctx.lineTo(...params);
		}
		prev = Math.max(prev, vec.y);
	});
	ctx.lineTo(width, height-(prev-minV)/vpd);
	ctx.stroke();
}
