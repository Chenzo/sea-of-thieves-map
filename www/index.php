<?php 
include "includes/globals.php";

$appClass = "";
$isApp = false;

if ($static == "true") {
    ob_start();
    $appClass = "app";
    $isApp = true;
}

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><?= $title; ?></title>

        <?php if ($isApp) { 
            include "includes/meta_app.php";
        } else {
            include "includes/meta_web.php";
            include "includes/gtm.php";
            echo '<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">';
        }
        ?>
        
        <link rel="stylesheet" href="css/vendor/leaflet.css" />
        <link rel="stylesheet" href="css/vendor/leaflet.search.css" />
        <link rel="stylesheet" href="css/styles.css?v=<?= CACHE_BUSTER ?>" /> <!-- ?v=<?= CACHE_BUSTER ?> -->

    </head>
    <body class="home <?= $appClass; ?>">

        <section class="sotm_wrapper">

            <aside class="sidebar">

                <button class="left-panel-toggle js-toggle-panel icon icon-arrow-left"></button>

                <a href="/"><img src="images/icon-w.png" class="sotm_logo" /></a>


                <div class="island-finder buttonGroup">
                    <img src="images/map_finder_icon.png" class="mapfinder_image" />
                    <button type="button" data-dir="left" class="js-searchforisland"><span class="icon icon-arrow1_left"></span></button>
                    <button type="button" data-dir="right" class="js-searchforisland"><span class="icon icon-arrow1_right"></span></button>
                </div>

                <div class="buttonGroup">
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
                    <img src="images/downloadicon.png" id="install-button" />
                    <span>install</span>
                </div>

                <div class="icons">
                    <a href="https://github.com/Chenzo/sea-of-thieves-map" target="_blank"><img src="images/github-round.png" /></a>
                    <a href="https://twitter.com/1Chenzo" target="_blank"><img src="images/twitter-round.png" /></a>
                    <p><?= $version; ?></p>
                </div>
            </aside>

            <article>
                <div class="floating_dialog">~</div>
                <div id="mapid"></div>
            </article>

        </section>



        <?php include "includes/settings.php"; ?>

        

        <script src="js/vendor/leaflet.js"></script>
        <script src="js/vendor/leaflet-search.min.js"></script>
        <script src="js/vendor/L.SimpleGraticule-sot.js"></script>
        <script src="js/vendor/leaflet-hash.js"></script>
        <script src="js/vendor/jquery-3.3.1.min.js"></script>
        <script src="js/sotm.js?v=<?= CACHE_BUSTER ?>"></script> 

        <?php if ($isApp) { ?>
            <script type="text/javascript" src="cordova.js"></script>
            <script type="text/javascript" src="js/index.js"></script>
        <?php } ?>

    </body>
</html>


<?php 
    if ($static == "true") {
        $theHTML = ob_get_contents(); 

        //do whatever you need to do to the html, save it to a seperate file, email it, etc
        file_put_contents("index.html",$theHTML);
        ob_flush();
    }
?>
