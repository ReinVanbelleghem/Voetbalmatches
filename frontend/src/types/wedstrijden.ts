export interface Coach {
    id: number;
    voorNaam: string;
    achterNaam: string;
    leeftijd: number;
}

export interface Speler {
    id: number;
    voorNaam: string;
    achterNaam: string;
    leeftijd: number;
    rugNummer: number;
}
export interface Voetbalploeg {
    id: number;
    ploegNaam: string;
    coach: Coach;
    spelers: Speler[];
}

export interface Doelpunten {
    id: number;
    tijdstipInMinuten: number;
    scorendePloeg: Voetbalploeg;
    scorendeSpeler: Speler;
}

export interface Wedstrijd {
    id: number;
    scoreA: number;
    scoreB: number;
    voetbalploegA: Voetbalploeg;
    voetbalploegB: Voetbalploeg;
    doelpunten: Doelpunten[];
}
