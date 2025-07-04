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
function generateGraph(canvasEle, yValues) {
    let ctx = canvasEle.getContext("2d");
    let width = canvasEle.width;
    let height = canvasEle.height;
    let hpd = width / yValues.length;
    let minV = Math.min(...yValues);
    let maxV = Math.max(...yValues);
    let range = maxV - minV;
    let vpd = range / height + 1;
    let maxYVal = Math.floor(Math.max(...yValues.map(e => e / vpd)));
    ctx.clearRect(0, 0, width, height);
    let oneDone = false;
    ctx.beginPath();
    document.getElementById("minWpm").innerHTML = Math.floor(minV).toString();
    document.getElementById("maxWpm").innerHTML = Math.ceil(maxV).toString();
    yValues.forEach((y, x) => {
        let params = [x * hpd, height - y / vpd];
        if (!oneDone) {
            ctx.moveTo(...params);
            oneDone = true;
        }
        else {
            ctx.lineTo(...params);
        }
    });
    ctx.strokeStyle = "#bababa";
    ctx.lineWidth = 2;
    ctx.stroke();
}
