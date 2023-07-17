
document.getElementById("login-btn").addEventListener("click", function(event) {
    event.preventDefault();
    const form = document.getElementById("login");
    
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }

    form.addEventListener("submit", handleFormSubmit);
})

