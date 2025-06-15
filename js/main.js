let allToType = document.getElementById("toType").value;
let lastCorrectIndex = 0;
let nextIndex = lastCorrectIndex + 1;
let firstTime;
let currTime;
let currCpm = 0;
let currWpm = 0;
let lastTime;
let disabled = false;
let startLength = 0;
let personalBest = -1;
const randChoice = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};
const firstBreak = function (aStr, bStr) {
    if (bStr.length > aStr.length)
        return aStr.length;
    let a = Array.from(aStr);
    let b = Array.from(bStr);
    let matchingChars = a.map((e, i) => e != b[i]);
    let totalUntilBreak = 0;
    for (let i = 0; i < matchingChars.length; i++) {
        if (matchingChars[i])
            return totalUntilBreak;
        totalUntilBreak++;
    }
    return -1;
};
function generatePrompt(len = 10) {
    const words = [];
    for (let i = 0; i < len; i++) {
        words.push(randChoice(dataset));
    }
    allToType = words.join(" ");
    startLength = allToType.length;
    document.getElementById("toType").value = allToType;
}
window.onload = function () {
    generatePrompt();
    document.getElementById("typed").addEventListener("paste", e => e.preventDefault());
    document.getElementById("typed").addEventListener("input", e => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        if (firstTime == undefined)
            firstTime = new Date().getTime();
        let currentlyTyped = document.getElementById("typed").value;
        nextIndex = currentlyTyped.length;
        let shouldBeTyped = allToType.slice(0, nextIndex);
        let firstBroken = firstBreak(currentlyTyped, shouldBeTyped);
        if (firstBroken === -1) {
            document.getElementById("typed").style.color = "black";
            if (allToType[0] == document.getElementById("typed").value[0]) {
                allToType = allToType.substring(1);
                document.getElementById("toType").value = allToType;
                document.getElementById("typed").value = document.getElementById("typed").value.substring(1);
            }
            if (shouldBeTyped.length < document.getElementById("toType").value.length || allToType.length > 0)
                return;
            document.getElementById("typed").style.backgroundColor = "green";
            lastTime = new Date().getTime();
            disabled = true;
            window.setTimeout(() => {
                personalBest = Math.max(personalBest, currWpm);
            }, 125);
            return;
        }
        console.log(`wrong @ ${firstBroken} (and maybe onwards)`);
        document.getElementById("typed").style.color = "red";
    });
    window.setInterval(() => {
        currTime = lastTime === undefined ? new Date().getTime() : lastTime;
        let secs = (currTime - firstTime) / 1000;
        let mins = secs / 60;
        currCpm = mins !== 0 ? (startLength - allToType.length) / mins : 0;
        currWpm = currCpm / 5;
        updateDisplays();
    }, 100);
    document.getElementById("typed").addEventListener("keypress", e => {
        if (e.key == "Enter") {
            disabled = false;
            reset();
        }
        if (disabled) {
            e.preventDefault();
            return;
        }
    });
};
function updateDisplays() {
    document.getElementById("charPerSecond").innerHTML = isNaN(currCpm) ? "0.000" : currCpm.toFixed(3);
    document.getElementById("wordsPerMin").innerHTML = isNaN(currWpm) ? "0.000" : currWpm.toFixed(3);
    document.getElementById("pbWordsPerMin").innerHTML = isNaN(personalBest) || personalBest === -1 ? "0.000" : personalBest.toFixed(3);
}
function reset() {
    currCpm = 0;
    currWpm = 0;
    generatePrompt();
    document.getElementById("typed").value = "";
    document.getElementById("typed").style.backgroundColor = "";
    firstTime = undefined;
    lastTime = undefined;
}
