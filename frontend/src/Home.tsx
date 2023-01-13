import React, { useEffect, useState } from "react";
import axios from "axios";
import { Voetbalploeg, Wedstrijd } from "./types/wedstrijden";
import { _ } from "./assets/style";
import Header from "./components/header";
import Loading from "./components/Loading";
import { Link } from "react-router-dom";
import { config } from "./assets/config";
import CustomSelect from "./components/customSelect";

interface State {
    data: Wedstrijd[];
    error: boolean;
    loading: boolean;
}
interface PloegenProps {
    data: Voetbalploeg[];
    loading: boolean;
    error: boolean;
}
export default function Home() {
    const [ploeg, setPloeg] = useState({ id: -1, value: "Filter op een ploeg..." });

    const [wedstrijden, setWedstrijden] = useState<State>({
        data: [],
        error: false,
        loading: true
    });

    const [voetbalPloegen, setVoetbalPloegen] = useState<PloegenProps>({
        data: [],
        loading: true,
        error: false
    });

    const [ploegenOpties, setPloegOpties] = useState<any>([]);

    useEffect(() => {
        loadAll();
    }, []);

    function loadAll() {
        axios.get(config.api + "/voetbalploegen").then((result) => {
            let voetbalploegen: Voetbalploeg[] = result.data;
            setVoetbalPloegen({
                data: voetbalploegen,
                loading: false,
                error: false
            });

            let opties = [];

            for (let ploeg of voetbalploegen) {
                opties.push({ id: ploeg.id, value: ploeg.ploegNaam });
            }
            setPloegOpties(opties);
        });
    }

    useEffect(() => {
        axios.get(config.api + "/wedstrijden").then((result) => {
            let wedstrijden: Wedstrijd[] = result.data;
            setWedstrijden({
                data: wedstrijden,
                error: false,
                loading: false
            });
        });
    }, []);

    function getMatchesOfTeam() {
        const params = new URLSearchParams([["ploeg", ploeg.id.toString()]]);
        axios.get(config.api + "/wedstrijden", { params }).then((result) => {
            let wedstrijden: Wedstrijd[] = result.data;
            setWedstrijden({
                data: wedstrijden,
                error: false,
                loading: false
            });
        });
    }

    return (
        <>
            <Header />
            <div className={_.container + " mt-16"}>
                {voetbalPloegen.loading ? (
                    <div className="w-full flex justify-center">
                        <Loading />
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <div className="flex-grow">
                            {/* @ts-ignore */}
                            <CustomSelect options={ploegenOpties} chosen={ploeg} setChosen={setPloeg} />
                        </div>

                        <div>
                            <button onClick={() => getMatchesOfTeam()} className={_.button.default + " w-full"}>
                                Filter
                            </button>
                        </div>
                    </div>
                )}
                {wedstrijden.loading ? (
                    <div className="w-full flex justify-center">
                        <Loading />
                    </div>
                ) : (
                    <div className="grid gap-4 lg:grid-cols-2 mt-8">
                        {wedstrijden.data.map((wedstrijd) => {
                            return (
                                <Link to={"/match/" + wedstrijd.id} key={"wedstrijd_" + wedstrijd.id} className="p-8 rounded-md shadow-md dark:bg-black dark:text-zinc-100">
                                    <div className="text-center font-normal text-2xl">
                                        {wedstrijd.voetbalploegA.ploegNaam} <span className="font-bold">VS</span> {wedstrijd.voetbalploegB.ploegNaam}
                                    </div>
                                    <div className="mt-12 text-4xl text-center font-black text-blue-500">
                                        {wedstrijd.scoreA} - {wedstrijd.scoreB}
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
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
