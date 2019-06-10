/* PWA Stuff */

var dataCacheName = 'sotm-v2.8';
var isOnline = false;
var filesToCacheCount = 100;

var isInWebAppiOS = (window.navigator.standalone == true);
var isInWebAppChrome = (window.matchMedia('(display-mode: standalone)').matches);

console.log("pwa-scripts firing");

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
        .then(function(reg) { 
            console.log('Service Worker Registered with scope: ', reg.scope);

            reg.addEventListener('updatefound', () => {
                console.log("update detected");
                console.log(isInWebAppiOS, isInWebAppChrome);
                
                if (isInWebAppiOS || isInWebAppChrome) {
                    if (confirm('There is an update to the application. Would you like to update?')) {
                        console.log("trigger update");
                    } else {
                        console.log("they don't want the update");
                    }
                }
            });
         });
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
var words;

window.addEventListener('beforeinstallprompt', (event) => {

    console.log("beforeinstallprompt - showme!!!");
    // Prevent Chrome <= 67 from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update the install UI to notify the user app can be installed
    document.querySelector('#installBut').classList.add("showme");
});

console.log("waiting for beforeinstallprompt");
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


var fileCount = 0;
var currentCount = 0;

var installer = function() {
    console.log("installer called");

    var request = new XMLHttpRequest();
    request.open('GET', 'data/mapfile_list.json?cb=5', true);

    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        var mapFileList = data.mapFileList;
        fileCount = mapFileList.length;
        console.log(mapFileList.length);
        cacheTheFiles(mapFileList, filesToCacheCount);
    } else {
        // We reached our target server, but it returned an error
        console.log("ERROR");
    }
    };

    request.onerror = function() {
    // There was a connection error of some sort
        console.log("ERROR");
    };

    request.send();
};


var cacheTheFiles = function(fileArray, numberOfFiles) {
    
    caches.open(dataCacheName)
    .then(cache => {
      return cache.addAll(fileArray.slice(currentCount, currentCount+numberOfFiles));
    }).catch(function(err) {
      console.log("ERROR!?!!!");
      console.log(err);
    }).then(function() {
        console.log("DONE CACHING: ", currentCount,numberOfFiles, fileCount);
        var installPercent = 0;
        if (currentCount == fileCount) {
            console.log("REALLY REALLY done caching");
            words = "Install Complete: "
            installPercent = 100;
        } else { 
            if (currentCount + numberOfFiles > fileCount) {
                numberOfFiles = fileCount - currentCount;
                currentCount = fileCount;
            } else {
                currentCount+= numberOfFiles;
            }
            installPercent = (currentCount/fileCount) * 100;
            cacheTheFiles(fileArray, numberOfFiles);
            words = "Installing: ";
        }
        console.log(installPercent);
        $(".js-percent").html(words + Math.ceil(installPercent) + "%");
    }).catch(function(err) {
        console.log("Error Type 4");
        console.log(err);
    });
};



export {isOnline, installer};