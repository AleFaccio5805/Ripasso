
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

    if(sel.length < 4)
        alert("Prima di spedire il test, seleziona almeno una risposta per domanda");
        
    var selezione = new Array();
    var corrette = new Array();
    var somma = 2;
    for(let i = 0; i < sel.length; i++)
    {
        selezione[i] = sel[i].getAttribute("value");
        console.log(selezione[i])
    }
    
    for(let i in selezione)
    {
        for(let j in domande[i].risp){
            if(domande[i].risp[j].corretta == true){
                corrette[i] = domande[i].risp[j].cod;
            }
        }


    }
        
    console.log(corrette);

    for(let i in selezione){
        
        console.log(domande[i].pt);
        if(selezione[i] == corrette[i]){
            somma += domande[i].pt;
        }
    }
    console.log(somma);
    

    
}



