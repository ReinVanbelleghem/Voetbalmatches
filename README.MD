Project voetbalmatches van Adrian Van den Broeck en Rein Vanbelleghem

FRONTEND: http://193.191.169.25/
BACKEND: http://193.191.169.25 (running on port 8080)

Het project is zo gemaakt dat er meerdere voetbalploegen kunnen worden toegevoegd. Ook kan er een wedstrijd worden toegevoegd waarbij er 2 voetbalploegen kunnen worden gekozen.

Waar kan je de requirements vinden?

De datalaag bestaat uit minstens één DAO-object waaraan je objecten kan opvragen,
toevoegen, aanpassen -> Ja dit zijn de VoetbalploegController en de WedstrijdController

De datalaag bevat minstens één 1-1-relatie, 1-n-relatie en één n-n-relatie. Van deze relaties
is er minstens één met cascade en één zonder cascade. -> 1-1: Coach - voetbalploeg (zonder cascade) , 1-n: 1 wedstrijd - n doelpunten (met cascade), n-n: n wedstrijden - n voetbalploegen

De datalaag bevat overerving -> Ja, Coach en speler erven over van persoon

Met de datalaag kan je één object toevoegen -> Ja, bijvoorbeeld voetbalploeg

Met de datalaag kan je een verzameling van objecten toevoegen -> Ja, bij het aanmaken van een voetbalploeg kan je meerdere spelers toevoegen (objecten)

Met de datalaag kan je objecten opvragen. Voorzie zowel een “lazy” als niet “lazy”
opvraging -> Ja, bij alle voetbalploegen opvragen, spelers er niet bij = lazy EN bij match opvragen worden spelers, coach, etc. geïnjecteerd -> niet lazy

De datalaag heeft ook een opvraging die gebruikmaakt van parameters namelijk:
bij de endpoint /wedstrijden is er een parameter (ploeg), waar je het ID van een ploeg kan meegeven om zo alle wedstrijden van een ploeg te krijgen.
voorbeeld: http://193.191.169.25:8080/wedstrijden?ploeg=1 (alle wedstrijden van ploeg 1)

Met de datalaag kan je objecten aanpassen -> Ja, je kan een doelpunt aanpassen (zie algemene uitleg)

Algemene uitleg van hoe alles werkt en hoe het kan getest worden

Als je naar de website http://193.191.169.25/ surft zie je een overzicht van alle matches. Als je op een specifieke match klikt kan je de gescoorde doelpunten zien. Je ziet op welke minuut en door welke speler elk doelpunt is gemaakt. Ook zie je wat extra informatie over wie de coach is en alle spelers van de ploeg. In de URL zie je dan ook het matchID. Op deze pagina hebben we een websocket geïmplementeerd waardoor de doelpunten automatisch updaten als je in het admin panel een doelpunt zou toevoegen (zie volgende alinea).

Ook heb je een admin panel op http://193.191.169.25/admin (Je kan er ook toegang toe krijgen via de homepagina en dan rechtsboven op admin klikken.). Hierbij kan je voetbalploegen toevoegen met een voetbalploegnaam, coach met zijn gegevens en spelers (1 of meerdere) met hun gegevens.
Bij "match toevoegen" kan je een match toevoegen met 2 voetbalploegen die reeds zijn aangemaakt. De pagina zal zich automatisch herladen.
Er kan ook een doelpunt worden toegevoegd door bij het admin panel op het voetbalicoon te klikken. Hierbij kan de speler die het doelpunt maakt en de hoeveelste minuut worden meegegeven. 
