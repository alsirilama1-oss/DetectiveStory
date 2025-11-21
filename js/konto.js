document.addEventListener('DOMContentLoaded', () => {
  const fullNameEl = document.getElementById('fullName')
  const classBadgeEl = document.getElementById('classBadge')
  const rankValueEl = document.getElementById('rankValue')
  const winsEl = document.getElementById('wins')
  const playedEl = document.getElementById('played')
  const hoursEl = document.getElementById('hours')
  const logoutBtn = document.getElementById('logoutBtn')
  const editBtn = document.getElementById('editBtn')
  const uploadBtn = document.getElementById('uploadBtn')

  const currentStudentId = localStorage.getItem('currentStudentId')

  if (!currentStudentId) {
    window.location.href = 'index.html'
    return
  }

  async function fetchCurrentUser() {
    const response = await fetch(`/api/students/${currentStudentId}`)

    if (response.status === 404 || response.status === 400) {
      localStorage.removeItem('currentStudentId')
      localStorage.removeItem('currentUser')
      window.location.href = 'index.html'
      return null
    }

    if (!response.ok) {
      throw new Error('Kunne ikke hente brukeren, database er nede?')
    }

    return response.json()
  }

  function applyProfile(user) {
    if (!user) return
    fullNameEl.textContent = `${user.firstName} ${user.lastName}`
    classBadgeEl.textContent = user.className || 'Ukjent'
    rankValueEl.textContent = user.rank ?? '#12'
    winsEl.textContent = user.wins ?? '4'
    playedEl.textContent = user.played ?? '18'
    hoursEl.textContent = user.hours ?? '42'
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  fetchCurrentUser()
    .then(user => applyProfile(user))
    .catch(err => {
      console.error(err)
      fullNameEl.textContent = 'Gjest'
      classBadgeEl.textContent = 'Ingen klasse'
    })

  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentStudentId')
    window.location.href = 'index.html'
  })

  editBtn?.addEventListener('click', () => {
    alert('Rediger-profil: kommer snart - dette er demo.')
  })

  uploadBtn?.addEventListener('click', () => {
    alert('Last opp avatar: kommer snart - dette er demo.')
  })
})
