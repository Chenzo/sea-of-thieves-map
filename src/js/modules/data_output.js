//http://localhost:3000/?useAlexa=true#4/-34.13/57.38 turn on Alexa Output


let params = (new URL(document.location)).searchParams;
let useAlexa = params.get('useAlexa'); // is the string "Jonathan Smith".


function alexa_output(islands) {

    if (useAlexa) {

        var aa_1 = 'Location_LIST = [';
        var aa_2 = 'Location_DATA = {';
        var aa_3 = "";
        for(var i in islands) {
            aa_1 += '"' + islands[i].title + '", ';
            aa_2 += '"' + islands[i].title.toLowerCase()  + '":"' + islands[i].coords + '", ' ;
            aa_3 += islands[i].title + ',\n';
        }

        aa_1 += ']';
        aa_2 += '}';
        console.log(aa_1);
        console.log(aa_2);
        console.log(aa_3); 
    }
}


function saveImage(name) {
    html2canvas(document.querySelector("#mapid")).then(canvas => {
        //document.body.appendChild(canvas)
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'somefilename.jpg';
        a.click();
    });
}


function saveJPGs(map, islands) {
    for(var i in islands) {
        if (i < 2) {
            var title = islands[i].title;
            var loc = islands[i].loc;
            map.setView(loc, 7);
            console.log(title);
            console.log(islands[i]);

        }
    }
}


function goToIsland() {
    if (picCount < picCount.length) {
        var title = islands[picCount].title;
        var loc = islands[picCount].loc;
        map.setView(loc, 7);
        setTimeout(function() {
            html2canvas(document.querySelector("#mapid")).then(canvas => {
                //document.body.appendChild(canvas)
                var a = document.createElement('a');
                a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
                a.download = 'somefilename.jpg';
                a.click();
            });
        }, 2000);
    }
}


var picCount = 0;

function startImageOut(map, islands) {
    picCount = 0;
    goToIsland();
}


export {
    alexa_output, startImageOut
};
