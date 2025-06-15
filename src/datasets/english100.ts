// 100 common English words from https://www.ef.edu/english-resources/english-vocabulary/top-100-words/  
(() => {
	let values = ["a","about","all","also","and","as","at","be","because","but","by","can","come","could","day","do","even","find","first","for","from","get","give","go","have","he","her","here","him","his","how","i","if","in","into","it","its","just","know","like","look","make","man","many","me","more","my","new","no","not","now","of","on","one","only","or","other","our","out","people","say","see","she","so","some","take","tell","than","that","the","their","them","then","there","these","they","thing","think","this","those","time","to","two","up","use","very","want","way","we","well","what","when","which","who","will","with","would","year","you","your"];
	datasetList.push({name: "english 100", id: "english100", values: values, generatorFunction: (count) => repeatGenerator(count, (c) => randChoice(values))});
})();
