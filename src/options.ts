var focusOnType: boolean = true;
function loadListeners() {
	document.getElementById("focusOnTypeToggle").addEventListener("click", e => focusOnType = (<HTMLInputElement> document.getElementById("focusOnTypeToggle")).checked);
}
