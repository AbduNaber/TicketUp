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

function getRegisterValues() {
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const mailAddress = document.getElementById('mail-address').value;
  const organizationName = document.getElementById('organization-name').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  console.log("Name: " + name);
  console.log("Surname: " + surname);
  console.log("Mail Address: " + mailAddress);
  console.log("Organization Name: " + organizationName);
  console.log("Password: " + password);
  console.log("Password Confirm: " + confirmPassword);
}

const togglePassword1 = document.querySelector('#toggle-password');
const passwordInput1 = document.querySelector('#password');

togglePassword1.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    const imgSrc = type === 'password' ? '../assets/icons/eye_opened.png' : '../assets/icons/eye_closed.png';
    togglePassword1.setAttribute('src', imgSrc);
});