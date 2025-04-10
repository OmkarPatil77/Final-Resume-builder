document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Password strength meter (for signup only)
    const passwordInput = document.getElementById('password');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthMeter && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = checkPasswordStrength(password);
            
            // Reset classes
            strengthMeter.classList.remove('weak', 'medium', 'strong');
            
            if (password.length === 0) {
                strengthText.textContent = 'Password strength';
            } else if (strength === 1) {
                strengthMeter.classList.add('weak');
                strengthText.textContent = 'Weak password';
            } else if (strength === 2) {
                strengthMeter.classList.add('medium');
                strengthText.textContent = 'Medium password';
            } else {
                strengthMeter.classList.add('strong');
                strengthText.textContent = 'Strong password';
            }
        });
    }
    
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const errorElement = document.getElementById('login-error');
            
            // Clear previous errors
            errorElement.textContent = '';
            
            fetch('php/login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = data.redirect || 'index.html';
                } else {
                    errorElement.textContent = data.message || 'Login failed. Please try again.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorElement.textContent = 'An error occurred. Please try again later.';
            });
        });
    }
    
    // Handle signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const errorElement = document.getElementById('signup-error');
            
            // Clear previous errors
            errorElement.textContent = '';
            
            // Check if terms are accepted
            if (!formData.get('terms')) {
                errorElement.textContent = 'You must agree to the Terms of Service and Privacy Policy';
                return;
            }
            
            fetch('php/signup.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = data.redirect || 'login.html?registered=true';
                } else {
                    errorElement.textContent = data.message || 'Registration failed. Please try again.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorElement.textContent = 'An error occurred. Please try again later.';
            });
        });
    }
    
    // Check for successful registration message
    if (window.location.search.includes('registered=true')) {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            const successMessage = document.createElement('div');
            successMessage.className = 'auth-success';
            successMessage.textContent = 'Registration successful! Please log in.';
            loginForm.parentNode.insertBefore(successMessage, loginForm);
        }
    }
});

// Helper function to check password strength
function checkPasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) {
        strength += 1;
    }
    
    // Complexity checks
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
        strength += 1;
    }
    
    if (/[0-9]/.test(password)) {
        strength += 1;
    }
    
    if (/[^A-Za-z0-9]/.test(password)) {
        strength += 1;
    }
    
    return Math.min(3, strength);
}