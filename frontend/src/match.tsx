import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "./assets/config";
import { _ } from "./assets/style";
import Header from "./components/header";
import Loading from "./components/Loading";
import { Wedstrijd } from "./types/wedstrijden";
import io from "socket.io-client";
import toast from "react-hot-toast";
import Notification from "./components/Notification";
interface Props {
    data: Wedstrijd | null;
    loading: boolean;
    error: boolean;
}

export default function Match() {
    let id = useParams().id;

    const [wedstrijd, setWedstrijd] = useState<Props>({
        data: null,
        loading: true,
        error: false
    });

    useEffect(() => {
        axios.get(config.api + "/wedstrijden/" + id).then((result) => {
            console.log(result);
            let wedstrijd: Wedstrijd = result.data;
            setWedstrijd({
                data: wedstrijd,
                loading: false,
                error: false
            });
        });

        const socket = io("http://localhost:8080", {
            reconnectionDelayMax: 10000,
            query: {
                matchId: id
            }
        });
        socket.on("connect", () => {
            toast.custom((t) => <Notification t={t} icon={<div className="h-10 w-10 bg-purple-200 rounded-full flex items-center justify-center">⚽️</div>} head="Socket" text="Verbonden met een socket!" />);
        });
        socket.on("wedstrijd_updated", (body: Wedstrijd) => {
            setWedstrijd({
                data: body,
                loading: false,
                error: false
            });
            toast.custom((t) => <Notification t={t} icon={<div className="h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center">⚽️</div>} head="Doelpunt!!!!" text="Er is zopas gescoord!!" />);
        });
    }, [id]);

    return (
        <>
            <Header />

            {wedstrijd.loading ? (
                <div className="w-full flex justify-center">
                    <Loading />
                </div>
            ) : (
                <div>
                    <div className="h-64 bg-blue-600 text-white flex items-center">
                        <div className={_.container}>
                            <h2 className="text-4xl font-black tracking-wider text-center">
                                {wedstrijd.data?.voetbalploegA.ploegNaam} <span className="font-semibold">VS</span> {wedstrijd.data?.voetbalploegB.ploegNaam}
                            </h2>
                            <h3 className="text-6xl font-black tracking-wider text-center mt-4">
                                {wedstrijd.data?.scoreA}
                                <span className="font-semibold">-</span>
                                {wedstrijd.data?.scoreB}
                            </h3>
                        </div>
                    </div>
                    <div className={_.container + " my-12 flex flex-col md:grid md:grid-cols-12 gap-4 dark:text-zinc-100"}>
                        <div className={"shadow p-8 rounded-md col-span-5 dark:bg-black/30"}>
                            <h2 className="font-semibold text-xl mb-8">Spelverloop: </h2>
                            {wedstrijd.data?.doelpunten.length === 0 && <div>Momenteel is er nog niet gescoord</div>}
                            {wedstrijd.data?.doelpunten
                                .sort((a, b) => b.tijdstipInMinuten - a.tijdstipInMinuten)
                                .map((doelpunt) => {
                                    return (
                                        <>
                                            {doelpunt.scorendePloeg.id === wedstrijd.data?.voetbalploegA.id ? (
                                                <div key={"doelpunt_" + doelpunt.id} className="text-left">
                                                    ⚽️ {doelpunt.tijdstipInMinuten}" - {doelpunt.scorendeSpeler.voorNaam + " " + doelpunt.scorendeSpeler.achterNaam}
                                                </div>
                                            ) : (
                                                <div key={"doelpunt_" + doelpunt.id} className="text-right">
                                                    {doelpunt.scorendeSpeler.voorNaam + " " + doelpunt.scorendeSpeler.achterNaam} - {doelpunt.tijdstipInMinuten}" ⚽️
                                                </div>
                                            )}
                                        </>
                                    );
                                })}
                        </div>

                        <div className="col-span-7 flex flex-col gap-4 ">
                            <div className={"shadow p-8 rounded-md dark:bg-black/30"}>
                                <h2 className="font-semibold text-xl mb-8">Ploeg info {wedstrijd.data?.voetbalploegA.ploegNaam}: </h2>
                                <h3 className="italic">Coach: {wedstrijd.data?.voetbalploegA.coach.voorNaam + " " + wedstrijd.data?.voetbalploegA.coach.achterNaam}</h3>
                                <h3 className="font-semibold text-lg my-4">Spelers: </h3>

                                {wedstrijd.data?.voetbalploegA.spelers.map((speler) => {
                                    return (
                                        <div className="text-zinc-700 dark:text-zinc-300">
                                            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{speler.voorNaam + " " + speler.achterNaam}</span> ({speler.leeftijd + " jaar oud"}) <span className="text-blue-600 dark:text-blue-400">(Rugnummer: {speler.rugNummer})</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={"shadow p-8 rounded-md dark:bg-black/30"}>
                                <h2 className="font-semibold text-xl mb-8">Ploeg info {wedstrijd.data?.voetbalploegB.ploegNaam}: </h2>
                                <h3 className="italic">Coach: {wedstrijd.data?.voetbalploegB.coach.voorNaam + " " + wedstrijd.data?.voetbalploegB.coach.achterNaam}</h3>
                                <h3 className="font-semibold text-lg my-4">Spelers: </h3>

                                {wedstrijd.data?.voetbalploegB.spelers.map((speler) => {
                                    return (
                                        <div className="text-zinc-700 dark:text-zinc-300">
                                            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{speler.voorNaam + " " + speler.achterNaam}</span> ({speler.leeftijd + " jaar oud"}) <span className="text-blue-600 dark:text-blue-400">(Rugnummer: {speler.rugNummer})</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
