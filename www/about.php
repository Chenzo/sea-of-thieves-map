<?php 
include "includes/globals.php";
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><?= $title; ?></title>
        <meta name="robots" content="INDEX,FOLLOW,NOODP" />
        <link rel="canonical" href="https://seaofthievesmap.chenzorama.com/about" />
        <meta name="description" content="<?= $descr; ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


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
        <link rel="stylesheet" href="css/styles.css?v=<?= CACHE_BUSTER ?>"" />

    </head>
    <body class="documentation">

        <header>
            <div class="site_margins">
                <a href="/"><img src="images/icon-w.png" class="sotm_logo" /></a>
            </div>
        </header>

        <section class="docs">
            <article class="site_margins">
                <h1>Sea of Thieves Map Documentation</h1>

                <h2>Features</h2>
                    <ul class="featurelist">
                        <li>Sharable Custom Location Markers</li>
                        <li>Sharable Map Location</li>
                        <li>Find closest animals</li>
                        <li>Island Finder</li>
                        <li>Markers
                            <ul>
                                <li>Pigs</li>
                                <li>Snakes</li>
                                <li>Chickens</li>
                                <li>Skeleton Thrones</li>
                            </ul>
                        </li>
                        <li>Responsive and Mobile Ready</li>
                        <li>Progressive Web App</li>
                        <li>Open Source</li>
                    </ul>

                <h3>Sharable Custom Location Markers</h3>
                <p>To add a marker, right click the map (mobile users `long press`) to get the context menu.
                    Select Add Marker. This will drop a X Marks the Spot marker. You can drag this to fine tune it's position.
                    This will also add a query variable to the URL. Then to share, copy/paste the URL into your social/communication app of choice. </p>

                <h3>Sharable Map Location</h3> 
                <p>As you move the map about, the URL is adjusted to reflect your current zoom level and location. Copy/paste the the URL into your social/communication app of choice to share with your friends</p>
                <p>Right click and clear markers to remove</p>

                <h3>Find Closest Animals</h3>
                <p>To find an island with a specific animal, right click the map (mobile users `long press`) to bring up the context menu. Select 'Closest Animal'.
                This will highlight the closest island with your selected animal and also drop a boat icon indicating the direction. (Also, a dialog will pop up with a text heading.)</p>

                <p>click the highlighted island or right click and clear markers to remove</p>

				<h3>Island Finder</h3>
				<p>Click the arrow buttons on the sidebar to quickly jump through zoomed in views on islands to find which one has the treasure you're looking for</p>

				<h3>Markers</h3>
				<p>click on the animal or throne markers on the sidebar to toggle the visibility of the markers on the map</p>

				<h3>Responsive and Mobile Ready</h3>
				<p>This has been designed with mobile in mind so you can run this on your phone or tablet for easy use while out on the seas</p>

				<h3>Progressive Web App</h3>
				<p>Save to your homescreen on your mobile device for easier and offline access.</p>
				<p>Note: This is still slightly wonky. I'm working on fixing that...</p>

				<h3>Open Source</h3>
				<p>All the code is here: <a href="https://github.com/Chenzo/sea-of-thieves-map" target="_blank">https://github.com/Chenzo/sea-of-thieves-map</a> and all the map tiles are here: <a href="https://github.com/Chenzo/sea-of-thieves-map-map" target="_blank">https://github.com/Chenzo/sea-of-thieves-map-map</a>.</p>
				<p>Have at it</p>

				<h3>Having trouble, find a bug?</h3>
                <p>To quickly contact me, hit me up on twitter: <a href="https://twitter.com/1Chenzo" target="_blank">https://twitter.com/1Chenzo</a></p>
                <p>Or if you're so inclined, open a ticket here: <a href="https://github.com/Chenzo/sea-of-thieves-map/issues" target="_blank">https://github.com/Chenzo/sea-of-thieves-map/issues</a></p>

                Thanks! Fair seas!

            </article>
        </section>
    </body>
</html>