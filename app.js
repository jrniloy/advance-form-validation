"use strict";

const form = document.getElementById("form");
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

const username = document.getElementById("name");
const email = document.getElementById("email");
const siteURL = document.getElementById("url");
const phone = document.getElementById("tel");

const unMessage = document.querySelector(".username-message");
const phoneMessage = document.querySelector(".phone-message");
const emailMessage = document.querySelector(".email-message");
const URLMessage = document.querySelector(".url-message");

const passwordMessage1 = document.querySelector(".password-message1");
const passwordMessage2 = document.querySelector(".password-message2");
const passwordMessage3 = document.querySelector(".password-message3");

const password2Message = document.querySelector(".password2-message");

///////////////////////////////////////////////////////
//  Regular Expressions
const emailRegeX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
const passwordRegeX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

// Bangladeshi Phone number Validation
const bdPhoneRegeX = /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/;

const URLRegeX =
  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

/////////////////////////////////////////////////////////////
/// Event listners
username.addEventListener("input", validateUserName);
phone.addEventListener("input", validatePhoneNumber);
email.addEventListener("input", validateEmail);
siteURL.addEventListener("input", validateURL);
password1El.addEventListener("input", validatePassword);
password2El.addEventListener("input", passwordsMatch);

///////////////////////////////////////////////////////////
let isValid = false;
let passMatch = false;

///  User name validation
function validateUserName(e) {
  if (!e.target.name === "name") return;

  if (e.target.value.length >= 3) {
    isValid = true;
    e.target.classList.add("accepted");
    e.target.classList.remove("rejected");
    unMessage.textContent = "✅ Username should be atleast 3 characters long.";
  } else {
    e.target.classList.add("rejected");
    e.target.classList.remove("accepted");
    unMessage.textContent = "🚩 Username should be atleast 3 characters long.";
  }
}

/// Phone number validation
function validatePhoneNumber(e) {
  if (!e.target.name === "phone") return;

  if (bdPhoneRegeX.test(e.target.value)) {
    isValid = true;
    e.target.classList.add("accepted");
    e.target.classList.remove("rejected");
    phoneMessage.textContent =
      "✅ Phone number must be atleast 11 characters long.";
  } else {
    e.target.classList.add("rejected");
    e.target.classList.remove("accepted");
    phoneMessage.textContent =
      "🚩 Phone number must be atleast 11 characters long.";
  }
}

/// Email validation
function validateEmail(e) {
  if (!e.target.name === "email") return;

  if (emailRegeX.test(e.target.value)) {
    isValid = true;
    e.target.classList.add("accepted");
    e.target.classList.remove("rejected");
    emailMessage.textContent = "✅ Valid Email";
  } else {
    e.target.classList.add("rejected");
    e.target.classList.remove("accepted");
    emailMessage.textContent = "🚩 Valid Email";
  }
}

/// URL validation
function validateURL(e) {
  if (!e.target.name === "url") return;

  if (URLRegeX.test(e.target.value)) {
    isValid = true;
    e.target.classList.add("accepted");
    e.target.classList.remove("rejected");
    URLMessage.textContent = "✅ Valid URL";
  } else {
    e.target.classList.add("rejected");
    e.target.classList.remove("accepted");
    URLMessage.textContent = "🚩 Valid URL";
  }
}

/// Password validation
function validatePassword() {
  if (/^[a-zA-Z0-9]{6,}$/.test(password1El.value)) {
    passwordMessage1.textContent =
      "✅ Password must be atleast 6 characters long.";

    password1El.classList.remove("rejected");
    password1El.classList.add("accepted");
    isValid = true;
  }
  /[A-Z]{1}/.test(password1El.value) &&
    (passwordMessage2.textContent = "✅ Contains 1 uppercase letter.");
  /[a-z]{1}/.test(password1El.value) &&
    (passwordMessage3.textContent = "✅ Contains 1 lowercase letter.");

  if (!/^[a-zA-Z0-9]{6,}$/.test(password1El.value)) {
    passwordMessage1.textContent =
      "🚩 Password must be atleast 6 characters long.";

    password1El.classList.add("rejected");
    password1El.classList.remove("accepted");
  }
  !/[A-Z]{1}/.test(password1El.value) &&
    (passwordMessage2.textContent = "🚩 Contains 1 uppercase letter.");
  !/[a-z]{1}/.test(password1El.value) &&
    (passwordMessage3.textContent = "🚩 Contains 1 lowercase letter.");
}

///   Check if Passwords Match
function passwordsMatch() {
  if (password1El.value === password2El.value) {
    passMatch = true;
    password2Message.textContent = "✅ Passwords matched";

    password2El.classList.remove("rejected");
    password2El.classList.add("accepted");
    return;
  } else {
    password2Message.textContent = "🚩 Make sure both passwords match";

    password2El.classList.add("rejected");
    password2El.classList.remove("accepted");
    return;
  }
}

/////////////////////////////////////////////////////////////
/// Storing Form Data
function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    websiteURL: form.url.value,
    password: form.password.value,
  };

  //    Do something with user data
  console.log(user);
}

function processFormData(e) {
  e.preventDefault();

  //    Submit Data
  if (isValid && passMatch) {
    storeFormData();

    messageContainer.style.borderColor = "green";
    message.style.color = "green";
    message.textContent = "Submitted Successfully";
  }
}

//  Event Listener
form.addEventListener("submit", processFormData);
