import React from "react";
import { Listbox, Transition } from "@headlessui/react";

type Option = {
    id: string | number;
    value: string;
};
interface Props {
    chosen: Option;
    setChosen: () => void;
    options: Option[];
}

function CustomSelect({ chosen, setChosen, options }: Props) {
    return (
        <Listbox value={chosen} onChange={setChosen}>
            {({ open }) => (
                <>
                    <Listbox.Button className={"flex items-center w-full border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-transparent dark:border-zinc-700 px-3 py-2 dark:text-zinc-400 " + (open ? "rounded-t-md" : "rounded-md")}>
                        <div className="flex-grow text-left">{chosen.value}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={"h-5 w-5 ml-1 transition-transform " + (open ? "rotate-180" : "")} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Listbox.Button>
                    {/*
            Use the Transition + open render prop argument to add transitions.
          */}
                    <Transition show={open} leave="transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
                        {/*
              Don't forget to add `static` to your Listbox.Options!
            */}
                        <div className="w-full relative">
                            <Listbox.Options static className="bg-white dark:bg-zinc-800 dark:text-zinc-300 shadow-xl border border-zinc-300 dark:border-zinc-700 rounded-b-xl absolute w-full max-h-60 overflow-y-scroll focus:outline-none z-20">
                                {options.map((option, index) => (
                                    <Listbox.Option className={"cursor-pointer transition-colors " + (index % 2 ? "bg-black/5 dark:bg-black/10" : "")} key={option.id} value={option}>
                                        {({ active }) => <div className={`p-3 ${active ? "bg-blue-200 text-zinc-900" : ""}`}>{option.value}</div>}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </Transition>
                </>
            )}
        </Listbox>
    );
}
export default CustomSelect;
