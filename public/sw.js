self.addEventListener('push', function(event) {
  const options = {
    body: 'Pintu Kedaulatan Terbuka! Klaim € 100.000 Anda sekarang.',
    icon: '/icon.png',
    vibrate: [200, 100, 200]
  };
  event.waitUntil(self.registration.showNotification('NEUROSPHERE ALERT', options));
});
