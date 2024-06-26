import { useContext } from "react";
import { FaCheck, FaX } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";

// import { useLocalStorage } from "../hooks/useLocalStorage";

import { captalize } from "../utils/helpfullFunctions";
import { EditModalContext } from "../Context/EditModalContext";
// import toast from "react-hot-toast";

type toDo = {
    id?: number,
    title?: string,
    category?: string,    
    completed?: boolean,
    fixed?: boolean
}

type ListProps = {
    toDo: toDo,
    filteredToDos: toDo[],
    RemoveToDo: (id: number) => void,
    CompleteToDo: (id: number) => void,
    pinningToDo: (id: number) => void,
    isPending: boolean
};

const List = ({ 
    toDo,
    filteredToDos,
    RemoveToDo,
    CompleteToDo,
    pinningToDo,
    isPending
 }: ListProps) => {
    const { setIsOpen, setToDo: setCurrentToDo } = useContext(EditModalContext);
    
    return toDo && (
        <div
            className={`relative flex justify-between w-full py-4 px-3
                ${filteredToDos.findIndex((task) => task.id === toDo.id) % 2 === 0 ? "bg-[#d9d9d934]" : "bg-white"}
            `}
        >
            <div className="flex items-center justify-between gap-x-2"> 
                <div className="relative">
                    <input
                        type="checkbox"
                        onChange={() => pinningToDo(toDo.id as number)}
                        checked={toDo.fixed}
                        disabled={isPending}
                        className="appearance-none cursor-pointer bg-[#8421E8] rounded-[2px] w-3 h-3 peer
                        md:w-4 
                        md:h-4"
                    />
                    <FaCheck
                        size={15}
                        className="hidden text-white font-medium absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 peer-checked:block pointer-events-none"
                    />
                </div>
                <div className="flex flex-col">
                    <p
                        className={`font-medium
                            ${toDo.completed ? "line-through" : ""}
                        `}
                    >
                        {captalize(toDo.title as string)}
                    </p>
                    <p 
                    className="text-nowrap text-xs text-neutral-400
                    sm:text-sm"
                    >Category: {captalize(toDo.category as string)}</p>
                </div>
            </div>
            <div className="flex items-center justify-between gap-x-4">
                <button 
                    onClick={() => CompleteToDo(toDo.id as number)}
                    disabled={isPending}
                    className={`text-white text-sm py-1 rounded-md w-[80px] disabled:cursor-wait
                    sm:text-base
                    sm:w-[100px]
                    ${!toDo.completed ? "bg-[#319A2F] hover:bg-[#61cc5f]" : "bg-[#2F949A] hover:bg-[#4fb1b6]"}
                    `}
                >
                    {toDo.completed ? "Undo" : "Complete"}
                </button>
                <button
                    onClick={() => RemoveToDo(toDo.id as number)}
                    disabled={isPending}
                    className="disabled:cursor-wait"
                >
                    <FaX 
                        size={15}
                        className="text-red-600"
                    />
                </button>
            </div>
            <button
                onClick={() => {
                    setIsOpen(true)
                    setCurrentToDo(toDo)
                }}
                disabled={isPending}
                className="absolute top-1 right-3 disabled:cursor-wait"
            >
                <MdModeEditOutline
                    size={15}
                />
            </button>
        </div>
    )
}

export default List;