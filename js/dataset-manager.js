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
