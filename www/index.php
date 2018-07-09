<?php 

$descr = "An open source dynamic map of the sea from the Rare's game Sea of Thieves. With island locator and markers for important locations like Skeleton Thrones and animal locations and whatnot.";
$title = "Unofficial Sea Of Thieves Map";

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><?= $title; ?></title>
        <meta name="robots" content="INDEX,FOLLOW,NOODP" />
        <link rel="canonical" href="https://seaofthievesmap.chenzorama.com" />
        <meta name="description" content="<?= $descr; ?>" />

        <link rel="apple-touch-icon" sizes="180x180" href="images/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="images/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="images/favicon/favicon-16x16.png">
        <link rel="manifest" href="images/favicon/site.webmanifest">
        <link rel="mask-icon" href="images/favicon/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        
        <?php include "includes/gtm.php"; ?>


        <link rel="stylesheet" href="css/vendor/leaflet.css" />
        <link rel="stylesheet" href="css/vendor/leaflet.search.css" />
        <link rel="stylesheet" href="css/styles.css" />

    </head>
    <body class="home">

        <section>

            <aside class="sidebar">
                <img src="images/icon-w.png" />


                <div class="island-finder">
                    <p>ISLAND FINDER</p>
                    <button type="button" data-dir="left" class="js-searchforisland">&#x21E0</button>
                    <button type="button" data-dir="right" class="js-searchforisland">&#x21E2</button>
                </div>

                <div class="icons">
                    <!-- <object class="github" data="images/github.svg" type="image/svg+xml">
                    <img src="yourfallback.jpg" />
                    </object> -->
                </div>
            </aside>

            <article>
                <div id="mapid"></div>
            </article>

        </section>

        <script src="js/vendor/leaflet.js"></script>
        <script src="js/vendor/leaflet-search.min.js"></script>
        <script src="js/vendor/L.SimpleGraticule-sot.js"></script>
        <script src="js/vendor/jquery-3.3.1.min.js"></script>
        <script src="js/sotm.js"></script>
        
    </body>
</html>