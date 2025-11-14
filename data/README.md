# students.json format

Fil: `data/students.json`

```json
[
  {
    "id": "uuid",
    "username": "fornavn eller brukernavn",
    "name": "visningsnavn",
    "firstName": "Fornavn",
    "lastName": "Etternavn",
    "class": "Klassekode",
    "createdAt": "ISO-dato"
  }
]
```

Backend legger også til `passwordHash`, men den fjernes når dataen sendes til klienten.