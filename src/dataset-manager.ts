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
	readonly values: string[];
	readonly generatorFunction: (count: number) => string;
}
let datasetList: Dataset[] = [];

