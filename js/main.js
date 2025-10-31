// Når man trykker på "Registrer"
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const student = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    class: document.getElementById('class').value,
  };

  // Lagre data i localStorage (mini database)
  let students = JSON.parse(localStorage.getItem('students')) || [];
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));

  // Gå videre til hovedsiden
  window.location.href = "main.html";
});


// === MAIN PAGE LOGIC ===
if (window.location.pathname.includes("main.html")) {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  if (students.length > 0) {
    const lastStudent = students[students.length - 1];
    console.log("Velkommen, " + lastStudent.firstName + " " + lastStudent.lastName + "!");
  }
}
