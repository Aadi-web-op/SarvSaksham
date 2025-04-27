document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching
    const tabs = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            document.querySelector(`#${tab.dataset.tab}Form`).classList.add('active');
        });
    });

    // Password Visibility Toggle
    const togglePasswordButtons = document.querySelectorAll('.show-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Update icon
            const eyeIcon = button.querySelector('.eye-icon');
            if (type === 'text') {
                eyeIcon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                `;
            } else {
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                `;
            }
        });
    });

    // Form Validation and Submission
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Add your login logic here
        console.log('Login attempt:', { email, password });
        
        // Simulate successful login
        window.location.href = 'index.html';
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Add your signup logic here
        console.log('Signup attempt:', { name, email, password });
        
        // Simulate successful signup
        window.location.href = 'index.html';
    });
});

// Google Sign-In Handler
function handleGoogleSignIn(response) {
    // Add your Google sign-in logic here
    console.log('Google Sign-In Response:', response);
    
    // Simulate successful login
    window.location.href = 'index.html';
}

// Add smooth animations
document.querySelectorAll('input, button').forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.transform = 'translateY(-2px)';
        element.style.transition = 'transform 0.2s ease';
    });

    element.addEventListener('mouseout', () => {
        element.style.transform = 'translateY(0)';
    });
});

// Add form transition animations
const forms = document.querySelectorAll('.auth-form');
forms.forEach(form => {
    form.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    form.addEventListener('transitionend', () => {
        if (!form.classList.contains('active')) {
            form.style.display = 'none';
        }
    });
});