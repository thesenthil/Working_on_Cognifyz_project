document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const strengthText = document.getElementById("pass-strength");
  const errorMsg = document.getElementById("error-msg");
  const userNameDisplay = document.getElementById("user-name");

  // Client-side Routing
  function showPage(route) {
    document.getElementById("register-page").classList.add("hidden");
    document.getElementById("success-page").classList.add("hidden");

    if (route === "#register") {
      document.getElementById("register-page").classList.remove("hidden");
    } else if (route === "#success") {
      document.getElementById("success-page").classList.remove("hidden");
    } else {
      location.hash = "#register";
    }
  }

  window.addEventListener("hashchange", () => {
    showPage(location.hash);
  });

  // Initial route
  showPage(location.hash || "#register");

  // Password Strength Indicator
  password.addEventListener("input", () => {
    const val = password.value;
    if (val.length < 6) {
      strengthText.textContent = "Weak (min 6 characters)";
      strengthText.style.color = "red";
    } else if (!/\d/.test(val) || !/[A-Z]/.test(val)) {
      strengthText.textContent = "Moderate (add a number and uppercase)";
      strengthText.style.color = "orange";
    } else {
      strengthText.textContent = "Strong 💪";
      strengthText.style.color = "green";
    }
  });

  // Form validation
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorMsg.textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = password.value;
    const confirm = confirmPassword.value;

    if (pass !== confirm) {
      errorMsg.textContent = "Passwords do not match!";
      return;
    }

    if (pass.length < 6 || !/\d/.test(pass) || !/[A-Z]/.test(pass)) {
      errorMsg.textContent = "Password must be at least 6 characters long and include a number and an uppercase letter.";
      return;
    }

    userNameDisplay.textContent = name;
    location.hash = "#success";
    form.reset();
    strengthText.textContent = "";
  });
});
