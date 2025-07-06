var focusOnType = true;
function loadListeners() {
    document.getElementById("focusOnTypeToggle").addEventListener("click", e => focusOnType = document.getElementById("focusOnTypeToggle").checked);
}
