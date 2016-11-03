console.log('Started', self);
self.addEventListener('install', function(event) {
  console.log('Installed', event);
  event.waitUntil(
    caches.open('collaborative-record').then(function(cache) {
      return cache.addAll([
        'index.html',
        'activity-history.html',
        'consultation-patient.html',
        'consultations-clinician.html',
        'contacts-patient.html',
        'permissions-clinician.html',
        'security-token.html',
        'summary-family-member.html',
        'summary-patient.html',
        'summary-transport.html',
        'visual-symptom-locator-patient.html',
        'who-i-am-nurse.html',
        'who-i-am-patient.html',
        'assets/css/prototyping-kit.css',
        'assets/css/styles.css',
        'assets/js/prototyping-kit.js',
        'assets/js/collaborative-record.js',
        'assets/img/avatar.svg',
        'assets/img/house.png',
        'assets/img/map.png',
        'assets/img/notification_screen.png',
        'assets/img/person.svg',
        'assets/img/photograph.jpg',
        'assets/img/target_white.png',
        'assets/img/target.svg',
        'assets/img/triangle.svg'
      ]);
    })
  );
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  console.log('Push message received', event);
  // TODO
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
