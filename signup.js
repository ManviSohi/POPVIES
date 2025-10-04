const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (localStorage.getItem("username") === username) {
        alert("⚠️ Username already exists! Try a different one.");
        return;
    }

    if (password !== confirmPassword) {
        alert("❌ Passwords do not match!");
        return;
    }

    // Save single username-password pair
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("✅ Account created successfully! Please login.");
    signupForm.reset();
    window.location.href = "login.html"; 
});






