document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm')
  if (!registerForm) return
  const submitButton = registerForm.querySelector('button[type="submit"]')
  const apiEndpoint = '/api/auth/register'

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
      email: emailInput?.value.trim(),
      password: passwordInput?.value,
      className: classInput?.value.trim(),
    }

    if (!student.firstName || !student.lastName || !student.className || !student.email || !student.password) {
      alert('First name, last name, email, class, and password are required')
      return
    }

    if (student.password.length < 6) {
      alert('Password must be at least 6 characters')
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

      if (payload.token) {
        localStorage.setItem('authToken', payload.token)
      }
      if (payload.user) {
        localStorage.setItem('currentUser', JSON.stringify(payload.user))
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
