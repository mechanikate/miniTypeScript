var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const randChoice = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};
const repeatGenerator = function (count, generator) {
    let outputArray = [];
    for (let i = 0; i < count; i++)
        outputArray.push(generator(count));
    return outputArray.join(" ");
};
let datasetList = [];
function importDataset(datasetPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const script = document.createElement("script");
        console.log(`Loading ${datasetPath.local ? "local " : ""}dataset @ ${datasetPath.path}`);
        script.src = datasetPath.path;
        script.onload = () => {
            disabled = false;
            generatePrompt(currentTestType.words, parseInt(clampIfUndefined(document.querySelector(`input[name="datasetPicker"]:checked`), { value: "0" }).value));
            generateDatasetDropdown();
            [...Array.from(document.getElementsByName("datasetPicker")), ...Array.from(document.getElementsByName("typePicker"))].forEach(ele => ele.addEventListener("click", e => {
                reset();
                updatePB();
                window.setTimeout(() => document.getElementById("timeLeft").innerHTML = currentTestType.timer.toFixed(1), 20); // make the time display the amount of time granted, delay 20ms to allow time for previous display updates to stop
            }));
        };
        document.body.appendChild(script);
    });
}
