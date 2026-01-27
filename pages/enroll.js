import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const guideData = {
  ID: { title: "PENDAFTARAN PIONEER", step1: "Silakan masukkan nama lengkap Anda pada kolom yang tersedia.", step2: "Nama telah terdeteksi. Sekarang, tekan tombol Klaim Kedaulatan untuk menerbitkan sertifikat Anda.", success: "Selamat. Sertifikat Anda telah diterbitkan. Simpan QR Code ini sebagai identitas nilai Anda.", placeholder: "NAMA LENGKAP", button: "KLAIM KEDAULATAN", certTitle: "SERTIFIKAT KEDAULATAN" },
  EN: { title: "PIONEER ENROLLMENT", step1: "Please enter your full name in the provided field.", step2: "Name detected. Now, press the Claim Sovereignty button to issue your certificate.", success: "Congratulations. Your certificate has been issued. Save this QR Code as your value identity.", placeholder: "FULL NAME", button: "CLAIM SOVEREIGNTY", certTitle: "CERTIFICATE OF SOVEREIGNTY" },
  AR: { title: "تسجيل الرائد", step1: "يرجى إدخال اسمك الكامل في الحقل المقدم.", step2: "تم اكتشاف الاسم. الآن، اضغط على زر المطالبة بالسيادة لإصدار شهادتك.", success: "تهانينا. تم إصدار شهادتك. احفظ رمز الاستجابة السريعة هذا كهوية لقيمتك.", placeholder: "الاسم الكامل", button: "مطالبة بالسيادة", certTitle: "شهادة السيادة" },
  ZH: { title: "先锋注册", step1: "请在提供的字段中输入您的全名。", step2: "检测到名称。现在，按下“申请主权”按钮以颁发您的证书。", success: "恭喜。您的证书已颁发。请保存此二维码作为您的价值身份。", placeholder: "全名", button: "申请主权", certTitle: "主权证书" },
  HI: { title: "पायनियर पंजीकरण", step1: "कृपया दिए गए फ़ील्ड में अपना पूरा नाम दर्ज करें।", step2: "नाम का पता चला। अब, अपना प्रमाणपत्र जारी करने के लिए संप्रभुता का दावा करें बटन दबाएं।", success: "बधाई हो। आपका प्रमाणपत्र जारी कर दिया गया है। इस क्यूआर कोड को अपनी मूल्य पहचान के रूप में सहेजें।", placeholder: "पूरा नाम", button: "संप्रभुता का दावा", certTitle: "संप्रभुता प्रमाणपत्र" },
  FR: { title: "INSCRIPTION PIONNIER", step1: "Veuillez entrer votre nom complet dans le champ prévu.", step2: "Nom détecté. Maintenant, appuyez sur le bouton Réclamer la Souveraineté pour émettre votre certificat.", success: "Félicitations. Votre certificat a été émis. Enregistrez ce code QR comme identité de valeur.", placeholder: "NOM COMPLET", button: "RÉCLAMER", certTitle: "CERTIFICAT DE SOUVERAINETÉ" },
  ES: { title: "INSCRIPCIÓN PIONERA", step1: "Por favor, ingrese su nombre completo en el campo proporcionado.", step2: "Nombre detectado. Ahora, presione el botón Reclamar Soberanía para emitir su certificado.", success: "Felicidades. Su certificado ha sido emitido. Guarde este código QR como su identidad de valor.", placeholder: "NOMBRE COMPLETO", button: "RECLAMAR", certTitle: "CERTIFICADO DE SOBERANÍA" },
  DE: { title: "PIONIER-ANMELDUNG", step1: "Bitte geben Sie Ihren vollständigen Namen in das vorgesehene Feld ein.", step2: "Name erkannt. Drücken Sie nun die Taste Souveränität beanspruchen, um Ihr Zertifikat auszustellen.", success: "Herzlichen Glückwunsch. Ihr Zertifikat wurde ausgestellt. Speichern Sie diesen QR-Code als Ihre Wertidentität.", placeholder: "VOLLSTÄNDIGER NAME", button: "BEANSPRUCHEN", certTitle: "SOUVERÄNITÄTSZERTIFIKAT" },
  JP: { title: "パイオニア登録", step1: "提供されたフィールドにフルネームを入力してください。", step2: "名前が検出されました。次に、[主権を主張]ボタンを押して証明書を発行します。", success: "おめでとうございます。証明書が発行されました。このQRコードを価値のアイデンティティとして保存してください。", placeholder: "フルネーム", button: "主張する", certTitle: "主権証明書" },
  KR: { title: "개척자 등록", step1: "제공된 필드에 전체 이름을 입력하십시오.", step2: "이름이 감지되었습니다. 이제 주권 주장 버튼을 눌러 인증서를 발급하십시오.", success: "축하합니다. 인증서가 발급되었습니다. 이 QR 코드를 가치 정체성으로 저장하십시오.", placeholder: "전체 이름", button: "주권 주장", certTitle: "주권 인증서" },
  PT: { title: "INSCRIÇÃO PIONEIRA", step1: "Por favor, insira seu nome completo no campo fornecido.", step2: "Nome detetado. Agora, prima o botão Reivindicar Soberania para emitir o seu certificado.", success: "Parabéns. O seu certificado foi emitido. Guarde este código QR como a sua identidade de valor.", placeholder: "NOME COMPLETO", button: "REIVINDICAR", certTitle: "CERTIFICADO DE SOBERANIA" },
  RU: { title: "РЕГИСТРАЦИЯ", step1: "Пожалуйста, введите свое полное имя в соответствующее поле.", step2: "Имя обнаружено. Теперь нажмите кнопку «Заявить о суверенитете», чтобы выдать сертификат.", success: "Поздравляем. Ваш сертификат выдан. Сохраните этот QR-код как ваше удостоверение личности.", placeholder: "ПОЛНОЕ ИМЯ", button: "ЗАЯВИТЬ", certTitle: "СЕРТИФИКАТ СУВЕРЕНИТЕТА" },
  IT: { title: "ISCRIZIONE PIONIERE", step1: "Inserisci il tuo nome completo nel campo fornito.", step2: "Nome rilevato. Ora, premi il pulsante Rivendica Sovranità per emettere il tuo certificato.", success: "Congratulazioni. Il tuo certificato è stato emesso. Salva questo codice QR come identità di valore.", placeholder: "NOME COMPLETO", button: "RIVENDICA", certTitle: "CERTIFICATO DI SOVRANITÀ" },
  SW: { title: "USAJILI WA PAIANIA", step1: "Tafadhali ingiza jina lako kamili katika uwanja uliotolewa.", step2: "Jina limepatikana. Sasa, bonyeza kitufe cha Dai Ufalme ili kutoa cheti chako.", success: "Hongera. Cheti chako kimetolewa. Hifadhi msimbo huu wa QR kama utambulisho wako wa thamani.", placeholder: "JINA KAMILI", button: "DAI UFALME", certTitle: "CHETI CHA UFALME" }
};

export default function Enroll() {
  const [lang, setLang] = useState('ID');
  const [name, setName] = useState('');
  const [isClaimed, setIsClaimed] = useState(false);
  const [step, setStep] = useState(1);

  const speak = (msg, currentLang) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = getVoiceLang(currentLang);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getVoiceLang = (l) => {
    const map = { ID: 'id-ID', EN: 'en-US', AR: 'ar-SA', ZH: 'zh-CN', HI: 'hi-IN', FR: 'fr-FR', ES: 'es-ES', DE: 'de-DE', JP: 'ja-JP', KR: 'ko-KR', PT: 'pt-BR', RU: 'ru-RU', IT: 'it-IT' };
    return map[l] || 'en-US';
  };

  useEffect(() => {
    speak(guideData[lang].step1, lang);
  }, [lang]);

  const handleInputChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length > 3 && step === 1) {
      setStep(2);
      speak(guideData[lang].step2, lang);
    }
  };

  const handleClaim = () => {
    setIsClaimed(true);
    speak(guideData[lang].success, lang);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#00ff41', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'monospace', textAlign: 'center' }}>
      <header style={{ padding: '15px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {Object.keys(guideData).map(l => (
          <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? '#00ff41' : 'transparent', color: lang === l ? '#000' : '#00ff41', border: '1px solid #00ff41', fontSize: '10px', padding: '4px 8px', cursor: 'pointer' }}>{l}</button>
        ))}
      </header>

      <main style={{ flex: 1, padding: '20px' }}>
        <h2 style={{ letterSpacing: '4px', margin: '40px 0' }}>◈ {guideData[lang].title} ◈</h2>

        {!isClaimed ? (
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: '#fff', marginBottom: '20px', fontSize: '0.9rem' }}>GUIDE: {step === 1 ? guideData[lang].step1 : guideData[lang].step2}</p>
            <input 
              placeholder={guideData[lang].placeholder} 
              onChange={handleInputChange}
              style={{ background: '#000', color: '#00ff41', border: '1px solid #00ff41', padding: '20px', width: '85%', maxWidth: '400px', textAlign: 'center', fontSize: '1.2rem', outline: 'none', boxShadow: step === 2 ? '0 0 15px #00ff41' : 'none' }} 
            />
            <br />
            {step === 2 && (
              <button onClick={handleClaim} style={{ marginTop: '40px', padding: '20px 50px', background: '#00ff41', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', letterSpacing: '2px' }}>
                {guideData[lang].button}
              </button>
            )}
          </div>
        ) : (
          <div style={{ marginTop: '10px', animation: 'fadeIn 2s' }}>
            <div style={{ border: '4px double #fff', padding: '30px', backgroundColor: '#080808', display: 'inline-block', color: '#fff' }}>
              <h3 style={{ borderBottom: '1px solid #fff', paddingBottom: '15px' }}>{guideData[lang].certTitle}</h3>
              <p style={{ fontSize: '1.4rem', margin: '20px 0' }}>{name.toUpperCase()}</p>
              <p style={{ fontSize: '0.8rem' }}>IDENTITY ID: NEURO-{Math.floor(Math.random() * 999999)}</p>
              <p style={{ fontSize: '1.1rem', color: '#00ff41' }}>ALLOCATION: €100.000 STABLE</p>
              <div style={{ background: '#fff', padding: '15px', display: 'inline-block', marginTop: '20px' }}>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VALID_SOVEREIGN_${name}`} alt="QR" />
              </div>
              <p style={{ fontSize: '0.6rem', color: '#888', marginTop: '20px' }}>VERIFIED BY AI GUARD SYSTEM</p>
            </div>
            <br />
            <Link href="/"><button style={{ marginTop: '30px', background: 'none', border: '1px solid #444', color: '#444', padding: '10px 20px', cursor: 'pointer' }}>BACK TO CONTROL ROOM</button></Link>
          </div>
        )}
      </main>

      <footer style={{ padding: '50px 0', borderTop: '1px solid #111' }}>
        <p style={{ color: '#888', margin: '0' }}>Powered by:</p>
        <p style={{ fontWeight: 'bold', margin: '5px 0', fontSize: '1.1rem' }}>INDIENATION Foundation</p>
        <p style={{ fontWeight: 'bold', margin: '5px 0', fontSize: '1.1rem' }}>1001NDONESIA INVESTMENT</p>
      </footer>
      <style jsx>{` @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } `}</style>
    </div>
  );
}
