https://leafletjs.com/examples/crs-simple/crs-simple.html


generate the file list for the manifest
find . -type f >> list2.txt




//Convert map DOM object into image
html2canvas(document.querySelector("#mapid")).then(canvas => {
    //document.body.appendChild(canvas)
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    console.log("ch");
    var a = document.createElement('a');
    a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'somefilename.jpg';
        a.click();
});


