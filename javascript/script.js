var formEL = document.getElementById("form");
var textEL = document.getElementById("txt");
var engangsPris = 0
var monthlyPris = 0


formEL.addEventListener("submit", function (e) {

    //definerer elementene i form som data så det lettere brukes senere
    var data = formEL.elements;



    // Første setning i eposten
    textEL.innerHTML = "Hei " + data.kundenavn.value + " og takk for en hyggelig telefonsamtale. \n"
        + "Sender deg som avtalt tilbud på produktene" + "\n" + "Prisen vil da bli på"



    // Loop som går gjennom radio knappene for å se hvilken nettverksmulighet som ble valgt
    for (let i = 0; i < data.nett.length; i++) {
        if (data.nett[i].checked == true) {
            monthlyPris += parseInt(data.nett[i].value)
            textEL.innerHTML += "\n" + data.nett[i].id + " " + data.nett[i].value + "kr"
            break
        }
    }



    //samme som over, men for checkboxene med produkter
    for (let i = 0; i < data.engangs.length; i++) {
        if (data.engangs[i].checked == true) {
            engangsPris += parseInt(data.engangs[i].value);
            textEL.innerHTML += "\n" + data.engangs[i].id + " " + data.engangs[i].value + "kr ";

        }
    }


    textEL.innerHTML += "\n" + "-------------------------------------"

    //Regner rabatt for månedspris
    var MonthlyRabatt = (data.MonthlyRabatt.value);
    var MonthlyRabattVerdi = monthlyPris * (MonthlyRabatt / 100);
    var MonthlyPrisEtterRabatt = monthlyPris - MonthlyRabattVerdi;
    if (monthlyPris > 0) {
        if (MonthlyRabatt > 0) {
            textEL.innerHTML += "\n" + "Den månedlige prisen etter rabatt" + "(" + MonthlyRabatt + "%)" + " blir " + MonthlyPrisEtterRabatt.toFixed(2)
        } else {
            textEL.innerHTML += "\n" + "Den månedlige prisen blir " + MonthlyPrisEtterRabatt.toFixed(2)
        }
    }

    //regner rabatt for engangspris
    var EngangsRabatt = (data.EngangsRabatt.value);
    var EngangsRabattVerdi = engangsPris * (EngangsRabatt / 100);
    var engangsPrisEtterRabatt = engangsPris - EngangsRabattVerdi;
    if (engangsPris > 0) {
        if (EngangsRabatt > 0) {
            textEL.innerHTML += "\n" + "Engangsprisen etter rabatt" + "(" + EngangsRabatt + "%)" + " blir " + engangsPrisEtterRabatt.toFixed(2);
        } else {
            textEL.innerHTML += "\n" + "Den engangsprisen blir " + engangsPrisEtterRabatt.toFixed(2)
        }

        
    }

    //Hvis du har spart penger får du vite hvor mye
    if ((EngangsRabattVerdi + MonthlyRabattVerdi) > 0) {
        textEL.innerHTML += "\n" + "Du sparer " + (EngangsRabattVerdi + MonthlyRabattVerdi).toFixed(2) + "kr!"
    }

    //Hvor mye totalprisen kommer på og hilsen fra bruker
    textEL.innerHTML += "\n" + "Din totalpris er " + (engangsPrisEtterRabatt + MonthlyPrisEtterRabatt).toFixed(2) + "kr!" +
        "\n" + "Vennlig hilsen " + data.navn.value + "!"


    e.preventDefault();

})