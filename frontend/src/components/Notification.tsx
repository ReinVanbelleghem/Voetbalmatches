import React, { ReactNode } from "react";
import toast, { Toast } from "react-hot-toast";

interface Props {
    t: Toast;
    icon: ReactNode;
    head: string;
    text: string;
}
export default function Notification({ t, icon, head, text }: Props) {
    return (
        <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-white dark:bg-black shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">{icon}</div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-zinc-200">{head}</p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">{text}</p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200 dark:border-zinc-800">
                <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-indigo-300 dark:hover:text-indigo-100 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-indigo-300">
                    Close
                </button>
            </div>
        </div>
    );
}
