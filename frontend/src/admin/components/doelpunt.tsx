import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { config } from "../../assets/config";
import { _ } from "../../assets/style";
import CustomSelect from "../../components/customSelect";
import { Voetbalploeg, Wedstrijd } from "../../types/wedstrijden";
import Notification from "../../components/Notification";
interface Props {
    reload: () => void;
    close: () => void;
    score: string;
    wedstrijd: Wedstrijd;
    scorendePloeg: Voetbalploeg;
}

export default function Doelpunt({ reload, close, score, wedstrijd, scorendePloeg }: Props) {
    const [scoorder, setScoorder] = useState({ id: -1, value: "Kies scorende speler..." });
    const [minuut, setMinuut] = useState<number>();
    const opties = [];

    for (let speler of scorendePloeg.spelers) {
        opties.push({ id: speler.id, value: speler.voorNaam + " " + speler.achterNaam });
    }

    function Scoor() {
        if (score === "A") wedstrijd.scoreA++;
        if (score === "B") wedstrijd.scoreB++;

        let data = {
            ...wedstrijd,
            doelpunten: [...wedstrijd.doelpunten, { scorendeSpeler: scoorder.id, scorendePloeg: scorendePloeg.id, tijdstipInMinuten: minuut }]
        };

        axios
            .patch(config.api + "/wedstrijden/" + wedstrijd.id, data)
            .then((response) => console.log(response))
            .then(() => {
                toast.custom((t) => <Notification t={t} icon={<div className="h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center">⚽️</div>} head="Succes!" text="Doelpunten aanpassen succesvol!" />);
                reload();
                close();
            });
    }

    return (
        <div className="w-10/12 my-16 mx-auto text-zinc-700">
            <h2 className="font-bold text-2xl">Doelpunt voor {scorendePloeg.ploegNaam}</h2>

            <div className="mt-4">
                <h3 className="mb-2">Scorende speler</h3>
                {/* @ts-ignore */}
                <CustomSelect options={opties} chosen={scoorder} setChosen={setScoorder} />
            </div>

            <div className="mt-4">
                <h3 className="mb-2">Hoeveelste minuut?</h3>
                <input min={0} className={_.input.default} type="number" onChange={(e) => setMinuut(parseInt(e.target.value))} placeholder="Tijdstip..." />
            </div>

            <div className="mt-4">
                <button onClick={Scoor} className={_.button.default + " w-full uppercase"}>
                    Scoor!
                </button>
            </div>
        </div>
    );
}
