// ✅ Load user from localStorage
let userData = localStorage.getItem("user");
if (!userData) {
  window.location.href = "login.html";
}

let user;
try {
  user = JSON.parse(userData);
} catch (e) {
  localStorage.clear();
  window.location.href = "login.html";
}

// ✅ Set name if element exists
const userName = document.getElementById("userName");
if (userName) {
  userName.textContent = user.name;
}

const userEmail = document.getElementById("userEmail");
if (userEmail) {
  userEmail.textContent = user.email;
}

const userRole = document.getElementById("userRole");
if (userRole) {
  userRole.textContent = user.role;
}

// ✅ Show admin link only if the element exists
const adminLink = document.getElementById("adminLink");
if (adminLink && user.role === "admin") {
  adminLink.style.display = "block";
}

// ✅ Logout function
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
