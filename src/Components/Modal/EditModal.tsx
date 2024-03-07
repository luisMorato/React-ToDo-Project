import { useEffect, useState } from "react";

import { useLocalStorage } from "../../hooks/useLocalStorage";

import { FaX } from "react-icons/fa6";
import CategoryInput from "../Inputs/CategoryInput";
import toast from "react-hot-toast";

type toDo = {
    id?: number,
    title?: string,
    category?: string,    
    completed?: boolean,
    fixed?: boolean
}

type modalProps = {
    isOpen: boolean,
    onClose?: undefined | (() => void),
    toDo: toDo | undefined
}

const EditModal = ({
    isOpen,
    onClose,
    toDo
}: modalProps) => {
    const handleClose = () => {
        setShowModal(false);
        setTimeout(() => {
            onClose!();
        }, 300);
    }

    const { toDos, setTodos } = useLocalStorage("toDo");

    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen]);

    const [category, setCategory] = useState<string>('');
    const [newTitle, setNewTitle] = useState<string>('');
    const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
    const [emptyInput, setEmptyInput] = useState<boolean>(false);

    const updateTask = () => {
        if(!newTitle){
            setEmptyInput(true);
            toast.error('Something Went Wrong!');
            return;
        }

        setEmptyInput(false);

        const taskToUpdate = toDos.find((task) => task.id === toDo?.id)!;

        if(newTitle){
            taskToUpdate.title = newTitle;

        }

        if(category){
            taskToUpdate.category = category;
        }

        const filteredTodos = toDos.filter((task) => task.id !== toDo?.id);

        setTodos([
            ...filteredTodos,
            taskToUpdate
        ]);

        toast.success('Task Updated Successfully!');

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    return (
        <div className={`${isOpen ? "flex justify-center items-center fixed bg-neutral-800/70 isOpen opacity-100 h-full w-full z-50" : "opacity-0 hidden"}`}>
            <div 
                className={`absolute bg-white pb-5 translate opacity duration-300 rounded-lg w-full
                ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
                sm:w-1/2
                md:w-1/3
                xl:w-1/4
                2xl:w-1/5`}
            >
                <div className="flex justify-between items-center px-3 py-2 border-b">
                    <button
                        onClick={handleClose}
                    >
                        <FaX 
                            size={12}
                        />
                    </button>
                    <div className="flex justify-center w-full">
                        <h1 className="text-xl font-medium">Edit</h1>
                    </div>
                </div>
                <div>
                    <h2 className="text-center text-xl font-medium mt-3">Edit Your Task</h2>
                    <div className="flex flex-col gap-y-5 px-5 mb-8">
                        <div className="flex flex-col">
                            <label htmlFor="EditTitleInput">New Title:</label>
                            <input
                                id="EditTitleInput"
                                name="EditTitleInput"
                                type="text"
                                placeholder="Type the New Title"
                                onChange={(e) => setNewTitle(e.target.value)}
                                className={`border border-neutral-400/70 text-neutral-400 rounded-md py-1 px-3 focus:outline-none
                                ${emptyInput ? "border-red-600" : "border-neutral-400/70"}`}
                            />
                        </div>
                        <div className="relative">
                            <CategoryInput
                                setCategory={setCategory}
                                category={category}
                                setIsOpen={setIsCategoryOpen}
                                isOpen={isCategoryOpen}
                            />
                        </div>
                    </div>
                    <div className="w-[90%] mx-auto">
                        <button
                            onClick={() => updateTask()}
                            className="bg-[#8421E8] text-white text-lg font-medium py-1 w-full rounded-md hover:bg-[#A150F1]"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal;