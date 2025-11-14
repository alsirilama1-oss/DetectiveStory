// Kobler seg på registreringsskjemaet
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Leser inn tekstfeltene
    const student = {
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      class: document.getElementById('class').value.trim()
    };

    // Passordfelt kan være tomt om det mangler i HTML
    const passwordField = document.getElementById('password');
    const password = passwordField ? passwordField.value : '';

    // Payloaden vi sender til backend
    const payload = {
      ...student,
      name: student.firstName,
      password
    };

    // Lagrer info i localStorage slik at main siden kan vise melding
    const saveNotification = () => {
      const fullName = [student.firstName, student.lastName].filter(Boolean).join(' ').trim() || student.firstName || 'Ny elev';
      const latestRegistration = {
        name: fullName,
        timestamp: Date.now()
      };
      localStorage.setItem('latestRegistration', JSON.stringify(latestRegistration));
    };

    try {
      // Forsøker å lagre på server
      const res = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Server error');
      saveNotification();
    } catch (err) {
      // Fallback til localStorage hvis server ikke kjører
      let students = JSON.parse(localStorage.getItem('students')) || [];
      students.push(student);
      localStorage.setItem('students', JSON.stringify(students));
      saveNotification();
    }

    // Ferdig, gå til hovedside
    window.location.href = 'main.html';
  });
}