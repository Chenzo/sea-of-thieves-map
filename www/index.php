<?php 
include "includes/globals.php";
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><?= $title; ?></title>
        <meta name="robots" content="INDEX,FOLLOW,NOODP" />
        <link rel="canonical" href="https://seaofthievesmap.chenzorama.com" />
        <meta name="description" content="<?= $descr; ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <link rel="manifest" href="manifest.json">

        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="application-name" content="SoT Map">
        <meta name="apple-mobile-web-app-title" content="SoT Map">
        <meta name="theme-color" content="#222222">
        <meta name="msapplication-navbutton-color" content="#222222">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="msapplication-starturl" content="/">
        

        <link rel="apple-touch-icon" href="images/sotm_logo-192.png">
        <link rel="apple-touch-icon" sizes="192x192" href="images/sotm_logo-192.png">
        <link rel="apple-touch-icon" sizes="512x512" href="images/sotm_logo-512.png">


        <link rel="icon" type="image/png" sizes="32x32" href="images/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="images/favicon/favicon-16x16.png">

        <link rel="mask-icon" href="images/favicon/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#222222">        
        


        <?php include "includes/gtm.php"; ?>

        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

        <link rel="stylesheet" href="css/vendor/leaflet.css?v=<?= CACHE_BUSTER ?>"" />
        <link rel="stylesheet" href="css/vendor/leaflet.search.css?v=<?= CACHE_BUSTER ?>"" />
        <link rel="stylesheet" href="css/styles.css?v=<?= CACHE_BUSTER ?>"" />

    </head>
    <body class="home">

        <section class="sotm_wrapper">

            <aside class="sidebar">
                <a href="/"><img src="images/icon-w.png" class="sotm_logo" /></a>


                <div class="island-finder buttonGroup">
                    <p>ISLAND FINDER</p>
                    <button type="button" data-dir="left" class="js-searchforisland">&#x21E0</button>
                    <button type="button" data-dir="right" class="js-searchforisland">&#x21E2</button>
                </div>

                <div class="buttonGroup">
                    <fieldset class="toggle thrones">
                        <input type="checkbox" id="thrones" class="js-toggleMarkers" name="thrones"
                value="thrones" />
                        <label for="thrones" title="Show Thrones"></label>
                    </fieldset>
                    <!-- <fieldset>
                        <input type="checkbox" id="outposts" class="js-toggleMarkers" name="outposts"
                value="outposts" />
                        <label for="outposts">Outposts</label>
                    </fieldset> -->
                    <fieldset class="toggle pigs">
                        <input type="checkbox" id="pigs" class="js-toggleMarkers" name="pigs"
                value="outposts" />
                        <label for="pigs" title="Show Pigs"></label>
                    </fieldset>
                    <fieldset class="toggle snakes">
                        <input type="checkbox" id="snakes" class="js-toggleMarkers" name="snakes"
                value="outposts" />
                        <label for="snakes" title="Show Snakes"></label>
                    </fieldset>
                    <fieldset class="toggle chickens">
                        <input type="checkbox" id="chickens" class="js-toggleMarkers" name="chickens"
                value="outposts" />
                        <label for="chickens" title="Show Chickens"></label>
                    </fieldset>
                </div>

                <div class="buttonGroup subcontrols">
                    <button class="js-fullscreen"><img src="images/fullscreen_icon.png" /></button>
                    <button class="js-share"><img src="images/share_link_icon.png" /></button>
                </div>

                <div class="installBut buttonGroup" id="installBut">
                    <img src="/images/downloadicon.png" id="install-button" />
                    <span>install</span>
                </div>

                <div class="icons">
                    <a href="https://github.com/Chenzo/sea-of-thieves-map" target="_blank"><img src="images/github-round.png" /></a>
                    <a href="https://twitter.com/1Chenzo" target="_blank"><img src="images/twitter-round.png" /></a>
                </div>
            </aside>

            <article>
                <div class="floating_dialog">~</div>
                <div id="mapid"></div>
            </article>

        </section>

        <script src="js/vendor/leaflet.js"></script>
        <script src="js/vendor/leaflet-search.min.js"></script>
        <script src="js/vendor/L.SimpleGraticule-sot.js?v=<?= CACHE_BUSTER ?>"></script>
        <script src="js/vendor/leaflet-hash.js?v=<?= CACHE_BUSTER ?>""></script>
        <script src="js/vendor/jquery-3.3.1.min.js"></script>
        <script src="js/sotm.js?v=<?= CACHE_BUSTER ?>""></script>

        
    <script>


</script>


    </body>
</html>