// Viser forsiden dersom vi er på main.html
if (window.location.pathname.includes("main.html")) {
  // Sørger for at DOM finnes før vi manipulerer noe
  document.addEventListener('DOMContentLoaded', () => {
    // Tallene for topplinjen (kan byttes ut senere)
    const stats = {
      tournamentsHeld: { value: 20, suffix: '+' },
      activePlayers: { value: 150, suffix: '+' },
      gamesRepresented: { value: 12, suffix: '' }
    };

    // Pekere til tallene som skal fylles ut
    const statTargets = {
      tournamentsHeld: document.getElementById('stat-tournaments-held'),
      activePlayers: document.getElementById('stat-active-players'),
      gamesRepresented: document.getElementById('stat-games')
    };

    // Ruller gjennom alle stats og oppdaterer tekst
    Object.entries(statTargets).forEach(([key, el]) => {
      if (!el || !stats[key]) return;
      const { value, suffix } = stats[key];
      el.textContent = `${value}${suffix || ''}`;
    });

    // Viser beskjed om siste registrerte elev
    const showLatestRegistration = () => {
      const container = document.getElementById('user-notification');
      const timeEl = document.getElementById('user-notification-time');
      const messageEl = document.getElementById('user-notification-message');
      if (!container || !timeEl || !messageEl) return;

      // Henter dataen vi lagrer etter registrering
      let latestData = null;
      try {
        latestData = JSON.parse(localStorage.getItem('latestRegistration'));
      } catch (err) {
        latestData = null;
      }
      if (!latestData || !latestData.name) return;

      // Sikrer at timestamp er et tall (ms siden 1970)
      const timestamp = typeof latestData.timestamp === 'number'
        ? latestData.timestamp
        : Date.parse(latestData.timestamp);

      // Konverterer tiden til en kort tekst
      const formatRelativeTime = (timeValue) => {
        if (!timeValue || Number.isNaN(timeValue)) {
          return 'Nylig';
        }
        const diff = Date.now() - timeValue;
        if (diff < 60000) return 'Akkurat nå';
        if (diff < 3600000) {
          const minutes = Math.max(1, Math.floor(diff / 60000));
          return `${minutes} min siden`;
        }
        const hours = Math.max(1, Math.floor(diff / 3600000));
        if (hours < 24) return `${hours} t siden`;
        return new Date(timeValue).toLocaleDateString('no-NO');
      };

      // Setter tekst og viser boksen i 5 sekunder
      timeEl.textContent = formatRelativeTime(timestamp);
      messageEl.textContent = `${latestData.name} har laget en bruker`;
      container.classList.remove('hidden');
      setTimeout(() => {
        container.classList.add('hidden');
      }, 5000);
    };

    // Viser boksen hvis vi har ny registrering lagret
    showLatestRegistration();

    // Henter brukere for å skrive velkomst
    (async () => {
      try {
        const res = await fetch('/users');
        if (!res.ok) throw new Error('Server error');
        const students = await res.json();
        if (students && students.length > 0) {
          // Logger navnet på siste elev i konsollen
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
  });
}