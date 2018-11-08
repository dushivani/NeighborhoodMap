const isLocalhost = Boolean(
  window.location.hostname === 'localhost'
    || window.location.hostname === '[::1]'
    || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
);

export default function register() {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);

        // Add some additional logging to localhost
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://goo.gl/SC7cgQ'
          );
        });
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      
      if (!navigator.serviceWorker.controller) {
        return;
      }

      // Check if there is a waiting worker if so then inform the user about the update
      if (registration.waiting) {
        updateReady(registration.waiting);
        return;
      }

      // Check if there is a installing service worker if so then track it's state
      if (registration.installing) {
        const installingWorker = registration.installing;
        trackInstalling(installingWorker);
        return;
      }

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        trackInstalling(installingWorker);
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });

  /**
   * This fires when the service worker controlling this page
   * changes
   */
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}

function checkValidServiceWorker(url) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(url)
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404
        || response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(url);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}

/**
 * listen for the installing service worker state
 * and if installed we inform the user about update
 */
function trackInstalling(installingWorker) {
  installingWorker.addEventListener('statechange', () => {
    // newWorker.state has changed
    if (installingWorker.state === 'installed') {
      if (navigator.serviceWorker.controller) {
        // At this point, the old content will have been purged and
        // the fresh content will have been added to the cache.
        // It's the perfect time to display a "New content is
        // available; please refresh." message in your web app.
        console.log('New content is available; please refresh.');
        updateReady(installingWorker);
      } else {
        // At this point, everything has been precached.
        // It's the perfect time to display a
        // "Content is cached for offline use." message.
        console.log('Content is cached for offline use.');
      }
    }
  });
}

function updateReady(worker) {
  let userConsent = false;
  userConsent = window.confirm('New version available. Do you want to update?');
  if (!userConsent) return;
  // tell the service worker to skipWaiting
  // console.log('updateSW');
  worker.postMessage('updateSW');
}
