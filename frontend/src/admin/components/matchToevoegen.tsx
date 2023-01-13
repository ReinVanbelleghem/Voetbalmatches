import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { config } from "../../assets/config";
import { _ } from "../../assets/style";
import CustomSelect from "../../components/customSelect";
import Loading from "../../components/Loading";
import { Voetbalploeg } from "../../types/wedstrijden";
import Notification from "../../components/Notification";
interface Props {
    data: Voetbalploeg[];
    loading: boolean;
    error: boolean;
}

interface CProps {
    reload: () => void;
    close: () => void;
}

export default function MatchToevoegen({ close, reload }: CProps) {
    const [voetbalPloegen, setVoetbalPloegen] = useState<Props>({
        data: [],
        loading: true,
        error: false
    });
    const [ploegA, setPloegA] = useState({ id: -1, value: "Kies thuis ploeg..." });
    const [ploegB, setPloegB] = useState({ id: -1, value: "Kies uit ploeg..." });

    const [ploegenOpties, setPloegOpties] = useState<any>([]);

    useEffect(() => {
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
    }, []);

    function Add() {
        if (ploegA.id !== -1 && ploegB.id !== -1 && ploegA.id !== ploegB.id) {
            let data = {
                voetbalploegA: ploegA.id,
                voetbalploegB: ploegB.id
            };

            axios
                .post(config.api + "/wedstrijden", data)
                .then((result) => {
                    console.log(result);
                })
                .then(() => {
                    toast.custom((t) => <Notification t={t} icon={<div className="h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center">⚽️</div>} head="Succes!" text="Match toevoegen succesvol!" />);
                    reload();
                    close();
                });
        }
    }

    return (
        <div className="w-10/12 my-16 mx-auto dark:text-zinc-100">
            {voetbalPloegen.loading ? (
                <div className="w-full flex justify-center">
                    <Loading />
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl text-center font-bold mb-8">Voetbalmatch toevoegen</h2>
                    <div>
                        <h3 className="mb-2">Thuisploeg</h3>
                        {/* @ts-ignore */}
                        <CustomSelect options={ploegenOpties} chosen={ploegA} setChosen={setPloegA} />
                    </div>
                    <div className="mt-4">
                        <h3 className="mb-2">Uitploeg</h3>
                        {/* @ts-ignore */}
                        <CustomSelect options={ploegenOpties} chosen={ploegB} setChosen={setPloegB} />
                    </div>
                    <div className="mt-8">
                        <button onClick={() => Add()} className={_.button.default + " uppercase w-full"}>
                            Aanmaken
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
