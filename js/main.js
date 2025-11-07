// === MAIN PAGE LOGIC ===
if (window.location.pathname.includes("main.html")) {
  (async () => {
    try {
      const res = await fetch('/api/students');
      if (!res.ok) throw new Error('Server error');
      const students = await res.json();
      if (students && students.length > 0) {
        const lastStudent = students[students.length - 1];
        console.log("Velkommen, " + lastStudent.firstName + " " + lastStudent.lastName + "!");
      }
    } catch (err) {
      // Fallback til localStorage hvis server ikke kjører
      const students = JSON.parse(localStorage.getItem('students')) || [];
      if (students.length > 0) {
        const lastStudent = students[students.length - 1];
        console.log("Velkommen, " + lastStudent.firstName + " " + lastStudent.lastName + "!");
      }
    }
  })();
}
