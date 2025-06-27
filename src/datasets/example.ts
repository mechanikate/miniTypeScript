(()=>{ // We wrap all of this in a function so that the "values" variable is localized to just here
	let values: string[] = ["hello", "world", "these", "are", "example", "words", "but", "will", "be", "put", "in", "a", "random", "order"]; // put your words here
	datasetList.push({ // add to the list of datasets, will be autorendered so don't worry
		name: "example dataset", // display name in dropdown
		id: "exampledataset", // just remove spaces from name and keep in a similar format to already implemented datasets
		values: values, // plug in our string list from above as our dictionary
		language: "english", // what language is the dataset in? for us, it's english
		generatorFunction: (count: number) => { // number of words or tokens is supplied as count
			return repeatGenerator( // repeat the generator function "count" times and combine with spaces
				count, // how many times to run the supplied function
				(anotherCount) => randChoice(values) // the function to run, here we just choose a random value from values 
			);
		}
	});
})();
// once you're done writing (or making tweaks to) all of this, you can test it in inspect element, via:
// importDataset({path:"js/datasets/example.js", local:true});
// this imports the dataset from the local path corresponding to the compiled js file from `npx tsc`, and marks it as a local file (so that we don't have to use fetch api to fetch a remote url)
// to actually keep it in miniTS, you can either:
// 	a) submit a pull request the miniTypeScript to add it for everyone
// 	b) add your DatasetPath object (the argument for importDataset) into src/main.ts's datasetsToLoad constant
// note you can also use external URLS, like:
// importDataset({path:"https://raw.githubusercontent.com/mechanikate/miniTypeScript/refs/heads/master/js/datasets/example.js", local:false})
// however this won't work locally due to CORS, and so it's better to do this only on the real website
