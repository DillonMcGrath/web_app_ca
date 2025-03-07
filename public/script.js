document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.getElementById("popup").style.display = "block";
    }, 1000); // 1 second delay
});

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
