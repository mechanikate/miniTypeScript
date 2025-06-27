(() => {
    let values = ["hello", "world", "these", "are", "example", "words", "but", "will", "be", "put", "in", "a", "random", "order"]; // put your words here
    datasetList.push({
        name: "example dataset", // display name in dropdown
        id: "exampledataset", // just remove spaces from name and keep in a similar format to already implemented datasets
        values: values, // plug in our string list from above as our dictionary
        language: "english", // what language is the dataset in? for us, it's english
        generatorFunction: (count) => {
            return repeatGenerator(// repeat the generator function "count" times and combine with spaces
            count, // how many times to run the supplied function
            (anotherCount) => randChoice(values) // the function to run, here we just choose a random value from values 
            );
        }
    });
})();
// once you're done writing all of this, you can go to index.html and add a script tag to the corresponding js dataset file, for this it would be `<script src="js/datasets/example.js"></script>`
