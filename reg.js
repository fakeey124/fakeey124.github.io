document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("Sending data to the server...");

    try {
        const response = await fetch('/register', { // Replace with your actual backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            console.log('Registration successful! Password sent to server for secure processing.');
            alert('Registration successful!');
        } else {
            const error = await response.json();
            console.error('Registration failed:', error.message);
            alert('Registration failed.');
        }
    } catch (error) {
        console.error('Network or server error:', error);
        alert('An error occurred during registration.');
    }
});
