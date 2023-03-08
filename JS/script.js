
window.onload = init;
var indirizzo = window.location.href + "Server/";

function init(){
    let ris = fetch(indirizzo + "domande.php",{method : "GET"});

    ris.then(   
        async function(dati){
            //Lettura dati della risposta e li convertiamo in json => chiamata asincrona
            let domande = await dati.json();
            
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



