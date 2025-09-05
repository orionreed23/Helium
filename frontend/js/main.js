const quotes = document.querySelectorAll('.quote');
let index = 0;

function showNextQuote() {
    quotes[index].classList.remove('active');
    index = (index + 1) % quotes.length;
    quotes[index].classList.add('active');
}

setTimeout(() => {
    setInterval(showNextQuote, 5000);
}, 1000);

function togglePasswordVisibility(id) {
    const passwordInput = document.getElementById(id);
    const toggleIcon = passwordInput.nextElementSibling.querySelector('img');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = '../assets/icons/eye close.svg';
        toggleIcon.alt = 'Hide Password';
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = '../assets/icons/eye open.svg';
        toggleIcon.alt = 'Show Password';
    }
}

// === Allowed email domains ===
const allowedDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'protonmail.com',
    'aol.com', 'icloud.com', 'zoho.com', 'gmx.com', 'helium.com'
];

function validateEmailDomain(email) {
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
}

// === Login handling ===
const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const password = document.getElementById('login-password').value;

        if (!validateEmailDomain(email)) {
            alert('Invalid email domain. Allowed: Gmail, Yahoo, Hotmail, Outlook, Protonmail, iCloud, Zoho, GMX, or Helium.');
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                window.location.href = '/dashboard';
            } else {
                alert(result.message || 'Invalid email or password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Server error. Try again later.');
        }
    });
}

// === Signup handling ===
const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document.getElementById('signup-firstname').value.trim();
        const lastName = document.getElementById('signup-lastname').value.trim();
        const email = document.getElementById('signup-email').value.trim().toLowerCase();
        const password = document.getElementById('signup-password').value;

        if (!validateEmailDomain(email)) {
            alert('Invalid email domain. Allowed: Gmail, Yahoo, Hotmail, Outlook, Protonmail, iCloud, Zoho, GMX, or Helium.');
            return;
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                alert('Account created successfully. You can now log in.');
                window.location.href = '/login';
            } else {
                alert(result.message || 'Signup failed.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Server error. Try again later.');
        }
    });
}
