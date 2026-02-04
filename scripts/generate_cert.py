import json

cert_data = {
    "title": "Sertifikat Perintis IndieNation",
    "iid": "INDIE-0000000001",
    "message": "Pemegang IID ini adalah pilar pertama peradaban ekonomi baru.",
    "value_anchor": "€100,000",
    "daily_discipline": "€270",
    "issued_at": "2026-02-04"
}

with open('state/founder_certificate.json', 'w') as f:
    json.dump(cert_data, f, indent=2)

print("Sertifikat Berhasil Dibuat di state/founder_certificate.json")
