function generateGraph(canvasEle, yValues) {
    let asVecs = yValues.map((e, i) => ({ x: i, y: e }));
    let currentMax = -1;
    let pbVecs = asVecs.filter((e, i, arr) => {
        return i === 0 || Math.max(...(arr.map((n) => n.y).slice(0, i))) < e.y;
    });
    let ctx = canvasEle.getContext("2d");
    let width = canvasEle.width;
    let height = canvasEle.height;
    let hpd = width / yValues.length;
    let minV = Math.min(...yValues);
    let maxV = Math.max(...yValues);
    let range = maxV - minV;
    let vpd = range / (height - 10);
    let maxYVal = Math.floor(Math.max(...yValues.map(e => e / vpd)));
    let oneDone = false;
    ctx.clearRect(0, 0, width, height);
    ctx.setLineDash([]);
    ctx.font = "28px monospace";
    ctx.strokeStyle = "#494949";
    ctx.strokeText(isFinite(maxV) ? Math.ceil(maxV).toString() : "0", 0, 28);
    ctx.strokeText(isFinite(minV) ? Math.floor(minV).toString() : "0", 0, height - 14);
    for (let h = 0; h <= height; h += height / 5) {
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(width, h);
        ctx.strokeStyle = "#5a5a5a";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
    ctx.beginPath();
    yValues.forEach((y, x) => {
        let params = [x * hpd, height - (y - minV) / vpd];
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
    oneDone = false;
    ctx.beginPath();
    ctx.setLineDash([10, 15]);
    let prev = 0;
    pbVecs.forEach((vec) => {
        let params = [vec.x * hpd, height - (vec.y - minV) / vpd];
        if (!oneDone) {
            ctx.moveTo(...params);
            oneDone = true;
        }
        else {
            ctx.lineTo(vec.x * hpd, height - (prev - minV) / vpd);
            ctx.lineTo(...params);
        }
        prev = Math.max(prev, vec.y);
    });
    ctx.lineTo(width, height - (prev - minV) / vpd);
    ctx.stroke();
}
