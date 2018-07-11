/* PWA Stuff */

var isOnline = false;

//console.log("--- hello???");
window.addEventListener('load', function() {
    //console.log("window load");
    function updateOnlineStatus(event) {
        console.log("online offline update");
        if (navigator.onLine) {
            // handle online status
            console.log('went online');
        } else {
            // handle offline status
            console.log(' went offline');
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});




if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(function() { console.log('Service Worker Registered'); });
}

if (navigator.onLine) {
    //console.log('online');
    isOnline = true;
} else {
    //console.log('offline');
    isOnline = false;
}


let deferredPrompt;
var btnInstall = document.querySelector('#install-button');

window.addEventListener('beforeinstallprompt', (event) => {

    console.log("beforeinstallprompt - showme!!!");
    // Prevent Chrome <= 67 from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update the install UI to notify the user app can be installed
    document.querySelector('#installBut').classList.add("showme");
});

btnInstall.addEventListener('click', () => {

    document.querySelector('#installBut').classList.remove("showme");
    // Show the modal add to home screen dialog
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Clear the saved prompt since it can't be used again
      deferredPrompt = null;
    });
  });

  window.addEventListener('appinstalled', (evt) => {
    console.log('a2hs', 'installed');
  });


export {isOnline};