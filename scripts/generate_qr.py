import qrcode
import json
import os

def create_identity_qr(citizen_id):
    # Data yang tertanam dalam QR (Fungsi Transaksi & Warisan)
    payload = {
        "identity": citizen_id,
        "org": "NeuroSphere",
        "manifest": "ENPE-LUV-INDEUR",
        "verification": "LVI-VALIDATED"
    }
    
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(json.dumps(payload))
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    path = os.path.expanduser(f"~/indienation-neurosphere/identity_assets/qrcodes/{citizen_id}.png")
    img.save(path)
    
    print(f"------------------------------------------------")
    print(f"SUCCESS: QR Code Created for {citizen_id}")
    print(f"Location: {path}")
    print(f"Status  : SCANNABLE & INHERITABLE")
    print(f"------------------------------------------------")

if __name__ == "__main__":
    # Mencetak QR untuk pionir pertama sebagai bukti
    create_identity_qr("NS-000001")
