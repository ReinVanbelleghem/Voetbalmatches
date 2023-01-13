import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { config } from "../../assets/config";
import { _ } from "../../assets/style";
import CustomSelect from "../../components/customSelect";
import Loading from "../../components/Loading";
import Notification from "../../components/Notification";
interface Speler {
    voorNaam: string;
    achterNaam: string;
    leeftijd: number | null;
    rugNummer: number | null;
}

interface CProps {
    reload: () => void;
    close: () => void;
}

export default function PloegToevoegen({ close, reload }: CProps) {
    const [ploegNaam, setPloegNaam] = useState("");
    const [coach, setCoach] = useState({
        voorNaam: "",
        achterNaam: "",
        leeftijd: 18
    });

    const [speler, setSpeler] = useState<Speler>({
        voorNaam: "",
        achterNaam: "",
        leeftijd: null,
        rugNummer: null
    });

    const [spelers, setSpelers] = useState<Speler[]>([]);

    function addSpeler() {
        setSpelers([...spelers, speler]);
        setSpeler({
            voorNaam: "",
            achterNaam: "",
            leeftijd: null,
            rugNummer: null
        });
    }
    function removeSpeler(id: number) {
        let newSpelers = [...spelers];
        newSpelers.splice(id, 1);
        console.log(newSpelers);
        setSpelers(newSpelers);
    }

    function Add() {
        let data = {
            ploegNaam: ploegNaam,
            coach: coach,
            spelers: spelers
        };

        axios.post(config.api + "/voetbalploegen", data).then(() => {
            toast.custom((t) => <Notification t={t} icon={<div className="h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center">⚽️</div>} head="Succes!" text="Ploeg toevoegen succesvol!" />);
            reload();
            close();
        });
    }

    return (
        <div className="w-10/12 my-16 mx-auto dark:text-zinc-100">
            <div>
                <h2 className="text-2xl text-center font-bold mb-8">Voetbalploeg toevoegen</h2>
                <div>
                    <h3 className="mb-2">Ploegnaam</h3>
                    <input className={_.input.default} type="text" onChange={(e) => setPloegNaam(e.target.value)} placeholder="Naam van de ploeg..." />
                </div>

                <div className="mt-8">
                    <h2 className="mb-2">Coach van de ploeg</h2>
                    <div className="flex flex-col lg:grid lg:grid-cols-8 gap-2">
                        <div className="lg:col-span-3">
                            <input className={_.input.default} type="text" onChange={(e) => setCoach({ ...coach, voorNaam: e.target.value })} placeholder="Voornaam..." />
                        </div>
                        <div className="lg:col-span-3">
                            <input className={_.input.default} type="text" onChange={(e) => setCoach({ ...coach, achterNaam: e.target.value })} placeholder="Achternaam..." />
                        </div>
                        <div className="lg:col-span-2">
                            <input className={_.input.default} type="number" onChange={(e) => setCoach({ ...coach, leeftijd: parseInt(e.target.value) })} placeholder="Leeftijd..." />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="mb-2">Spelers van de ploeg</h2>

                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2">
                        <div className="lg:col-span-3">
                            <input value={speler.voorNaam} className={_.input.default} type="text" onChange={(e) => setSpeler({ ...speler, voorNaam: e.target.value })} placeholder="Voornaam..." />
                        </div>
                        <div className="lg:col-span-4">
                            <input value={speler.achterNaam} className={_.input.default} type="text" onChange={(e) => setSpeler({ ...speler, achterNaam: e.target.value })} placeholder="Achternaam..." />
                        </div>
                        <div className="lg:col-span-2">
                            <input value={speler.leeftijd ?? ""} className={_.input.default} type="number" onChange={(e) => setSpeler({ ...speler, leeftijd: parseInt(e.target.value) })} placeholder="Leeftijd..." />
                        </div>
                        <div className="col-span-2">
                            <input value={speler.rugNummer ?? ""} className={_.input.default} type="number" onChange={(e) => setSpeler({ ...speler, rugNummer: parseInt(e.target.value) })} placeholder="Rugnummer..." />
                        </div>
                        <div className="col-span-1">
                            <button onClick={() => addSpeler()} className={_.button.default + " w-full lg:w-fit"}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="bg-zinc-100 dark:bg-black dark:text-zinc-300 p-4 rounded mt-4 flex flex-col gap-3">
                        {spelers.map((speler, index) => {
                            return (
                                <div className="grid grid-cols-12 gap-2">
                                    <div className="col-span-3">{speler.voorNaam}</div>
                                    <div className="col-span-4">{speler.achterNaam}</div>
                                    <div className="col-span-2">{speler.leeftijd}</div>
                                    <div className="col-span-2">{speler.rugNummer}</div>
                                    <div className="col-span-1">
                                        <button onClick={() => removeSpeler(index)} className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-zinc-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8">
                    <button onClick={() => Add()} className={_.button.default + " uppercase w-full"}>
                        Aanmaken
                    </button>
                </div>
            </div>
        </div>
    );
}
