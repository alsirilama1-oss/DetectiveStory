document.addEventListener('DOMContentLoaded', () => {
  const heroGreeting = document.getElementById('heroGreeting')
  if (!heroGreeting) return

  const token = localStorage.getItem('authToken')
  heroGreeting.textContent = token ? 'Laster din personlige hub ...' : 'Registrer deg for din egen profil'

  if (!token) return

  fetch('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error('Ingen brukerdata funnet')
      }
      return response.json()
    })
    .then(user => {
      heroGreeting.textContent = `Velkommen tilbake, ${user.firstName} ${user.lastName} (${user.className})`
    })
    .catch(() => {
      localStorage.removeItem('authToken')
      localStorage.removeItem('currentUser')
      heroGreeting.textContent = 'Registrer deg for din egen profil'
    })
})
