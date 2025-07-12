// Admin-only check
const userData = localStorage.getItem("user");
if (!userData) window.location.href = "login.html";

const user = JSON.parse(userData);
if (user.role !== "admin") {
  alert("Access denied. Admins only.");
  window.location.href = "dashboard.html";
}

// Simulated user list (replace with backend fetch)
const users = [
  { name: "Neema Kageni", email: "neema@quickclinic.com", role: "admin" },
  { name: "Dr. Kimani", email: "kimani@clinic.com", role: "doctor" },
  { name: "Joy W.", email: "joy@patient.com", role: "patient" }
];

// Display user counts
const total = users.length;
const doctors = users.filter(u => u.role === "doctor").length;
const patients = users.filter(u => u.role === "patient").length;

document.getElementById("totalUsers").textContent = total;
document.getElementById("totalDoctors").textContent = doctors;
document.getElementById("totalPatients").textContent = patients;
document.getElementById("totalAppointments").textContent = "4"; // mock

// Render table
const tbody = document.querySelector("#userTable tbody");
users.forEach(user => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${user.name}</td><td>${user.email}</td><td>${user.role}</td>`;
  tbody.appendChild(row);
});
