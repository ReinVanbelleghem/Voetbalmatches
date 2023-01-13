import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Modal from "../components/modal";
import { _ } from "../assets/style";
import MatchToevoegen from "./components/matchToevoegen";
import PloegToevoegen from "./components/ploegToevoegen";
import { Wedstrijd } from "../types/wedstrijden";
import axios from "axios";
import Loading from "../components/Loading";
import Doelpunt from "./components/doelpunt";
import { v4 as uuidv4 } from "uuid";
import { config } from "../assets/config";
import toast from "react-hot-toast";
import Notification from "../components/Notification";
interface State {
    data: Wedstrijd[];
    error: boolean;
    loading: boolean;
}

export default function Admin_Home() {
    const [wedstrijden, setWedstrijden] = useState<State>({
        data: [],
        error: false,
        loading: true
    });

    useEffect(() => {
        load();
    }, []);

    function load() {
        setWedstrijden({
            loading: true,
            data: [],
            error: false
        });
        axios.get(config.api + "/wedstrijden").then((result) => {
            console.log(result);
            let wedstrijden: Wedstrijd[] = result.data;
            setWedstrijden({
                data: wedstrijden,
                error: false,
                loading: false
            });
        });
    }
    const [matchToevoegenModal, setMatchToevoegenModal] = useState(false);
    const [ploegToevoegen, setPloegToevoegen] = useState(false);

    const [doelpuntModalA, setDoelpuntModalA] = useState([]);
    const [doelpuntModalB, setDoelpuntModalB] = useState([]);

    function Delete(wedstrijdID: number) {
        axios.delete(config.api + "/wedstrijden/" + wedstrijdID).then(() => {
            toast.custom((t) => <Notification t={t} icon={<div className="h-10 w-10 bg-red-200 rounded-full flex items-center justify-center">⚽️</div>} head="Succes!" text="Verwijderen van match succesvol!" />);
            load();
        });
    }

    return (
        <>
            <Header />
            <div className={_.container + " mt-12"}>
                <div className="flex gap-1 flex-col md:flex-row">
                    <Modal condition={matchToevoegenModal} setCondition={setMatchToevoegenModal} openButtonValue="Match toevoegen" openButtonClasses={_.button.default + " uppercase w-full md:w-fit"} children={<MatchToevoegen close={() => setMatchToevoegenModal(false)} reload={() => load()} />} />
                    <Modal condition={ploegToevoegen} setCondition={setPloegToevoegen} openButtonValue="Voetbaloploeg toevoegen" openButtonClasses={_.button.default + " uppercase w-full md:w-fit"} children={<PloegToevoegen close={() => setPloegToevoegen(false)} reload={() => load()} />} />
                </div>
                <div className="mt-8">
                    {wedstrijden.loading ? (
                        <div className="w-full flex justify-center">
                            <Loading />
                        </div>
                    ) : (
                        <div className="grid gap-4 lg:grid-cols-2">
                            {wedstrijden.data.map((wedstrijd) => {
                                return (
                                    <div key={"wedstrijd_" + wedstrijd.id} className="p-8 rounded-md shadow-md dark:bg-black dark:text-zinc-100">
                                        <div className="text-center font-normal text-2xl">
                                            {wedstrijd.voetbalploegA.ploegNaam} <span className="font-bold">VS</span> {wedstrijd.voetbalploegB.ploegNaam}
                                        </div>
                                        <div className="mt-12 flex justify-center">
                                            <Modal uuid={"doelpunt_A_" + wedstrijd.id + "_" + wedstrijd.voetbalploegA.id} condition={doelpuntModalA} setCondition={setDoelpuntModalA} openButtonValue="⚽️" openButtonClasses={"text-4xl"} children={<Doelpunt reload={() => load()} close={() => setDoelpuntModalA(doelpuntModalA.filter((x) => x !== "doelpunt_A_" + wedstrijd.id + "_" + wedstrijd.voetbalploegA.id))} score="A" wedstrijd={wedstrijd} scorendePloeg={wedstrijd.voetbalploegA} />} />
                                            <div className="text-4xl font-black text-blue-500 px-4 dark:text-blue-300">
                                                {wedstrijd.scoreA} - {wedstrijd.scoreB}
                                            </div>
                                            <Modal uuid={"doelpunt_B_" + wedstrijd.id + "_" + wedstrijd.voetbalploegB.id} condition={doelpuntModalB} setCondition={setDoelpuntModalB} openButtonValue="⚽️" openButtonClasses={"text-4xl"} children={<Doelpunt reload={() => load()} close={() => setDoelpuntModalB(doelpuntModalB.filter((x) => x !== "doelpunt_B_" + wedstrijd.id + "_" + wedstrijd.voetbalploegB.id))} score="B" wedstrijd={wedstrijd} scorendePloeg={wedstrijd.voetbalploegB} />} />
                                        </div>
                                        <div className="w-10/12 md:w-8/12 xl:w-1/2 mx-auto mt-8">
                                            {wedstrijd.doelpunten
                                                .sort((a, b) => b.tijdstipInMinuten - a.tijdstipInMinuten)
                                                .map((doelpunt) => {
                                                    return (
                                                        <div key={"doelpunt_" + doelpunt.id}>
                                                            {doelpunt.scorendePloeg.id === wedstrijd.voetbalploegA.id ? (
                                                                <div className="text-left">
                                                                    ⚽️ {doelpunt.tijdstipInMinuten}" - {doelpunt.scorendeSpeler.voorNaam + " " + doelpunt.scorendeSpeler.achterNaam}
                                                                </div>
                                                            ) : (
                                                                <div className="text-right">
                                                                    {doelpunt.scorendeSpeler.voorNaam + " " + doelpunt.scorendeSpeler.achterNaam} - {doelpunt.tijdstipInMinuten}" ⚽️
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                        <div className="w-full flex justify-end mt-4">
                                            <button onClick={() => Delete(wedstrijd.id)} className={_.button.delete}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
