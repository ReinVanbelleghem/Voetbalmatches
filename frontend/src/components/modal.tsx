import React, { useRef } from "react";
import { Transition } from "@headlessui/react";

type Props = {
    openButtonValue?: string | JSX.Element;
    openButtonClasses?: string;
    condition: any;
    setCondition: Function;
    uuid?: string;
    children: JSX.Element;
    boxClasses?: string;
};

export default function Modal({ openButtonValue, openButtonClasses, condition, setCondition, uuid, children, boxClasses }: Props) {
    const modalRef = useRef<HTMLHeadingElement>(null);
    const closeModalRef = (e: React.MouseEvent) => {
        if (modalRef.current === e.target) {
            closeModal();
        }
    };

    function openModal() {
        if (uuid) {
            setCondition([...condition, uuid]);
        } else {
            setCondition(true);
        }
    }

    function closeModal() {
        if (uuid) setCondition(condition.filter((x: string) => x !== uuid));
        else setCondition(false);
    }

    function isOpen() {
        if (uuid) return condition.includes(uuid);
        return condition;
    }

    return (
        <>
            <button onClick={() => openModal()} className={openButtonClasses}>
                {openButtonValue}
            </button>
            <div className={isOpen() ? "bg-black/20 dark:bg-black/60 backdrop-blur-[2px] fixed z-20 w-full h-screen top-0 left-0 overflow-y-auto" : ""}>
                <Transition show={isOpen()} enter="transition-translate duration-0" enterFrom="translate-y-0" enterTo="translate-y-0" leave="transition-translate duration-0" leaveFrom="translate-y-0" leaveTo="translate-y-0">
                    <div className="fixed z-40 w-full h-screen top-0 left-0 overflow-y-auto" ref={modalRef} onClick={closeModalRef}>
                        <div className={boxClasses ? boxClasses : "w-full md:w-10/12 lg:w-9/12 xl:w-7/12 md:mx-auto mt-12 lg:mt-36 mb-16"}>
                            <div id="modal" className="bg-white dark:bg-zinc-900 dark:border-2 dark:border-zinc-800 text-left p-6 rounded-lg shadow relative animate">
                                <button className="absolute top-5 right-5 text-gray-400 transition-colors hover:bg-slate-100 p-2 rounded-full dark:hover:bg-black" onClick={() => closeModal()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div>{children}</div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </>
    );
}
