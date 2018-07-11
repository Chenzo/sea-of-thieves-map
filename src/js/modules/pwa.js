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


export {isOnline};