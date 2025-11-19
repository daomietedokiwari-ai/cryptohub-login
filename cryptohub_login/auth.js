// Simple Login / Signup using LocalStorage

function showSignup() {
  document.getElementById("signupBox").style.display = "block";
  document.getElementById("loginBox").style.display = "none";
}

function showLogin() {
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

async function hash(text) {
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  return Array.from(new Uint8Array(hashBuffer)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

async function signup() {
  let email = document.getElementById("signupEmail").value;
  let pass = document.getElementById("signupPassword").value;
  if (!email || !pass) return alert("Fill all fields");

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[email]) return alert("User already exists");

  users[email] = await hash(pass);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful!");
  showLogin();
}

async function login() {
  let email = document.getElementById("loginEmail").value;
  let pass = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[email]) return alert("User not found");

  let hashed = await hash(pass);
  if (hashed !== users[email]) return alert("Incorrect password");

  localStorage.setItem("loggedIn", email);
  window.location = "dashboard.html";
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location = "index.html";
}

// Protect Dashboard
if (location.pathname.includes("dashboard.html")) {
  if (!localStorage.getItem("loggedIn")) {
    window.location = "index.html";
  }
}
