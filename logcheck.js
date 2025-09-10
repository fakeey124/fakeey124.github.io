if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '/login.html';
    }

        // A function to simulate logging out
function logout() {
        localStorage.setItem('isLoggedIn', 'false');
        window.location.href = '/login.html';
    }
