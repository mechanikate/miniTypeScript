function generateGraph(maxWidth: number, maxHeight: number, yValues: number[]): string { // vpd = values/units per dot
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
