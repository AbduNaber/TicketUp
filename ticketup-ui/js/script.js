function getInputValues() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log("Username: " + username);
  console.log("Password: " + password);
}

const togglePassword = document.querySelector('#toggle-password');
const passwordInput = document.querySelector('#password');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    const imgSrc = type === 'password' ? '../assets/icons/eye_opened.png' : '../assets/icons/eye_closed.png';
    togglePassword.setAttribute('src', imgSrc);
});

