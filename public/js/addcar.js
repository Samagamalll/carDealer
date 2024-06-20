document.getElementById('registrationForm').addEventListener('submit', function(event) {
    let isValid = true;
  
    // Username Validation
    const usernameInput = document.getElementById('username');
    const usernameError = document.getElementById('usernameError');
    if (usernameInput.value.trim() === '') {
      usernameError.textContent = 'Username is required';
      isValid = false;
    } else {
      usernameError.textContent = '';
    }
  
    // Email Validation
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'Invalid email format';
      isValid = false;
    } else {
      emailError.textContent = '';
    }
  
    // Password Validation
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    if (passwordInput.value.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters long';
      isValid = false;
    } else {
      passwordError.textContent = '';
    }
  
    // Confirm Password Validation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (confirmPasswordInput.value !== passwordInput.value) {
      confirmPasswordError.textContent = 'Passwords do not match';
      isValid = false;
    } else {
      confirmPasswordError.textContent = '';
    }
  
    if (!isValid) {
      event.preventDefault(); // Prevent form submission if there are validation errors
    }
  });
  
