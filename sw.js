const CACHE_NAME = 'knowledge-arc-webinar-v1.0.2';
// Use relative paths for subpath-safe caching
const STATIC_CACHE_URLS = [
  'index.html',
  'manifest.json',
  'favicon.svg',
  // External CDN resources
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/lucide/0.263.1/lucide.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static resources');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .catch((error) => {
        console.error('Cache installation failed:', error);
        // Continue with installation even if some resources fail to cache
        return Promise.resolve();
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName.startsWith('knowledge-arc-webinar-') && cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isNavigate = event.request.mode === 'navigate';
  const isCDN = url.hostname.includes('cdn.tailwindcss.com') ||
                url.hostname.includes('googleapis.com') ||
                url.hostname.includes('cdnjs.cloudflare.com') ||
                url.hostname.includes('gstatic.com');

  // Navigation requests: network first, fallback to cached index.html
  if (isNavigate) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('index.html'))
    );
    return;
  }

  // For non-allowed externals, bypass SW
  if (!isSameOrigin && !isCDN) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          // Cache successful responses, including CORS/opaque
          if (response && response.ok) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch((error) => {
          // For same-origin asset requests, try a generic fallback (index.html for SPA)
          if (isSameOrigin) {
            return caches.match('index.html');
          }
          throw error;
        });
    })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'webinar-registration') {
    event.waitUntil(
      handleWebinarRegistration()
    );
  }
});

// Handle webinar registration sync
function handleWebinarRegistration() {
  return new Promise((resolve) => {
    // This would handle offline form submissions
    // For now, we'll just resolve as the actual form handling
    // would be implemented based on the backend service
    console.log('Handling webinar registration sync');
    resolve();
  });
}

// Push notification handler
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || '웨비나에 대한 새로운 정보가 있습니다.',
    icon: 'icons/icon-192x192.png',
    badge: 'icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || './'
    },
    actions: [
      {
        action: 'view',
        title: '보기',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'dismiss',
        title: '닫기'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Knowledge ARC 웨비나', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const url = event.notification.data?.url || './';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        // If a window is already open, focus it
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Otherwise, open a new window
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
      case 'GET_VERSION':
        event.ports[0].postMessage({ version: CACHE_NAME });
        break;
      case 'CLEAR_CACHE':
        event.waitUntil(
          caches.delete(CACHE_NAME).then(() => {
            event.ports[0].postMessage({ success: true });
          })
        );
        break;
    }
  }
});
