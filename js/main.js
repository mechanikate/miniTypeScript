/**
 * Welcome to miniTS!
 * This is a personal toy project to mess around with TypeScript for the first time.
 * Expect shenanigans and bugs.
 * - matthy.dev
 */
let allToType = document.getElementById("toType").value; // The remainder of the text to type
let lastCorrectIndex = 0; // The index where the text is last correct if applicable, examples: 1) typed value = "hello world", to type value = "hallo world", lastCorrectIndex will be 1 ("a" vs "e"). 2) typed value = "abc", to type value = "abc" (these are the same), lastCorrectIndex will be -1
let nextIndex = lastCorrectIndex + 1; // The next index the user will type
let firstTime; // Start of timer in milliseconds since 1 January 1970
let currTime; // Current time in milliseconds since 1 January 1970
let currCpm = 0; // Current characters per minute, updated every 100 milliseconds
let currWpm = 0; // Current *words8 per minute, equals currCpm divided by 5
let lastTime; // End of test/when test is completed, same format as firstTime/currTime
let disabled = false; // Disable inputting if true (Enter to reset is still allowed)
let startLength = 0; // Initial length of allToType before we remove any characters
let personalBest = -1; // PB words per minute
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
    generatePrompt(); // 1. Generate the first prompt
    document.getElementById("typed").addEventListener("paste", e => e.preventDefault()); // 2. Disable cheating via pasting text
    document.getElementById("typed").addEventListener("input", e => {
        if (disabled) { // 3a. If disabled is true, don't allow any typing!
            e.preventDefault();
            return;
        }
        if (firstTime == undefined)
            firstTime = new Date().getTime(); // 3b. If we haven't started the stopwatch, start it
        let currentlyTyped = document.getElementById("typed").value; // 3c. Set what we've currently typed thus far (will be cleared later)
        nextIndex = currentlyTyped.length; // 3d. Assign nextIndex to the last character's index of currentlyTyped
        let shouldBeTyped = allToType.slice(0, nextIndex); // 3e. What do we need to type? For example, if we've typed "hello w" and we're to type "hello world" in total, this should be "orld"
        let firstBroken = firstBreak(currentlyTyped, shouldBeTyped); // 3f. Calculate if we've made a mistake thus far
        if (firstBroken === -1) { // 3g. If we haven't made a mistake:
            document.getElementById("typed").style.color = "black"; // 3gI. Make sure the text is the right color (usually to clear from the red if we were previously wrong) 
            if (allToType[0] == document.getElementById("typed").value[0]) { // 3gII. If the newly-typed character is correct, remove it from the start of all toType.value, allToType, and typed.value
                allToType = allToType.substring(1);
                document.getElementById("toType").value = allToType;
                document.getElementById("typed").value = document.getElementById("typed").value.substring(1);
            }
            if (shouldBeTyped.length < document.getElementById("toType").value.length || allToType.length > 0)
                return; // 3gIII. If we're not done with the test yet, return and exit early.
            document.getElementById("typed").style.backgroundColor = "#4c9638"; // 3gIV. If we've finished, continue and set the background color to green to indicate the player is done
            lastTime = new Date().getTime(); // 3gV. Get the final time (see firstTime/currTime for what the value means)
            disabled = true; // 3gVI. Disable more inputting
            window.setTimeout(() => {
                personalBest = Math.max(personalBest, currWpm);
                document.getElementById("pbWordsPerMin").innerHTML = isNaN(personalBest) || personalBest === -1 ? "0.000" : personalBest.toFixed(3);
            }, 125);
            return; // 3gVIII. Don't continue to the next part! 
        }
        console.log(`wrong @ ${firstBroken} (and maybe onwards)`); // 3h. If the player misinputted, log a little info in the console telling where we're wrong for debugging
        document.getElementById("typed").style.color = "red"; // 3i. If the player misinputted, set the color of their inputted text to red to tell them they're wrong somewhere.
    });
    window.setInterval(() => {
        currTime = lastTime === undefined ? new Date().getTime() : lastTime;
        let secs = (currTime - firstTime) / 1000;
        let mins = secs / 60;
        currCpm = mins !== 0 ? (startLength - allToType.length) / mins : 0;
        currWpm = currCpm / 5;
        updateDisplays(); // 4a. Also update the displays
    }, 100);
    document.getElementById("typed").addEventListener("keypress", e => {
        if (e.key == "Enter") {
            disabled = false;
            reset();
        } // 5a. If Enter has been pressed, reset to the start
        if (disabled) {
            e.preventDefault();
            return;
        } // 5b. Otherwise, make sure we're not typing if disabled is true.
    });
};
function updateDisplays() {
    document.getElementById("charPerSecond").innerHTML = isNaN(currCpm) ? "0.000" : currCpm.toFixed(3); // Characters per minute (cpm), fix to 3 decimal places after the .
    document.getElementById("wordsPerMin").innerHTML = isNaN(currWpm) ? "0.000" : currWpm.toFixed(3); // Words per minute (wpm), fix to 3 decimal places after the .
}
function reset() {
    currCpm = 0; // Reset current CPM counter
    currWpm = 0; // Reset current WPM counter
    generatePrompt(); // New prompt
    document.getElementById("typed").value = ""; // Clear out what the player has already typed
    document.getElementById("typed").style.backgroundColor = ""; // Clear the background color if they're finished (green bg color)
    firstTime = undefined; // Clear the start time
    lastTime = undefined; // Clear the end time
}
