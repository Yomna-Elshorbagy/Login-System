/****************************GENERAL************************ */
let signupNameInput = document.getElementById("userName");
let signupEmailInput = document.getElementById("userEmail");
let signupPasswordInput = document.getElementById("userPassword");
let loginEmailInput = document.getElementById("loginEmail");
let loginPasswordInput = document.getElementById("loginPassword");
let submitBtnSignup = document.getElementById("signupBtn");
let submitBtnLogin = document.getElementById("loginBtn");

let allSignupUsers = [];

if (localStorage.getItem("usersData") !== null) {
  allSignupUsers = JSON.parse(localStorage.getItem("usersData"));
}

function saveLoggedInUser(user) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
}
function validationInputs(element) {
  let regex = {
    userName: /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/,
    userEmail: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };
  let text = element.value;
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
/****************************SIGN UP************************ */
function signupIsEmpty() {
  if (
    signupNameInput.value == "" ||
    signupEmailInput.value == "" ||
    signupPasswordInput.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function signUp(event) {
  event.preventDefault();

  if (!signupIsEmpty()) {
    document.getElementById("content").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }

  if (validationInputs(signupNameInput) && validationInputs(signupEmailInput)) {
    let data = {
      userName: signupNameInput.value.trim(),
      userEmail: signupEmailInput.value.trim(),
      userPassword: signupPasswordInput.value.trim(),
    };

    let existingUser = allSignupUsers.find(
      (user) => user.userEmail === data.userEmail
    );
    if (existingUser) {
      document.getElementById("content").innerHTML =
        '<span class="text-danger m-3">Email already exists</span>';
      return false;
    }
    allSignupUsers.push(data);
    localStorage.setItem("usersData", JSON.stringify(allSignupUsers));

    document.getElementById("content").innerHTML =
      '<span class="text-success m-3">sucess</span>';

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1500);
  } else {
    document.getElementById("content").innerHTML =
      '<span class="text-danger m-3">Invalid input</span>';
  }
}

/**************************** login ************************ */
function loginIsEmpty() {
  return loginEmailInput.value == "" || loginPasswordInput.value == "";
}

function logIn(event) {
  event.preventDefault();
  if (loginIsEmpty()) {
    document.getElementById("content").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }
  let email = loginEmailInput.value.trim();
  let password = loginPasswordInput.value.trim();

  let user = allSignupUsers.find(
    (user) => user.userEmail === email && user.userPassword === password
  );
  if (user) {
    saveLoggedInUser(user);
    window.location.href = "/home.html";
  } else {
    document.getElementById("content").innerHTML =
      '<span class="text-danger m-3">InCorrect UserName Or Password</span>';
  }
}

/**************************** Home ************************ */

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  document.getElementById(
    "userName"
  ).textContent = `Welcome, ${loggedInUser.userName}!`;
} else if (
  !loggedInUser &&
  !window.location.pathname.includes("index.html") &&
  !window.location.pathname.includes("signup.html")
) {
  window.location.href = "/index.html";
}

/**************************** log out ************************ */

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "/index.html";
}
