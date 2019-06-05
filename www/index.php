<?php 

include "includes/globals.php";

?>
<!-- ****************************************************** -->
<!-- want all the code? It's all open source! -->
<!-- go here: https://github.com/Chenzo/sea-of-thieves-map -->
<!-- or @ me on twitter: https://twitter.com/1Chenzo -->
<!--
                       ______
                    .-"      "-.
                   /            \
       _          |              |          _
      ( \         |,  .-.  .-.  ,|         / )
       > "=._     | )(__/  \__)( |     _.=" <
      (_/"=._"=._ |/     /\     \| _.="_.="\_)
             "=._ (_     ^^     _)"_.="
                 "=\__|IIIIII|__/="
                _.="| \IIIIII/ |"=._
      _     _.="_.="\          /"=._"=._     _
     ( \_.="_.="     `--------`     "=._"=._/ )
      > _.="                            "=._ <
     (_/                                    \_)
-->
<!-- YARRRRRRR!!!! -->
<!-- ****************************************************** -->
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><?= $title; ?></title>
        <meta name="robots" content="INDEX,FOLLOW,NOODP" />
        <link rel="canonical" href="https://seaofthievesmap.chenzorama.com" />
        <meta name="description" content="<?= $descr; ?>" />
        <meta name="keywords" content="<?= $keywords; ?>" />
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
        
        <link rel="apple-touch-startup-image" href="/images/favicon/apple-launch-2048x2732.jpg">
        <!-- iPhone Xs Max (1242px x 2688px) --> 
        <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" href="/images/favicon/apple-launch-1242x2688.jpg"> 
        <!-- iPhone Xr (828px x 1792px) --> 
        <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" href="/images/favicon/apple-launch-828x1792.jpg"> 
        <!-- iPhone X, Xs (1125px x 2436px) --> 
        <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="/images/favicon/apple-launch-1125x2436.jpg"> 
        <!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) --> 
        <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="/images/favicon/apple-launch-1242x2208.jpg"> 
        <!-- iPhone 8, 7, 6s, 6 (750px x 1334px) --> 
        <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="/images/favicon/apple-launch-750x1334.jpg">  
        <!-- iPad Pro 12.9" (2048px x 2732px) --> 
        <link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" href="/images/favicon/apple-launch-2048x2732.jpg"> 
        <!-- iPad Pro 11” (1668px x 2388px) --> 
        <link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" href="/images/favicon/apple-launch-1668x2388.jpg"> 
        <!-- iPad Pro 10.5" (1668px x 2224px) --> 
        <link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" href="/images/favicon/apple-launch-1668x2224.jpg"> 
        <!-- iPad Mini, Air (1536px x 2048px) --> 
        <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" href="/images/favicon/apple-launch-1536x2048.jpg">


        <script>

            if ("serviceWorker" in navigator) {
                if (navigator.serviceWorker.controller) {
                    console.log("[PWA Builder] active service worker found, no need to register");
                } else {
                    // Register the service worker
                    navigator.serviceWorker
                    .register("service-worker.js", {
                        scope: "./"
                    })
                    .then(function (reg) {
                        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
                    });
                }
            }

        </script>


        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

        <link rel="stylesheet" href="css/vendor/leaflet.css" />
        <!-- <link rel="stylesheet" href="css/vendor/leaflet.search.css" /> -->
        <link rel="stylesheet" href="css/styles.css?v=<?= CACHE_BUSTER ?>" /> <!-- ?v=<?= CACHE_BUSTER ?> -->

    </head>
    <body class="home">

		<!-- The Modal -->
		<div id="islandModal" class="modal">

			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-header">
					<span class="close closeModal">&times;</span>
					<span id="islandModalTitre" class="modal-title-island"></span>
					<span id="islandModalType" class="modal-type-island"></span>
					<div id="islandModalAnimals">
						
					</div>
				</div>
				<img id="islandModalImg" class="islandModalImg" src="" />
			</div>

		</div>
		
        <section class="sotm_wrapper">


            <aside class="sidebar left">

                <div id="findbox" class="searchbox_space"></div>

                <fieldset>
                <input class="filter-search-input js-filter-search" placeholder= "Find..." type="text" size="9">
                <button class="search-cancel js-clear-search" tabindex="-1"><span>⊗</span></button>
                </fieldset>
                <div class="list_of_places">
                    <ul class="list_of_islands">

                    </ul>
                </div>

                <div class="filter_space js-filter_space">

                    <div class="filter_toggle">
                        <button class="js-showfilters">FILTERS</button>
                    </div>


                    <div class="filter_buttons">
                        <label class="switch js-toggle-filter" data-filter="throne">
                            <input type="checkbox" checked>
                            <span class="slider round"><div class="switch_label">Thrones</div></span>
                        </label> 
                        <label class="switch cargoruns js-toggle-filter" data-filter="cargorun">
                            <input type="checkbox" checked>
                            <span class="slider round"><div class="switch_label">Cargo Runs</div></span>
                        </label> 
                        <label class="switch beacons js-toggle-filter" data-filter="beacon">
                            <input type="checkbox" checked>
                            <span class="slider round"><div class="switch_label">Beacons</div></span>
                        </label> 
                    </div>

                </div>
                

            </aside>

            <article>
                <div class="floating_dialog">~</div>
                <div id="mapid"></div>
            </article>



            <aside class="sidebar right">

                <button class="left-panel-toggle js-toggle-panel icon icon-arrow-left"></button>

                <a href="/"><img src="images/icon-w.png" class="sotm_logo" /></a>

                <div class="buttonGroup">
                    <fieldset class="toggle talltales">
                        <input type="checkbox" id="talltales" class="js-toggleMarkers" name="talltales"
                value="talltales" />
                        <label for="talltales" title="Show Tall Tales"></label>
                    </fieldset>
                    <fieldset class="toggle beacons">
                        <input type="checkbox" id="beacons" class="js-toggleMarkers" name="beacons"
                value="beacons" />
                        <label for="beacons" title="Show Beacons"></label>
                    </fieldset>
                    <fieldset class="toggle thrones">
                        <input type="checkbox" id="thrones" class="js-toggleMarkers" name="thrones"
                value="thrones" />
                        <label for="thrones" title="Show Thrones"></label>
                    </fieldset>
                    <fieldset class="toggle cargoruns">
                        <input type="checkbox" id="cargoruns" class="js-toggleMarkers" name="cargoruns"
                value="cargoruns" />
                        <label for="cargoruns" title="Show Cargo Run"></label>
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

                <div class="island-finder buttonGroup">
                    <!-- <p>ISLAND FINDER</p> -->
                    <button type="button" class="js-open-islandfinder" title="Island Finder">
                        <img src="images/map_finder_icon.png" class="mapfinder_image" />
                    </button>
                    <!-- <button type="button" data-dir="left" class="js-searchforisland"><span class="icon icon-arrow1_left"></span></button>
                    <button type="button" data-dir="right" class="js-searchforisland"><span class="icon icon-arrow1_right"></span></button> -->
                </div>
                

                <div class="buttonGroup subcontrols">
                    <button class="js-fullscreen web-only">
                        <img src="images/fullscreen_icon.png" class="open_fs" />
                        <img src="images/close_fullscreen_icon.png" class="close_fs" />
                    </button>
                    <button class="js-share"><img src="images/share_link_icon.png" /></button>
                    <a href="/about" target="_blank"><img src="images/info_icon.png" /></a>
                    <button class="js-settings gear app-only"><img src="images/gear_icon.png" /></button>
                </div>

                <div class="installBut buttonGroup" id="installBut">
                    <img src="/images/downloadicon.png" id="install-button" />
                    <span>install</span>
                </div>

                <div class="icons">
                    <a href="https://github.com/Chenzo/sea-of-thieves-map" target="_blank"><img src="images/github-round.png" /></a>
                    <a href="https://twitter.com/1Chenzo" target="_blank"><img src="images/twitter-round.png" /></a>
                    <p><?= $version; ?></p>
                </div>
            </aside>





        </section>



        <?php include "includes/settings.php"; ?>

        

        <script src="js/vendor/leaflet.js"></script>
        <!-- <script src="js/vendor/leaflet-search.min.js"></script> -->
        <script src="js/vendor/L.SimpleGraticule-sot.js"></script>
        <script src="js/vendor/leaflet-hash.js"></script>
        <script src="js/vendor/jquery-3.3.1.min.js"></script>
        <script src="js/vendor/html2canvas.min.js"></script>
        <script src="js/sotm.js?v=<?= CACHE_BUSTER ?>"></script> <!-- ?v=<?= CACHE_BUSTER ?> -->

        
    <script>


</script>


<script id="aa_1">

</script>


<div id="island-finder-overlay" class="ifoverlay js-ifoverlay">
    <span class="close closeModal js-close-if-overlay">&times;</span>

    <div class="overlay_words js-overlay-words"></div>
    <div class="island_list js-island-list">

    </div>
</div>


    </body>
</html>