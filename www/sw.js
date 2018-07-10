"use strict";

importScripts('/js/vendor/sw-toolbox.js');
toolbox.precache(['index.php','style/style.css']);
toolbox.router.get('/images/*', toolbox.cacheFirst);
toolbox.router.get('/*', toolbox.networkFirst, { 
    networkTimeoutSeconds: 5
});