!function(e){var o={};function t(s){if(o[s])return o[s].exports;var a=o[s]={i:s,l:!1,exports:{}};return e[s].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=e,t.c=o,t.d=function(e,o,s){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:s})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(t.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var a in e)t.d(s,a,function(o){return e[o]}.bind(null,a));return s},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=0)}([function(e,o,t){e.exports=t(2)},function(e,o){window.updateQueryStringParam=function(e,o){var t=[location.protocol,"//",location.host,location.pathname].join(""),s=document.location.search,a=e+"="+o,r="?"+a;if(s){var i=new RegExp("([?&])"+e+"[^&]*"),n=new RegExp("([?&])"+e+"=[^&;]+[&;]?");r=void 0===o||null==o||""==o?(r=s.replace(n,"$1")).replace(/[&;]$/,""):null!==s.match(i)?s.replace(i,"$1"+a):s+"&"+a}r="?"==r?"":r;var l=window.location.hash;window.history.replaceState({},"",t+r+l)},window.websafe=function(e){return e.match(/[a-zA-Z0-9]+/g).join("-").toLowerCase()},window.angle=function(e,o,t,s){var a=s-o,r=t-e;return Math.atan2(a,r)*(180/Math.PI)},window.angle360=function(e,o,t,s){var a=angle(e,o,t,s);return a<0&&(a=360+a),a},window.getCardinalFromDeg=function(e){var o="North";return e>=0&&11.25>e?o="North":e>=11.25&&33.75>e?o="North by North East":e>=33.75&&56.25>e?o="North East":e>=56.25&&78.75>e?o="East by North East":e>=78.75&&101.25>e?o="East":e>=101.25&&123.75>e?o="East by South East":e>=123.75&&146.25>e?o="South East":e>=146.25&&168.75>e?o="South by South East":e>=168.75&&191.25>e?o="South":e>=191.25&&213.75>e?o="South by South West":e>=213.75&&236.25>e?o="South West":e>=236.25&&258.75>e?o="West by South West":e>=258.75&&281.25>e?o="West":e>=281.25&&303.75>e?o="West by North West":e>=303.75&&326.25>e?o="North West":e>=326.25&&348.75>e&&(o="North by North West"),o},window.toggleFullScreen=function(){document.fullScreenElement&&null!==document.fullScreenElement||!document.mozFullScreen&&!document.webkitIsFullScreen?document.documentElement.requestFullScreen?document.documentElement.requestFullScreen():document.documentElement.mozRequestFullScreen?document.documentElement.mozRequestFullScreen():document.documentElement.webkitRequestFullScreen&&document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT):document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen&&document.webkitCancelFullScreen()}},function(e,o,t){"use strict";t.r(o);var s;let a;window.addEventListener("load",function(){function e(e){console.log("online offline update"),navigator.onLine?console.log("went online"):console.log(" went offline")}window.addEventListener("online",e),window.addEventListener("offline",e)}),"serviceWorker"in navigator&&navigator.serviceWorker.register("/service-worker.js").then(function(){console.log("Service Worker Registered")}),s=!!navigator.onLine;var r,i=document.querySelector("#install-button");window.addEventListener("beforeinstallprompt",e=>{console.log("beforeinstallprompt - showme!!!"),e.preventDefault(),a=e,document.querySelector("#installBut").classList.add("showme")}),i.addEventListener("click",()=>{document.querySelector("#installBut").classList.remove("showme"),a.prompt(),a.userChoice.then(e=>{"accepted"===e.outcome?console.log("User accepted the A2HS prompt"):console.log("User dismissed the A2HS prompt"),a=null})}),window.addEventListener("appinstalled",e=>{console.log("a2hs","installed")});var n=0,l=0,c=function(e,o){caches.open("sotm-v1.8").then(t=>t.addAll(e.slice(l,l+o))).catch(function(e){console.log("ERROR!?!!!"),console.log(e)}).then(function(){console.log("DONE CACHING: ",l,o,n);var t=0;l==n?(console.log("REALLY REALLY done caching"),r="Install Complete: ",t=100):(l+o>n?(o=n-l,l=n):l+=o,t=l/n*100,c(e,o),r="Installing: "),console.log(t),$(".js-percent").html(r+Math.ceil(t)+"%")}).catch(function(e){console.log("Error Type 4"),console.log(e)})};t(1);let d=new URL(document.location).searchParams.get("useAlexa");var u,p=0,g=[],h={throne_L:{iconUrl:"/images/markers/throne_marker_l.png",iconSize:[31,40],iconAnchor:[15,40],popupAnchor:[0,-40]},throne_S:{iconUrl:"/images/markers/throne_marker_s.png",iconSize:[31,40],iconAnchor:[15,40],popupAnchor:[0,-40]},cargorun:{iconUrl:"/images/markers/crate_marker.png",iconSize:[31,40],iconAnchor:[15,40],popupAnchor:[0,-45]},beacon:{iconUrl:"/images/markers/beacon_marker.png",iconSize:[31,40],iconAnchor:[15,40],popupAnchor:[0,-45]},talltale:{iconUrl:"/images/markers/tt_marker.png",iconSize:[31,40],iconAnchor:[15,40],popupAnchor:[0,-45]},compass:{iconUrl:"/images/markers/compass.png",iconSize:[50,48],iconAnchor:[25,24]},boat:{iconUrl:"/images/markers/boat_marker.png",iconSize:[50,59],shadowSize:[0,0],iconAnchor:[25,29]},xmarksspot:{iconUrl:"/images/markers/xmarkthespot_marker.png",iconSize:[40,52],iconAnchor:[20,52]}},m=L.icon({iconUrl:"/images/markers/boat_marker.png",iconSize:[50,59],iconAnchor:[25,29]}),f=L.icon({iconUrl:"/images/markers/xmarkthespot_marker.png",shadowUrl:"/images/markers/xmarkthespot_marker.png",iconSize:[40,52],shadowSize:[0,0],iconAnchor:[20,52],shadowAnchor:[0,0],popupAnchor:[0,0]});function k(e,o){var t,s,a=e.loc;if("throne"==o){var r=e.isLarge?" Large":" Small";s=e.title+r+" Skelton Throne",t=e.isLarge?h.throne_L:h.throne_S}else"cargo"==o?(t=h.cargorun,s=e.title+" | Cargo Run"):"beacon"==o?(t=h.beacon,s=e.title+" Beacon"):"talltale"==o&&(t=h.talltale,s=e.title+" | TallTale");var i=e.desc,n="markerIcon "+o+" "+window.websafe(s);return{title:s,marker:new L.Marker(a,{icon:new L.DivIcon({className:n,iconAnchor:t.iconAnchor,iconSize:null,popupAnchor:t.popupAnchor,html:'<img src="'+t.iconUrl+'" alt="">'})}),desc:i}}function w(e){u&&e.removeLayer(u)}function v(e,o){var t=L.marker(e,{icon:f,draggable:!0}).addTo(o);t.on("dragend",function(e){console.log("marker dragend event"),S()}),g.push(t)}function S(){var e=function(){var e,o="";return g.forEach(function(t){e=t.getLatLng().lat+","+t.getLatLng().lng+";",o+=e}),o=window.encodeURIComponent(window.btoa(o))}();updateQueryStringParam("mkrs",e)}var y=[];function C(e,o,t,s){var a={type:e,name:o,classes:t,markerObj:s};y.push(a)}function b(){var e=$(".js-filter-search").val().toLowerCase();e.length>0?($(".list_of_places").addClass("searching"),$(".search-cancel").addClass("searching"),$(".js-placelist").each(function(o,t){$(t).data("name").toLowerCase().indexOf(e)>-1?($(t).addClass("found"),$(t).attr("tabindex",0)):($(t).removeClass("found highlight"),$(t).removeAttr("tabindex"))})):($(".list_of_places").removeClass("searching"),$(".search-cancel").removeClass("searching"))}var j=[],F=[{loc:[-41.819753270587555,62.927539082707604],title:"Lone Cove",coords:"H 6",img:"loneCove.jpg",radius:3,pigs:!0,snakes:!0},{loc:[-69.94175507751075,50.54955884969927],title:"Cannon Cove",coords:"G 10",img:"cannonCove.jpg",radius:4,chickens:!0,pigs:!0},{loc:[-67.62877065330183,65.30062001780092],title:"Rum Runner Isle",coords:"H 9",radius:2,pigs:!0},{loc:[-80.94564356372827,121.30273506665486],title:"The Crooked Masts",coords:"O 11",radius:3,chickens:!0,snakes:!0},{loc:[-29.006074941430732,18.117840198163094],title:"Sailor's Bounty",coords:"C 4",img:"sailorsBounty.jpg",radius:4,chickens:!0,pigs:!0},{loc:[-21.065393452707312,42.86583042922642],title:"Smuggler's Bay",coords:"F 3",img:"smugglersBay.jpg",radius:4,chickens:!0,snakes:!0},{loc:[-22.940799321639105,57.487891142156535],title:"Salty Sands",coords:"G 3",img:"saltySands.jpg",radius:1.5,chickens:!0},{loc:[-28.629490743342114,69.55120761078706],title:"Picaroon Palms",coords:"I 4",img:"picaroonPalms.jpg",radius:1.5,snakes:!0},{loc:[-28.19171579987219,88.62081716840055],title:"Scurvy Isley",coords:"K 4",img:"scurveyIsley.jpg",radius:1.5},{loc:[-28.691820540241682,107.0555642878491],title:"Old Faithful Isle",coords:"M 4",img:"oldFaithfulIsle.jpg",radius:4,chickens:!0,pigs:!0},{loc:[-22.8781029334463,120.48941102991489],title:"Black Sand Atoll",coords:"O 3",radius:1.5,snakes:!0},{loc:[-21.566440856402263,136.5557290968507],title:"Marauder's Arch",coords:"Q 3",radius:3,chickens:!0,pigs:!0},{loc:[-32.44278938865952,32.80535275921895],title:"Sandy Shallows",coords:"D 5",img:"sandyShallows.jpg",radius:1.5,snakes:!0},{loc:[-33.44299886939851,50.23934822463562],title:"Boulder Cay",coords:"G 5",img:"boulderCay.jpg",radius:1.5,chickens:!0},{loc:[-45.00792099044309,24.432035940703415],title:"Keel Haul Fort",coords:"C 6",img:"keelHaulFort.jpg",radius:2,isFortress:!0},{loc:[-48.25860180284481,43.931357643687285],title:"Sanctuary Outpost",coords:"F 7",img:"sanctuaryOutpost.jpg",radius:3,outpost:!0},{loc:[-56.135264556210544,57.616119333511065],title:"Lonely Isle",coords:"G 8",img:"lonelyIsle.jpg",radius:1.5,snakes:!0},{loc:[-55.3851074456563,71.67579309594387],title:"Hidden Spring Keep",coords:"I 8",img:"hiddenSpringKeep.jpg",radius:2,isFortress:!0},{loc:[-41.13192595693288,114.67807920810932],title:"Blind Man's Lagoon",coords:"N 6",radius:1.5,pigs:!0},{loc:[-34.818103609768,126.55069260749704],title:"Shark Fin Camp",coords:"P 5",img:"sharkFinCamp.jpg",radius:1.5,isFortress:!0},{loc:[-42.195761396643945,137.43053681968217],title:"Plunderer's Plight",coords:"Q 6",img:"plunderOutpost.jpg",radius:2,pigs:!0},{loc:[-33.56895462527015,144.36651233641732],title:"Black Water Enclave",coords:"R 5",radius:1.5,chickens:!0},{loc:[-40.819360494201945,93.80847591354413],title:"Kraken's Watchtower",coords:"L 6",radius:2,isFortress:!0},{loc:[-54.197162299085946,105.7433527036019],title:"Dagger Tooth Outpost",coords:"M 8",img:"daggerToothOutpost.jpg",radius:4,outpost:!0},{loc:[-52.32176952270034,125.36404020139321],title:"The Sunken Grove",coords:"P 7",radius:2,pigs:!0,snakes:!0},{loc:[-55.76110247916651,145.1163475274157],title:"Galleon's Grave Outpost",coords:"R 8",img:"galleonGraveOutpost.jpg",radius:3,outpost:!0},{loc:[-64.51072835956577,117.43038960965997],title:"Isle of Last Words",coords:"O 9",radius:1,pigs:!0,snakes:!0},{loc:[-67.69269774083621,130.11909434410913],title:"Skull Keep",coords:"P 9",radius:2,isFortress:!0},{loc:[-71.44348329360741,142.9912651229149],title:"Tri-Rock Isle",coords:"R 10",radius:2,chickens:!0},{loc:[-67.50237,151.430381],title:"Three Paces East Seapost",coords:"S 9",radius:1,isSeapost:!0},{loc:[-51.4375,16.125],title:"The Spoils of Plenty Store",coords:"B 7",img:"theSpoilsOfPlentyStore.jpg",radius:1,isSeapost:!0},{loc:[-75.235017,64.342312],title:"The North Star Seapost",coords:"H 10",radius:1,isSeapost:!0},{loc:[-114.96965,94.435731],title:"Stephen's Spoils",coords:"L 15",img:"stephensSpoils.jpg",radius:1,isSeapost:!0},{loc:[-128.328685,48.139087],title:"The Finest Trading Post",coords:"F 17",img:"theFinestTradingPost.jpg",radius:1,isSeapost:!0},{loc:[-29.844282,120.967678],title:"The Wild Treasures Store",coords:"O 4",radius:1,isSeapost:!0},{loc:[-80.07029006498121,135.55539947884748],title:"Shiver Retreat",coords:"Q 11",radius:2,pigs:!0},{loc:[-78.63248893641892,152.05177368081218],title:"Liar's Backbone",coords:"S 11",radius:2,snakes:!0},{loc:[-92.63542166676478,130.11909434410913],title:"Shark Tooth Key",coords:"P 13",radius:2,pigs:!0},{loc:[-92.19783001894149,144.99082563224394],title:"Kraken's Fall",coords:"R 12",img:"krakenFalls.jpg",radius:4,pigs:!0,snakes:!0},{loc:[-74.94438667929433,102.86928662127767],title:"Shipwreck Bay",coords:"M 10",radius:4,chickens:!0,pigs:!0},{loc:[-58.448248980419464,30.371595953863505],title:"Rapier Cay",coords:"D 8",img:"rapierCay.jpg",radius:1,chickens:!0},{loc:[-66.31539345270731,15.993498563600905],title:"Crescent Isle",coords:"B 9",img:"crescentIsle.jpg",radius:3,pigs:!0,snakes:!0},{loc:[-75.94243588991247,31.746234927654953],title:"Golden Sand Outpost",img:"goldenSandOutpost.jpg",coords:"D 10",radius:3,outpost:!0},{loc:[-81.88115349670785,16.993169376947787],title:"Sea Dog's Rest",coords:"C 11",radius:1.5,pigs:!0},{loc:[-81.6942164761939,60.23384927983136],title:"Twin Groves",coords:"H 11",radius:2,chickens:!0},{loc:[-91.6963112835838,48.48771722300551],title:"Wanderer's Refuge",coords:"F 12",img:"wanderersRefuge.jpg",radius:4,chickens:!0,snakes:!0},{loc:[-91.44625891339905,30.743560286098365],title:"Lagoon of Whispers",coords:"D 12",radius:2,chickens:!0,snakes:!0},{loc:[-97.13434807797746,16.305895692771806],title:"Mermaid's Hideaway",coords:"B 13",img:"mermaidsHideaway.jpg",radius:3,chickens:!0,pigs:!0},{loc:[-105.13603701643558,36.36971243938428],title:"Sailor's Knot Stronghold",coords:"E 14",radius:2,isFortress:!0},{loc:[-103.69823588787327,72.10794401653528],title:"Fools Lagoon",coords:"I 14",radius:1.5,pigs:!0},{loc:[-100.84721297846644,83.52747464057205],title:"Castaway Isle",coords:"K 14",img:"castawayIsle.jpg",radius:1,snakes:!0},{loc:[-104.19511986188078,97.48786124216625],title:"Old Boot Fort",coords:"L 14",radius:2,isFortress:!0},{loc:[-117.31967471531044,51.7447330135501],title:"Plunder Valley",coords:"G 16",img:"plunderValley.jpg",radius:4,chickens:!0,pigs:!0},{loc:[-115.8779065452535,69.80542248695795],title:"Chicken Isle",coords:"I 16",radius:2,chickens:!0,pigs:!0},{loc:[-115.25277561979163,85.05040239049788],title:"Snake Island",coords:"K 16",img:"snakeIsland.jpg",radius:3,pigs:!0,snakes:!0},{loc:[-116.75298510053062,106.67686315627111],title:"Crooks's Hollow",coords:"M 16",img:"crooksHollow.jpg",radius:3,chickens:!0,snakes:!0},{loc:[-114.69061602599248,122.1182928219427],title:"Barnacle Cay",coords:"O 15",radius:2,chickens:!0},{loc:[-126.31805123958326,134.36426028544201],title:"Ancient Spire Outpost",coords:"Q 17",img:"ancientSpireOutpost.jpg",radius:2,outpost:!0},{loc:[-124.56687291042644,34.36631770202399],title:"Discovery Ridge",coords:"E 17",radius:4,chickens:!0,snakes:!0},{loc:[-137.44456997494095,45.05029951966879],title:"Old Salts Atoll",coords:"F 18",radius:2,chickens:!0},{loc:[-128.94278938865952,65.35611291577732],title:"Lost Gold Fort",coords:"H 17",radius:2,isFortress:!0},{loc:[-144.821114895391,60.10784114570619],title:"Shark Bait Cove",coords:"H 19",radius:4,chickens:!0,pigs:!0},{loc:[-148.3847146692707,73.99154401784801],title:"Lookout Point",coords:"I 20",radius:2,pigs:!0},{loc:[-152.51057877731904,84.98792296466371],title:"Booty Isle",coords:"K 20",radius:1.5,snakes:!0},{loc:[-134.88188667929433,82.4887459312965],title:"Plunder Outpost",coords:"J 18",img:"plunderOutpost.jpg",radius:2,outpost:!0},{loc:[-126.75507990792053,95.36808708028451],title:"Paradise Spring",coords:"L 17",radius:2,pigs:!0},{loc:[-133.19392844017779,104.67752152957733],title:"Cutlass Cay",coords:"M 18",radius:1.5,snakes:!0},{loc:[-130.13078690541462,117.3608449739159],title:"The Crow's Nest Fortress",coords:"O 17",img:"theCrowsNestFortress.jpg",radius:2,isFortress:!0},{loc:[-143.50858871029862,113.17472344302583],title:"Mutineer Rock",coords:"N 19",img:"mutineerRock.jpg",radius:2,chickens:!0},{loc:[-143.75864108048336,128.48218277239994],title:"Devil's Ridge",coords:"P 19",img:"devilsRidge.jpg",radius:3,pigs:!0,snakes:!0},{loc:[-147.8845051885317,98.80445550116441],title:"Thieves' Haven",coords:"M 20",radius:4,chickens:!0,pigs:!0},{loc:[-78.938966,191.556523],title:"Scorched Pass",coords:"X 11",radius:2,forsaken:!0},{loc:[-87.003155,200.022485],title:"Brian's Bazaar",coords:"Y 12",radius:1,forsaken:!0,isSeapost:!0},{loc:[-84.359375,209.328125],title:"Molten Sands Fortress",coords:"Z 11",img:"keelHaulFort.jpg",radius:2.5,isFortress:!0},{loc:[-87.5329,177.748416],title:"Fetcher's Rest",coords:"V 12",radius:4,forsaken:!0,isSeapost:!1},{loc:[-96.568248,198.610248],title:"Cursewater Shores",coords:"Y 13",radius:2,forsaken:!0,isSeapost:!1},{loc:[-104.69495,169.682274],title:"Cinder Islet",coords:"U 14",radius:2,forsaken:!0,isSeapost:!1},{loc:[-107.257986,185.614528],title:"Flintlock Peninsula",coords:"W 15",radius:4,forsaken:!0,isSeapost:!1},{loc:[-119.318876,201.609261],title:"Ruby's Fall",coords:"Y 16",radius:3,forsaken:!0,isSeapost:!1},{loc:[-118.568719,165.308714],title:"The Forsaken Brink",coords:"U 16",radius:1.5,forsaken:!0,isSeapost:!1},{loc:[-127.003365,178.80427],title:"Marrow's Peak Outpost",coords:"V 17",radius:3,forsaken:!0,outpost:!0,isSeapost:!1},{loc:[-136.81792,198.36031],title:"Brimstone Rock",coords:"Y 18",radius:1.5,forsaken:!0,isSeapost:!1},{loc:[-137.943156,212.605619],title:"Glowstone Cay",coords:"Z 18",radius:1.5,forsaken:!0,isSeapost:!1},{loc:[-144.69457,179.491523],title:"Flame's End",coords:"V 19",radius:1.5,forsaken:!0,isSeapost:!1},{loc:[-147.193195,167.058118],title:"Roaring Traders",coords:"U 20",radius:1,forsaken:!0,isSeapost:!0},{loc:[-152.506808,204.045938],title:"Magma's Tide",coords:"Y 20",radius:2,forsaken:!0,isSeapost:!1},{loc:[-157.382829,187.676328],title:"The Devil's Thirst",coords:"W 21",radius:3,forsaken:!0,isSeapost:!1},{loc:[-159.258222,167.432994],title:"Burning Sands",coords:"U 21",radius:1.5,forsaken:!0,isSeapost:!1},{loc:[-172.636024,175.305402],title:"Ashen Reaches",coords:"V 23",radius:3,forsaken:!0,isSeapost:!1}],T=[{loc:[-16.507874,31.0448],title:"North West of Smuggler's Bay",isLarge:!0,desc:"Large (3rd out of the 4 offshore rocks counting from the east, at the back of the island, D2"},{loc:[-22.745271,135.124285],title:"Marauder's Arch",isLarge:!0,desc:"South top"},{loc:[-54.988041,71.873989],title:"Hidden Spring Keep",isLarge:!1,desc:" Very top, use the South West cannon"},{loc:[-142.478323,128.428828],title:"Devil's Ridge",isLarge:!1,desc:" North side underneath the ridge"},{loc:[-64.763573,86.934257],title:"K9",isLarge:!1,desc:"Underwater, uncharted island"},{loc:[-73.23633,103.936164],title:"Shipwreck Bay",isLarge:!0,desc:"Northern small island"},{loc:[-70.532986,51.038615],title:"Cannon Cove",isLarge:!0,desc:"Northern small island"},{loc:[-98.065754,17.249381],title:"Mermaid's Hideaway",isLarge:!1,desc:"Across from the Southern peak"},{loc:[-148.01744,101.459982],title:"Thieves Haven",isLarge:!1,desc:"East rock in the water"},{loc:[-135.604944,83.10854],title:"Plunder Outpost",isLarge:!0,desc:"South top"}],A=[{loc:[-19.29761,43.108748],title:"Smugglers Bay"},{loc:[-22.235517,136.749201],title:"Marauder's Arch"},{loc:[-70.501164,50.554064],title:"Cannon Cove"},{loc:[-80.548623,120.702367],title:"The Crooked Masts"},{loc:[-90.954813,145.288321],title:"Kraken's Fall"},{loc:[-85.642033,179.030255],title:"Fetcher's Rest"},{loc:[-96.767313,15.671325],title:"Mermaid's Hideaway"},{loc:[-118.127325,52.124172],title:"Plunder Valley"},{loc:[-117.744397,107.006777],title:"Crook's Hollow"},{loc:[-119.517574,201.600493],title:"Ruby's Fall"},{loc:[-143.071842,128.265031],title:"Devil's Ridge"},{loc:[-156.431205,187.968065],title:"The Devil's Thirst"}],R=[{loc:[-42.471588,61.804962],title:"Lone Cove - Deadshot Charlotte"},{loc:[-73.784149,103.488647],title:"Shipwreck Bay - Grogsoaked Ed"},{loc:[-92.504761,147.521606],title:"Kraken's Fall - Lootin Penelope"},{loc:[-88.219971,176.605042],title:"Fletcher's Rest - Walter the Feared"},{loc:[-119.66217,200.650238],title:"Ruby's Fall - Burnin' Tony"},{loc:[-143.671936,128.255554],title:"Devil's Ridge - Martha the Fierce"},{loc:[-116.560669,106.010834],title:"Crook's Hollow - Wild Henry"},{loc:[-96.860016,16.258972],title:"Mermaid's Hideaway - Five Paces Frank"}],O=[{loc:[-98.689331,114.637573],title:"Magpie's Wing",desc:"underwater just off the west coast of an uncharted island at N13",talltale:1},{loc:[-99.158081,115.043823],title:"Mercia's Lost Memories Journal 1",desc:"on the beach of the west coast of an uncharted island at N13",talltale:1},{loc:[-125.335937,133.6171883],title:"Mercia's Lost Memories Journal 2",desc:"in cave at across from the Tavern on the other spire at Anchient Spire Outpost",talltale:1},{loc:[-142.648437,129.21875],title:"Mercia's Lost Memories Journal 3",desc:"at Devil's Ridge on a cliff overlooking the beach on the north east side by a cannon",talltale:1},{loc:[-147.6875,99.710938],title:"Mercia's Lost Memories Journal 4",desc:"inside Thieve's Haven, north west side, inside a shack in a crate",talltale:1},{loc:[-134.179687,81.648438],title:"Mercia's Lost Memories Journal 5",desc:"on Plunder Outpost, by the gold hoarder's tent in a broken rowboat",talltale:1}];function M(e,o){const t=e.title.replace(/the /gi,"").toUpperCase(),s=o.title.replace(/the /gi,"").toUpperCase();return t>s?1:s>t?-1:0}F.sort(M),T.sort(M);var I=s,_=!1,E=-1;console.log("-- detect isOnline: "+I);var P="";"localhost"!=location.hostname&&(P="https://cdn.chenzorama.com/"),function(){var e=L.GridLayer.prototype._initTile;L.GridLayer.include({_initTile:function(o){e.call(this,o);var t=this.getTileSize();o.style.width=t.x+1+"px",o.style.height=t.y+1+"px"}})}();var x=L.map("mapid",{maxZoom:7,minZoom:2,crs:L.CRS.Simple,attributionControl:!1,preferCanvas:!1,maxBoundsViscosity:1}).setView([70,70],4),z=new L.LatLngBounds(x.unproject([0,25522],7),x.unproject([27444,0],7));x.setMaxBounds(z,{padding:[600,600]}),new L.Hash(x),L.tileLayer(P+"images/tiles/v3/{z}/{x}/{y}.png",{minZoom:2,maxZoom:7,bounds:z,noWrap:!0,tms:!1}).addTo(x),x.on("click",function(e){console.log("You clicked the map at "+e.latlng)});var U=new L.LayerGroup;x.addLayer(U);var B=new L.LayerGroup;j.push(["islands",D]),x.addLayer(B);var D=new L.LayerGroup;j.push(["chickens",D]);var N=new L.LayerGroup;j.push(["snakes",N]);var W=new L.LayerGroup;j.push(["pigs",W]);var H=L.icon({iconUrl:"/images/markers/chicken_marker.png",shadowUrl:"/images/markers/chicken_marker.png",iconSize:[30,30],shadowSize:[0,0],iconAnchor:[0,30],shadowAnchor:[0,0],popupAnchor:[0,0]}),G=L.icon({iconUrl:"/images/markers/snake_marker.png",shadowUrl:"/images/markers/snake_marker.png",iconSize:[30,30],shadowSize:[0,0],iconAnchor:[30,30],shadowAnchor:[0,0],popupAnchor:[0,0]}),K=L.icon({iconUrl:"/images/markers/pig_marker.png",shadowUrl:"/images/markers/pig_marker.png",iconSize:[30,30],shadowSize:[0,0],iconAnchor:[30,0],shadowAnchor:[0,0],popupAnchor:[0,0]});L.islandCircle=L.Circle.extend({options:{name:"islandName",json:{}}}),function(e){if(d){var o="Location_LIST = [",t="Location_DATA = {",s="";for(var a in e)o+='"'+e[a].title+'", ',t+='"'+e[a].title.toLowerCase()+'":"'+e[a].coords+'", ',s+=e[a].title+",\n";o+="]",t+="}",console.log(o),console.log(t),console.log(s)}}(F);var Z=[];for(var V in F){var q=F[V].title,Y=F[V].radius,J="islandClass "+window.websafe(q),Q=new L.islandCircle(F[V].loc,{strokeweight:1,opacity:0,color:"#fff",fillColor:"#fff",fillOpacity:0,radius:Y,className:J,name:q,title:q,json:F[V]});C("island",q,J,F[V]);var X=ge(F[V].loc,Y+.1*Y,0);if(new L.Marker(X,{icon:new L.DivIcon({className:"title-location",iconAnchor:[0,0],iconSize:null,html:'<span class="my-div-span" data-anchor-x="0">'+F[V].title+"</span>"})}).addTo(B),U.addLayer(Q),Z[V]=Q,F[V].circle=Q,Q.on({mousedown:function(e){_?(e.target.classList.add("pig show"),x.dragging.disable(),x.on("mousemove",function(o){e.target.setLatLng(o.latlng)})):(e.target._path.classList.remove("pig","show"),w(x),ue())},mouseup:function(e){_&&(x.removeEventListener("mousemove"),console.log(e.target.options.title),console.log("["+e.latlng.lat+", "+e.latlng.lng+"],"),x.dragging.enable())}}),F[V].chickens){var ee=ge(F[V].loc,.5*Y,.6*Y);L.marker(ee,{icon:H,title:"chicken"}).addTo(D).setIcon(H)}if(F[V].snakes){var oe=ge(F[V].loc,.5*Y,.6*Y*-1);L.marker(oe,{icon:G,title:"snake"}).addTo(N)}if(F[V].pigs){var te=ge(F[V].loc,.5*Y*-1,.6*Y*-1);L.marker(te,{icon:K,title:"pigs"}).addTo(W)}}x.on("zoomend",function(){x.getZoom()<3?x.removeLayer(B):x.addLayer(B);var e=$(".title-location");switch(x.getZoom()){case 5:e.css("font-size",24),x.getZoom(),x.getZoom();break;case 6:e.css("font-size",33),x.getZoom(),x.getZoom();break;case 7:e.css("font-size",63),x.getZoom(),x.getZoom();break;default:e.css("font-size",14),x.getZoom()}});var se=new L.LayerGroup;for(var ae in j.push(["beacons",se]),x.addLayer(se),A)(le=k(A[ae],"beacon")).marker.addTo(se).bindPopup(le.title),C("beacon",le.title,"beaconClass "+window.websafe(le.title),A[ae]);var re=new L.LayerGroup;for(var ae in j.push(["cargoruns",re]),x.addLayer(re),R)(le=k(R[ae],"cargo")).marker.addTo(re).bindPopup(le.title),C("cargorun",le.title,"cargoClass "+window.websafe(le.title),R[ae]);var ie=new L.LayerGroup;for(var ae in j.push(["thrones",ie]),x.addLayer(ie),T)(le=k(T[ae],"throne")).marker.addTo(ie).bindPopup(le.desc),C("throne",le.title,"throneClass "+window.websafe(le.title),T[ae]);var ne=new L.LayerGroup;for(var ae in j.push(["talltales",ne]),x.addLayer(ne),O){var le;(le=k(O[ae],"talltale")).marker.addTo(ne).bindPopup('<div class="lf-popup"><h3>'+le.title+"</h3><p>"+le.desc+"</p></div>",{minWidth:322}),C("talltale",le.title,"talltaleClass "+window.websafe(le.title),O[ae])}var ce=L.popup({maxWidth:"500",minWidth:"120",className:"context_popup"});function de(e){$(".floating_dialog").html(e).addClass("show")}function ue(){$(".floating_dialog").removeClass("show")}function pe(){x.getZoom()>=4&&$(".leaflet-grid-label").addClass("big")}function ge(e,o,t){return[e[0]+o,e[1]+t]}x.on("contextmenu",function(e){var o=e.latlng;ce.setLatLng(e.latlng).setContent("<ul><li class='js-addMarker'>Add Marker</li>        <li class='js-clearMarkers'>Clear Markers</li>        <li class='js-closest' data-type='chickens'>Closest Chickens</li>        <li class='js-closest' data-type='pigs'>Closest Pigs</li>        <li class='js-closest' data-type='snakes'>Closest Snakes</li>        <li class='js-closest' data-type='outpost'>Closest Outpost</li>        </ul>").openOn(x),$(".js-addMarker").click(function(){v(o,x),S(),x.closePopup()}),$(".js-clearMarkers").click(function(){!function(e){g.forEach(function(o){e.removeLayer(o)}),g=[]}(x),w(x),ue(),S(),x.closePopup()}),$(".js-closest").click(function(){var t=$(this).data("type"),s=function(e,o){var t,s=1e3,a={};for(var r in F){var i=F[r].title,n=F[r].loc;(t=x.distance(n,e))<s&&F[r][o]&&(s=t,a.title=i,a.islandData=F[r])}return a.bearing=window.angle360(e.lat,e.lng,a.islandData.loc[0],a.islandData.loc[1]),a}(e.latlng,t),a=s.islandData;$(".islandClass").removeClass("show pigs chickens snakes outposts"),a.circle._path.classList.add(t,"show");var r="<span class='type'>"+(t.charAt(0).toUpperCase()+t.slice(1))+"</span> can be found to the <span class='direction'>"+window.getCardinalFromDeg(s.bearing)+"</span> at <span class='title'>"+s.title+"</span>";!function(e,o,t){w(t);var s=(u=L.marker(e,{icon:m,draggable:!1}).addTo(t))._icon.style.transform+" rotate("+o+"deg)";u._icon.style.transform=s,g.push(u)}(o,s.bearing,x),de(r),x.closePopup()})}),L.simpleGraticule({interval:8.2,vinterval:7.7,showOriginLabel:!1,redraw:"move"}).addTo(x),x.on("zoomend",function(){pe()}),x.on("move",function(){pe()}),x.on("moveend",function(){pe()}),window.dev={toggleOn:function(){console.log("dev"),$(".islandClass").addClass("show"),_=!0}};var he=0;$(function(){y.forEach(function(e,o){$(".list_of_islands").append("<li class='js-placelist "+e.classes+"' data-name=\""+e.name+"\" data-idx='"+o+"' data-type=\""+e.type+'">'+e.name+"</li>")}),$(".js-showfilters").on("click",function(){$(".js-filter_space").toggleClass("open")}),$(".js-toggle-filter").on("change",function(){var e=$("input",this).prop("checked");!function(e,o){o?$(".js-placelist[data-type='"+e+"']").removeClass("filteredOut"):$(".js-placelist[data-type='"+e+"']").addClass("filteredOut")}($(this).data("filter"),!!e)}),$(".js-filter-search").on("input propertychange paste",function(){b()}),$(".js-filter-search").keypress(function(e){13==e.which&&($(this).click(),$(".js-placelist.found").first().click())}).keydown(function(e){40===e.which&&$(".js-placelist").nextAll(".found:first").focus()}),$(".js-clear-search").on("click",function(){$(".js-filter-search").val(""),b()}),$(".js-placelist").on("click",function(){console.log("Showing: "+$(this).data("name"));var e=function(e){var o=!1;"beacon"!=y[e].type&&"throne"!=y[e].type&&"cargorun"!=y[e].type&&"talltale"!=y[e].type||(console.log("should toggle"),o=!0),console.log("type: "+y[e].type);var t=7;return parseInt(y[e].markerObj.radius)>2&&(t=6),{radius:t,LatLong:y[e].markerObj.loc,name:y[e].name,toggleMarker:o}}($(this).data("idx"));if(e.toggleMarker){var o=window.websafe(e.name);$(".markerIcon."+o).addClass("show"),$(".markerIcon."+o).click()}x.setView(e.LatLong,e.radius)}),$(".js-placelist").keypress(function(e){13==e.which&&$(this).click()}),$(".js-placelist").keydown(function(e){40===e.which?$(this).nextAll(".found:first").focus():38===e.which&&$(this).prevAll(".found:first").focus()}),$(".js-placelist").on("focus",function(){console.log("FOC'D"),$(".highlight").removeClass("highlight"),$(this).addClass("highlight")}),$(".js-searchforisland").click(function(){var e=function e(o){return"left"==o?--E<0&&(E=F.length-1):++E>=F.length&&(E=0),F[E].isFortress||F[E].outpost||F[E].isSeapost?e(o):F[E]}($(this).data("dir")).loc;x.setView(e,7),pe(),de("Island "+(E+1)+" of "+F.length),clearTimeout(he),he=setTimeout(ue,3e3)}),$(".js-toggleMarkers").click(function(){!function(e,o){var t=function(e){for(var o=0;o<j.length;o++)if(j[o][0]==e)return j[o][1]}(e);console.log(e),o?"thrones"==e?$(".markerIcon.throne").addClass("show"):"beacons"==e?$(".markerIcon.beacon").addClass("show"):"cargoruns"==e?$(".markerIcon.cargo").addClass("show"):"talltales"==e?$(".markerIcon.talltale").addClass("show"):x.addLayer(t):"thrones"==e?$(".markerIcon.throne").removeClass("show"):"beacons"==e?$(".markerIcon.beacon").removeClass("show"):"cargoruns"==e?$(".markerIcon.cargo").removeClass("show"):"talltales"==e?$(".markerIcon.talltale").removeClass("show"):x.removeLayer(t)}($(this).attr("name"),$(this).is(":checked"))}),$(".js-fullscreen").click(function(){window.toggleFullScreen()}),$(".js-share").click(function(){var e=window.location.href;navigator.clipboard.writeText(e).then(function(){console.log("Async: Copying to clipboard was successful!"),de("Current Map Location URL Copied To Clipboard!"),setTimeout(ue,4e3)},function(e){console.error("Async: Could not copy text: ",e)})}),$(".js-installfiles").click(function(){console.log("click install"),function(){console.log("installer called");var e=new XMLHttpRequest;e.open("GET","data/mapfile_list.json?cb=5",!0),e.onload=function(){if(e.status>=200&&e.status<400){var o=JSON.parse(e.responseText).mapFileList;n=o.length,console.log(o.length),c(o,100)}else console.log("ERROR")},e.onerror=function(){console.log("ERROR")},e.send()}()}),$(".js-settings").click(function(){console.log("click settings"),$(".settings").addClass("open")}),$(".js-close-settings").click(function(){console.log("click settings"),$(".settings").removeClass("open")}),function(){var e=new URLSearchParams(window.location.search),o=window.decodeURIComponent(e.get("mkrs"));null!==e.get("mkrs")&&window.atob(o).split(";").forEach(function(e){""!==e&&v(e.split(","),x)})}()}),window.generateIslandImages=function(){p=0,function(){if(p<p.length){islands[p].title;var e=islands[p].loc;map.setView(e,7),setTimeout(function(){html2canvas(document.querySelector("#mapid")).then(e=>{var o=document.createElement("a");o.href=e.toDataURL("image/jpeg").replace("image/jpeg","image/octet-stream"),o.download="somefilename.jpg",o.click()})},2e3)}}()}}]);
//# sourceMappingURL=maps/sotm.js.map