// Når man trykker på "Registrer"
document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const student = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    class: document.getElementById('class').value,
  };

  try {
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });

    if (!res.ok) throw new Error('Server error');
  } catch (err) {
    // Fallback til localStorage hvis server ikke kjører
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
  }

  // Gå videre til hovedsiden
  window.location.href = "main.html";
});

