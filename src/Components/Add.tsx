import { useState, useTransition } from "react";
import { FaPlus } from "react-icons/fa6";

import { useLocalStorage } from "../hooks/useLocalStorage";

import CategoryInput from "./Inputs/CategoryInput";
import toast from "react-hot-toast";

type toDo = {
    id?: number,
    title?: string,
    category?: string,    
    completed?: boolean,
    fixed?: boolean,
};

const Add = () => {
    const [isPending, startTransition] = useTransition();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const [addToDo, setAddToDo] = useState<toDo | undefined>(undefined);
    const [category, setCategory] = useState<string>('');
    const [emptyInput, setEmptyInput] = useState<boolean>(false);

    const {toDos, setTodos} = useLocalStorage("toDo");

    const autoIncrement = () => {
        const biggestId = toDos.reduce((prevId, currentId) => {
            return currentId.id! > prevId.id! ? currentId : prevId;
        }, {id: 0});
        return biggestId.id! + 1;
    }

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddToDo({
            id: autoIncrement() as number,
            title: e.target.value,
            completed: false,
            fixed: false
        });
    }

    const handleAdd = () => {
        const completedToDo: toDo | undefined = {
            ...addToDo,
            category: category
        }
        if(!completedToDo?.title || !completedToDo?.category){
            setEmptyInput(true);
            toast.error('Something Went Wrong!');
            return;
        }

        if(toDos.some((toDo) => toDo.title?.includes(completedToDo?.title as string))){
            toast.error('Task Already Exists!');
            return;
        }

        if(completedToDo){
            setEmptyInput(false);
            try {
                startTransition(() => {
                    setTodos([
                        ...toDos,
                        completedToDo
                    ]);
                });
                toast.success('Task Added Successfully!');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (error) {
                console.log('Error: ', error);
                toast.error('Something Went Wrong!');
            }
        }
    }

    return (
        <div className="w-full
        sm:w-1/2
        md:w-full">
            <p className="font-medium mt-2 mb-1">Add an Item</p>
            <div className="relative flex flex-col gap-y-2 mb-5">
                <input
                    id="title"
                    name="title"
                    placeholder="Type the Title"
                    type="text"
                    onChange={(e) => handleEdit(e)}
                    disabled={isPending}
                    className={`border border-neutral-400/70 text-neutral-400 font-medium rounded-md w-full px-2 py-2 focus:outline-none disabled:cursor-wait
                    ${emptyInput ? "border-red-600" : "border-neutral-400/70"}`}
                />
                <CategoryInput 
                    setCategory={setCategory}
                    category={category}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    emptyInput={emptyInput}
                />
            </div>
            <button
                onClick={handleAdd}
                disabled={isPending}
                className="bg-[#8421E8] text-white text-lg font-medium flex items-center justify-center gap-x-2 rounded-md w-full py-2 disabled:cursor-wait hover:bg-[#A150F1]"
            >
                <FaPlus />
                <span>Add to List</span>
            </button>
        </div>
    )
}

export default Add;