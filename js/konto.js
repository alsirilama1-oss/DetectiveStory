// Enkel logikk: henter siste registrerte bruker fra localStorage (fra register-siden vi laget).
// Hvis ingen bruker finnes: vis "Gjest".
(function () {
  // Hent brukere (array) fra localStorage
  const students = JSON.parse(localStorage.getItem('students')) || [];

  const user = students.length ? students[students.length - 1] : null;

  const fullNameEl = document.getElementById('fullName');
  const classBadgeEl = document.getElementById('classBadge');
  const rankValueEl = document.getElementById('rankValue');
  const winsEl = document.getElementById('wins');
  const playedEl = document.getElementById('played');
  const hoursEl = document.getElementById('hours');

  if (user) {
    fullNameEl.textContent = `${user.firstName} ${user.lastName}`;
    classBadgeEl.textContent = user.class || 'Ukjent';
  } else {
    fullNameEl.textContent = 'Gjest';
    classBadgeEl.textContent = 'Ingen klasse';
  }

  // Dummy-statistikk (kan byttes ut med faktisk backend senere)
  // For variasjon: lag små tilfeldige tall
  const randWins = Math.max(1, Math.floor(Math.random() * 8));
  const randPlayed = Math.max(3, Math.floor(Math.random() * 40));
  const randHours = Math.max(10, Math.floor(Math.random() * 200));
  winsEl.textContent = randWins;
  playedEl.textContent = randPlayed;
  hoursEl.textContent = randHours;

  // Rank basert på wins (enkelt eksempel)
  rankValueEl.textContent = `#${Math.max(1, 50 - randWins * 3)}`;

  // Logout-knapp (enkelt: fjern localStorage og gå til index)
  document.getElementById('logoutBtn').addEventListener('click', function () {
    // Vil du ikke slette alt? her sletter vi ikke alle data, bare simulerer logout:
    // localStorage.removeItem('students');
    window.location.href = 'index.html';
  });

  // Edit & upload (placeholder)
  document.getElementById('editBtn').addEventListener('click', function () {
    alert('Rediger-profil: kommer snart — dette er demo.');
  });
  document.getElementById('uploadBtn').addEventListener('click', function () {
    alert('Last opp avatar: kommer snart — dette er demo.');
  });
})();
