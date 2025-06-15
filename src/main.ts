let allToType: string = (<HTMLInputElement>document.getElementById("toType")).value;
let lastCorrectIndex: number = 0;
let nextIndex: number = lastCorrectIndex+1;
let firstTime: number | undefined;
let currTime: number | undefined;
let currCpm: number = 0;
let currWpm: number = 0;
let lastTime: number;
let disabled: boolean = false;
let startLength: number = 0;
let personalBest: number = -1;
const randChoice = function(arr: any[]): any { 
	return arr[Math.floor(Math.random() * arr.length)];
};
const firstBreak = function (aStr: string, bStr: string): number {
	if(bStr.length > aStr.length) return aStr.length;
	let a: string[] = Array.from(aStr);
	let b: string[] = Array.from(bStr);
	let matchingChars: boolean[] = a.map((e: string, i: number): boolean => e!=b[i]);
	let totalUntilBreak: number = 0;
	for(let i: number = 0; i<matchingChars.length; i++) {
		if(matchingChars[i]) return totalUntilBreak;
		totalUntilBreak++;
	}
	return -1;
};
function generatePrompt(len: number = 10) {
	const words: string[] = [];
	for(let i: number=0; i<len; i++) {
		words.push(randChoice(dataset));
	}
	allToType=words.join(" ");
	startLength=allToType.length;
	(<HTMLInputElement>document.getElementById("toType")).value=allToType;
}
window.onload = function() {
	generatePrompt();
	document.getElementById("typed").addEventListener("paste", e => e.preventDefault());
	document.getElementById("typed").addEventListener("input", e => {
		if(disabled) {
			e.preventDefault();
			return;
		}
		if(firstTime == undefined) firstTime = new Date().getTime();
		let currentlyTyped: string = (<HTMLInputElement>document.getElementById("typed")).value;
		nextIndex = currentlyTyped.length;
		let shouldBeTyped: string = allToType.slice(0, nextIndex);
		let firstBroken: number = firstBreak(currentlyTyped, shouldBeTyped);
		if(firstBroken === -1) {
			document.getElementById("typed").style.color="black";
			if(allToType[0] == (<HTMLInputElement>document.getElementById("typed")).value[0]) {  
				allToType = allToType.substring(1);
				(<HTMLInputElement>document.getElementById("toType")).value=allToType;
				(<HTMLInputElement>document.getElementById("typed")).value=(<HTMLInputElement>document.getElementById("typed")).value.substring(1);
			}
			if(shouldBeTyped.length < (<HTMLInputElement>document.getElementById("toType")).value.length || allToType.length > 0) return; 
			document.getElementById("typed").style.backgroundColor="green";
			lastTime = new Date().getTime();
			disabled = true;
			window.setTimeout(() => {
				personalBest = Math.max(personalBest, currWpm);
			}, 125);
			return;
		}
		console.log(`wrong @ ${firstBroken} (and maybe onwards)`);
		document.getElementById("typed").style.color="red";
	});
	window.setInterval(() => {
		currTime = lastTime === undefined ? new Date().getTime() : lastTime;
		let secs: number = (currTime-firstTime)/1000;
		let mins: number = secs/60;
		currCpm = mins !== 0 ? (startLength - allToType.length)/mins : 0;
		currWpm = currCpm/5;
		updateDisplays();
	}, 100);
	document.getElementById("typed").addEventListener("keypress", e => {
		if(e.key == "Enter") { disabled = false; reset(); }
		if(disabled) { e.preventDefault(); return; }
	});
};
function updateDisplays() {
	document.getElementById("charPerSecond").innerHTML=isNaN(currCpm) ? "0.000" : currCpm.toFixed(3);
	document.getElementById("wordsPerMin").innerHTML=isNaN(currWpm) ? "0.000" : currWpm.toFixed(3);
	document.getElementById("pbWordsPerMin").innerHTML=isNaN(personalBest) || personalBest === -1 ? "0.000" : personalBest.toFixed(3);
}
function reset() {
	currCpm=0;
	currWpm=0;
	generatePrompt();
	(<HTMLInputElement>document.getElementById("typed")).value = "";
	document.getElementById("typed").style.backgroundColor="";
	firstTime = undefined;
	lastTime = undefined;
}

