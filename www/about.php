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
                <a href="/"><img src="images/icon-w.png" class="sotm_logo" />
                <h1>Unofficial Sea of Thieves Map</h1>
                </a>
            </div>
            
        </header>

        <section class="docs">

        <div class="float_toc">
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
            </div>

            <article class="site_margins">
                

            <h2>Controls</h2>
                <aside class="controls">
                
                <h3>Markers</h3>
				<p>click on the buttons on the sidebar to toggle the visibility of the markers on the map</p>
                <ul class="markerbuttons">
                    <li><img src="images/toggle_beacons.png" /> Beacons</li>
                    <li><img src="images/toggle_thrones.png" /> Skeleton Thrones</li>
                    <li><img src="images/toggle_crates.png" /> Cargo Run Desitinations *</li>
                    <li><img src="images/toggle_pigs.png" /> Pigs</li>
                    <li><img src="images/toggle_snakes.png" /> Snakes</li>
                    <li><img src="images/toggle_chickens.png" /> Chickens</li>
                </ul>
                <p class="astrix"><sub>*</sub>Output cargo run destinations are not included on the map. <span>ProTip: if your cargo run destination is an outpost, the first letter of the name of the person you need to deliver it to is the name of the shop they're in.</span></p>
                <p class="astrix">Animal locations are not 100% gauranteed. It's possible for them to not spawn. If you need to, you can reset the island you are at by your whole crew drowning (dying) and being dead at the same time. When you respawn on your ship, it's possible for the animals to reset.</p>
                

                <h3>Island Finder</h3>
                <p>Click the arrow buttons on the sidebar to quickly jump through zoomed in views on islands to find which one has the treasure you're looking for</p>
                <img src="https://cdn.chenzorama.com/images/sot/island_finder.gif" alt="custom markers" class="docimg"/>
				

                <h3>App Controls</h3>
                    <ul class="markerbuttons">
                        <li><img src="images/fullscreen_icon.png" /> Enter Full Screen (web only)</li>
                        <li><img src="images/share_link_icon.png" /> Copy Current Location to Clipboard (share current location)</li>
                        <li><img src="images/info_icon.png" /> This Page</li>
                        <li><img src="images/gear_icon.png" /> Install Map Files to device (app only.) Click for More Details.</li>
                    </ul>

                </aside>

                

                <h2>Features</h2>
                    
                <aside class="features">
                <h3>Sharable Custom Location Markers</h3>
                <img src="https://cdn.chenzorama.com/images/sot/custom_markers.gif" alt="custom markers" class="docimg"/>
                <p>To add a marker, right click the map (mobile users `long press`) to get the context menu.
                    Select Add Marker. This will drop a X Marks the Spot marker. You can drag this to fine tune it's position.
                    This will also add a query variable to the URL. Then to share, copy/paste the URL into your social/communication app of choice. </p>

                <h3>Sharable Map Location</h3> 
                <p>As you move the map about, the URL is adjusted to reflect your current zoom level and location. Copy/paste the the URL into your social/communication app of choice to share with your friends</p>
                <p>Tip hit the share link button to auto copy the current link</p>
                <img src="/images/docs/point_at_share.jpg" alt="point at share example" class="docimg"/>
                <p>Right click and clear markers to remove</p>

                <h3>Find Closest Animals</h3>
                <img src="https://cdn.chenzorama.com/images/sot/closest_example.gif" alt="closest animal" class="docimg"/>
                <p>To find an island with a specific animal, right click the map (mobile users `long press`) to bring up the context menu. Select 'Closest Animal'.
                This will highlight the closest island with your selected animal and also drop a boat icon indicating the direction. (Also, a dialog will pop up with a text heading.)</p>

                <p>click the highlighted island or right click and clear markers to remove</p>


				

				<h3>Responsive and Mobile Ready</h3>
				<p>This has been designed with mobile in mind so you can run this on your phone or tablet for easy use while out on the seas</p>

				<h3>Progressive Web App</h3>
				<p>Save to your homescreen on your mobile device for easier and offline access.</p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/fKyggX8MCQ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>To save all files and have the app work offline, click the gear icon, then press the install button. Wait for the install to finish. This will require approx 120 MB of space to store the map files. </p> 


				<h3>Open Source</h3>
				<p>All the code is here: <a href="https://github.com/Chenzo/sea-of-thieves-map" target="_blank">https://github.com/Chenzo/sea-of-thieves-map</a> and all the map tiles are here: <a href="https://github.com/Chenzo/sea-of-thieves-map-map" target="_blank">https://github.com/Chenzo/sea-of-thieves-map-map</a>.</p>
                <p>Have at it</p>
                
                </aside>


            </article>


            <footer >

                <article class="site_margins">
				<h3>Having trouble, find a bug?</h3>
                <p>To quickly contact me, hit me up on twitter: <a href="https://twitter.com/1Chenzo" target="_blank">https://twitter.com/1Chenzo</a></p>
                <p>Or if you're so inclined, open a ticket here: <a href="https://github.com/Chenzo/sea-of-thieves-map/issues" target="_blank">https://github.com/Chenzo/sea-of-thieves-map/issues</a></p>

                Thanks! Fair seas!

                </article>
            </footer>
            
        </section>
    </body>
</html>