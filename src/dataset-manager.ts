const randChoice = function(arr: any[]): any { // Random pick from array
	return arr[Math.floor(Math.random() * arr.length)];
};
const repeatGenerator = function(count: number, generator: (count: number) => string): string {
	let outputArray: string[] = [];
	for(let i: number = 0; i<count; i++) outputArray.push(generator(count));
	return outputArray.join(" ");
}
interface Dataset {
	readonly name: string;
	readonly id: string;
	readonly language: string;
	readonly values: string[];
	readonly generatorFunction: (count: number) => string;
}
interface DatasetPath {
	readonly path: string;
	readonly local: boolean;
}
let datasetList: Dataset[] = [];

async function importDataset(datasetPath: DatasetPath) {
	const script: HTMLScriptElement = document.createElement("script");
	console.log(`Loading ${datasetPath.local ? "local " : ""}dataset @ ${datasetPath.path}`);
	script.src = datasetPath.path;
	script.onload = () => {
		disabled = false;
		generatePrompt(currentTestType.words, parseInt(clampIfUndefined((<HTMLInputElement>document.querySelector(`input[name="datasetPicker"]:checked`)), {value: "0"}).value));
		generateDatasetDropdown();
		[...Array.from(document.getElementsByName("datasetPicker")), ...Array.from(document.getElementsByName("typePicker"))].forEach(ele => ele.addEventListener("click", e => { // 6. Add another listener to reset the prompt if the player chooses another dataset
			reset();
			updatePB();
			window.setTimeout(() => document.getElementById("timeLeft").innerHTML=currentTestType.timer.toFixed(1), 20); // make the time display the amount of time granted, delay 20ms to allow time for previous display updates to stop
		}));
	};
	document.body.appendChild(script);
}
