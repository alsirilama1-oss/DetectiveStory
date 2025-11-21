document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm')
  if (!registerForm) return
  const submitButton = registerForm.querySelector('button[type="submit"]')
  const apiEndpoint = '/api/students'

  registerForm.addEventListener('submit', async event => {
    event.preventDefault()

    const firstNameInput = document.getElementById('firstName')
    const lastNameInput = document.getElementById('lastName')
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const classInput = document.getElementById('class')

    const student = {
      firstName: firstNameInput?.value.trim(),
      lastName: lastNameInput?.value.trim(),
      username: emailInput?.value.trim(),
      password: passwordInput?.value,
      className: classInput?.value.trim(),
    }

    if (!student.firstName || !student.lastName || !student.className || !student.username || !student.password) {
      alert('Fornavn, etternavn, e-post, klasse og passord mA? fylles ut')
      return
    }

    if (student.password.length < 6) {
      alert('Passord mA? vA?re minst 6 tegn')
      return
    }

    if (submitButton) {
      submitButton.disabled = true
      submitButton.textContent = 'Registrerer...'
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.error || 'Kunne ikke lagre registreringen')
      }

      if (payload?.id) {
        localStorage.setItem('currentStudentId', payload.id)
        localStorage.setItem('currentUser', JSON.stringify(payload))
      }
      window.location.href = 'main.html'
    } catch (err) {
      alert(err.message)
    } finally {
      if (submitButton) {
        submitButton.disabled = false
        submitButton.textContent = 'Registrer'
      }
    }
  })
})
