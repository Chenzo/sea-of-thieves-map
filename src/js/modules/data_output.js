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


export {
    alexa_output
};
