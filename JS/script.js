
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
                domanda.setAttribute("id", "domanda");
                domanda.innerHTML = domande[i].testo + " (Pt. " + domande[i].pt + ")";
                for(let j in domande[i].risp){
                    let radio = document.createElement("div");
                    radio.innerHTML = `<input type='radio' value ='${domande[i].risp[j].cod}' name ="${domande[i].n}"/> 
                    ${domande[i].risp[j].desc}<br/>`;
                    domanda.appendChild(radio);
                }
                domanda.innerHTML += "<br/>";
                div.appendChild(domanda);
            }
        }
    );
}


function inserisciDomande(filtro = null){
    let div = document.getElementById("divDomande");
    div.innerHTML="";//Cancello le domande precedenti
    console.log(filtro);
    for(let j in domande){
        if(filtro == null || domande[j].testo.toLowerCase().includes(filtro.toLowerCase()))
        {
        let domanda = document.createElement("div");
        domanda.setAttribute("id", "domanda");
        domanda.innerHTML = domande[j].testo;
        for(let i in domande[j].risp){
            let radio = document.createElement("div");
            radio.innerHTML = `
                <input type='radio' value='${domande[j].risp[i].cod}' name='${domande[j].n}' />
                ${domande[j].risp[i].desc}<br>
                `;
            domanda.appendChild(radio);
        }
        div.appendChild(domanda);
        }
    }
}

function spedisci(){

    var sel = document.querySelectorAll("input:checked");
    var contErrate = 0
    risultati = [];

    if(sel.length < domande.length)
        alert("Prima di spedire il test, seleziona ALMENO una risposta per OGNI domanda");
    else
    {
        var selezione = new Array();
        var corrette = new Array();
        var somma = 2;
        for(let i = 0; i < sel.length; i++)
        {
            selezione[i] = sel[i].getAttribute("value");
        }
        
        for(let i in selezione)
        {
            for(let j in domande[i].risp){
                if(domande[i].risp[j].corretta == true){
                    corrette[i] = domande[i].risp[j].cod;
                }
            }
        }

        for(let i in selezione){
            if(selezione[i] == corrette[i]){
                somma += domande[i].pt;
            }
            else
                contErrate++;
        }

        for(let i in selezione){
            risultati.push({
                nDomanda:sel[i].name,
                nRisposta:sel[i].value
            });
        }


        alert("Test spedito con successo");

        alert("Complimenti!!! Hai preso " + somma);

        alert("Domande Sbagliate: " + contErrate);
        
        //Download automatico del file
        let data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(risultati));
        console.log(risultati);
        let a = document.createElement("a");
        a.href = data;
        a.setAttribute("download", "risultati.json");
        a.click();

        spedisciRisposte(risultati);
    }
}

function spedisciRisposte(risp){
    //alert("mostra trailer:" + cod);
    //1. preparo i dati da mandare
    let data = {risp};
    //2. promise con fetch
    let promise = fetch(indirizzo + "risposte.php", {
        method:'POST',
        headers:{
            /* TIPO DI DATI INVIATI */
            'Content-Type':'application/json'
        },
        /* CONVERSIONE DA JSON a STRINGA */
        body:data.stringify()
    });
    promise.then(async(response)=>{
        let dati = await response.json();
        console.log(dati);
    });
}

function rilasciato(evento)
{
    console.log(evento)
    filtro = evento.target.value;
    inserisciDomande(filtro);
}
