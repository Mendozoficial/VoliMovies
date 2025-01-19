document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const contentSection = document.getElementById('content');
    const authSection = document.getElementById('auth');

    const users = JSON.parse(localStorage.getItem('users')) || [];

    registerBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if (username && password) {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Usuario registrado con éxito');
        }
    });

    loginBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            authSection.style.display = 'none';
            contentSection.style.display = 'block';
            fetchMovies();
        } else {
            alert('Nombre de usuario o contraseña incorrectos');
        }
    });

    function fetchMovies() {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=TU_API_KEY')
            .then(response => response.json())
            .then(data => {
                const movieList = document.getElementById('movieList');
                data.results.forEach(movie => {
                    const movieDiv = document.createElement('div');
                    movieDiv.className = 'movie';
                    movieDiv.innerHTML = `<h3>${movie.title}</h3><p>${movie.overview}</p>`;
                    movieList.appendChild(movieDiv);
                });
            });
    }
});
