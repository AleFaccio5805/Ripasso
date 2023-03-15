
window.onload = init;
var indirizzo = window.location.href + "Server/";
let domande;

function init(){
    let ris = fetch(indirizzo + "domande.php",{method : "GET"});

    ris.then(   
        async function(dati){
            //Lettura dati della risposta e li convertiamo in json => chiamata asincrona
            domande = await dati.json();
            
            let div = document.getElementById("divDomande");
            for(let i in domande)
            {
                let domanda = document.createElement("div");
                domanda.innerHTML = domande[i].testo;
                div.appendChild(domanda);
                for(let j in domande[i].risp){
                    let radio = document.createElement("div");
                    radio.innerHTML = `<input type='radio' value ='${domande[i].risp[j].cod}' name ="${domande[i].n}"/> 
                    ${domande[i].risp[j].desc}<br/>`;
                    domanda.appendChild(radio);
                }
            }
        }
    );
}

function spedisci(){

    var sel = document.querySelectorAll("input[value]:checked");
    var selezione = new Array();
    var corrette = new Array();
    var somma = 2;
    for(let i = 0; i < domande.length; i++)
    {
        selezione[i] = sel[i].getAttribute("value");
    }
    
    for(let i in domande)
    {
        for(let j in domande[i].risp){
            if(domande[i].risp[j].corretta == true){
                corrette[i] = selezione[i]
            }
        }
    }
    

    
}



