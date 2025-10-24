# DetectiveStory

# 🌀 Tidslabyrinten

**Et interaktivt eventyrspill laget i HTML og CSS**  
Velkommen til *Tidslabyrinten* – et mystisk tekstspill hvor hvert valg former din skjebne.  
Vil du finne veien ut, eller bli fanget i tiden for alltid?

---

## 🎮 Om spillet

Tidslabyrinten er et valg-basert eventyrspill der du navigerer gjennom portaler, dører og gåter.  
Spilleren må ta kloke valg for å finne veien til **frihet ✨**, og unngå å bli **fanget ⏳**.

Hvert valg fører til en ny side (HTML-fil), og spillet kan spilles direkte i nettleseren.

---

## 🧭 Struktur

Nedenfor finner du den fulle historien og flyten i *Tidslabyrinten*.

```text
START
│
├── Velkommen til spillet!
│   ├── "Du står foran porten til Tidslabyrinten. Er du klar til å gå inn?"
│   └── [Spill] → 1.0
│
└── 1.0 Rom med tre dører
    ├── "Du våkner i et rom uten vinduer. Foran deg står tre store dører."
    │   └── "Velg din vei. Bare én fører deg hjem."
    │
    ├── 1.1 GUL DØR →
    │   ├── "Du går gjennom døren og finner deg selv i et gammelt slott."
    │   ├── "På et bord ligger tre gjenstander: nøkkel, bok og amulett."
    │   │
    │   ├── 2.2 NØKKEL →
    │   │   ├── "Nøkkelen passer til en skjult dør i veggen."
    │   │   ├── "Du åpner den og ser lys på den andre siden."
    │   │   ├── [Gå tilbake til rommet] → 3.1 Kjeller
    │   │   └── Slutt: Frihet ✨
    │   │
    │   ├── 2.3 AMULETT →
    │   │   ├── "Amuletten viser et bilde av et kjent hjem og en sti som leder ut."
    │   │   ├── [Bruk amuletten] → 3.3 Amulettens kraft → Slutt: Frihet ☀️
    │   │   └── [Legg den tilbake] → 2.5 Torget
    │   │
    │   └── 2.4 BOK →
    │       ├── "Når du åpner boken, begynner rommet å riste."
    │       ├── "Et portal åpner seg, og du blir sugd inn!"
    │       └── Slutt: Fanget ⌛
    │
    ├── 1.2 BLÅ DØR →
    │   ├── "Du trer inn i fremtiden. Rundt deg svever biler og roboter."
    │   ├── "Tre veier venter: laboratoriet, torget eller tunnelene."
    │   │
    │   ├── 2.5 TORGET →
    │   │   ├── "Du er på et futuristisk torg. En boks står foran deg."
    │   │   ├── [Åpne boksen] → 3.5 Nøkkelboks
    │   │   └── [Ignorer den] → 2.6 Tunneler
    │   │
    │   ├── 2.6 TUNNELER →
    │   │   ├── "Tunnelene er mørke og fulle av ekko. Langt borte blinker et blått lys."
    │   │   ├── [Følg lyset] → 3.4 Portal
    │   │   └── [Løp tilbake] → 2.5 Torget
    │   │
    │   └── 2.7 LABORATORIUM →
    │       ├── "Du finner et futuristisk laboratorium. Midt i rommet står en blå portal."
    │       ├── [Ja] → 4.1 Frihet ✨
    │       └── [Nei] → 4.2 Fanget ⏳
    │
    └── 1.3 GRØNN DØR →
        ├── "Du går inn i en verden med lysende trær. Tre stier gløder: blå, rød og gyllen."
        │
        ├── 2.8 RØD STI →
        │   ├── "Den røde stien fører til et mørkt tårn."
        │   ├── [Gå inn] → 3.8 Tårn
        │   └── [Gå tilbake] → 1.3 Grønn sti
        │
        ├── 2.9 GYLLEN STI →
        │   ├── "Den gylne stien leder til et sterkt lys."
        │   └── Slutt: Frihet ☀️
        │
        └── 2.10 BLÅ STI →
            ├── "Stien leder til en gammel bro over en dyp kløft."
            ├── [Gå over broen] → 3.6 Bro
            └── [Finn en omvei] → 3.7 Alternativ sti

3.1 KJELLER →
    ├── "Trappen leder ned til et rom fullt av klokker og tannhjul."
    ├── "Midt i rommet står en portal."
    ├── [Gå tilbake] → 2.2 Nøkkel
    └── [Gå gjennom portalen] → 4.1 Frihet

3.3 AMULETTENS KRAFT →
    └── "Lyset leder deg til en dal med en statue: 'Du har funnet tidenes hjerte.'"
        └── Slutt: Frihet ☀️

3.4 PORTAL →
    ├── "Du trer inn i portalen — og våkner i ditt eget rom."
    ├── "Du er fri fra Tidslabyrinten!"
    └── Slutt: Frihet

3.5 NØKKELBOKS →
    ├── "Inne i boksen finner du en nøkkel med et solsymbol."
    ├── [Bruk nøkkelen] → 3.1 Kjeller
    └── [Legg den tilbake] → 2.5 Torget

3.8 TÅRN →
    ├── "I tårnet finner du et gammelt timeglass. Sandet gløder som gull."
    ├── [Knus det] → 4.2 Fanget
    └── [Snu timeglasset] → 4.1 Frihet

4.1 FRIHET ✨
    ├── "Lyset omslutter deg. Du er fri fra Tidslabyrinten!"
    └── [Spill igjen]

4.2 FANGET ⏳
    ├── "Tiden stopper. Du er fanget i labyrinten for alltid..."
    └── [Prøv igjen]
