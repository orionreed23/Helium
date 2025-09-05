const CORRECT_OTP = '123456';

document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email-input').value;

    console.log(`Sending OTP to ${email}... (Simulated)`);
    
    document.getElementById('email-step').style.display = 'none';
    document.getElementById('otp-step').style.display = 'block';

    const otpMessage = document.getElementById('otp-message');
    otpMessage.textContent = `A 6-digit code has been sent to ${email}.`;

    setTimeout(() => {
        document.querySelector('.otp-input').focus();
    }, 100);
});

document.getElementById('otp-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const otpInputs = document.querySelectorAll('.otp-input');
    let enteredOTP = '';
    otpInputs.forEach(input => {
        enteredOTP += input.value;
    });

    if (enteredOTP === CORRECT_OTP) {
        document.getElementById('otp-step').style.display = 'none';
        document.getElementById('password-step').style.display = 'block';
    } else {
        alert('Incorrect OTP. Please try again.');
        otpInputs.forEach(input => input.value = '');
        document.querySelector('.otp-input').focus();
    }
});

document.getElementById('password-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    if (newPassword.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }
    
    console.log('Password reset successful! (Simulated)');
    alert('Password reset successful! You can now log in with your new password.');
    window.location.href = 'login.html';
});

document.querySelector('.resend-link a').addEventListener('click', function(event) {
    event.preventDefault();
    const email = document.getElementById('email-input').value;
    console.log(`Resending OTP to ${email}... (Simulated)`);
    alert('OTP has been resent. Please check your email.');
});

document.addEventListener('DOMContentLoaded', () => {
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === e.target.maxLength && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
});