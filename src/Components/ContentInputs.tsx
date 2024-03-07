import { useContext, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { MdOutlineSearch } from "react-icons/md";
import { SortAndSearchContext } from "../Context/SortAndSearchContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ContentInputs = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { toDos } = useLocalStorage("toDo");
    const { search, setSearch, setSort, Sort } = useContext(SortAndSearchContext);

    return (
        <div className="relative flex flex-col gap-y-2">
            <div className="relative border border-neutral-400/70 rounded-md overflow-hidden">
                <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Search an Item"
                    onChange={(e) => setSearch(e.target.value)}
                    className="text-neutral-400 font-medium pl-10 py-2 focus:outline-none w-full peer"
                />
                <MdOutlineSearch
                    size={25}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rotate-90 text-neutral-400 peer-focus:text-black"
                />
            </div>
            <div className="relative border border-neutral-400/70 rounded-md overflow-hidden">
                <div className="text-neutral-400 font-medium pl-4 py-2 focus:outline-none w-full">
                    <p className={
                        `opacity duration-200
                        ${isOpen ? "opacity-0" : "opacity-1"}
                    `}>{Sort && !search && toDos.length > 0 ? Sort : "Sort By"}</p>
                </div>
                <button
                    onClick={() => {setIsOpen((prevValue) => !prevValue)}}
                    className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center border-l border-l-neutral-400 h-[60%] px-4"
                >
                    {!isOpen ?
                        <FaChevronDown
                            size={15}
                            className="text-neutral-400 cursor-pointer"
                        />
                        :
                        <FaChevronUp
                        size={15}
                        className="text-neutral-400 cursor-pointer"
                        />
                    }
                </button>
            </div>
            {isOpen && 
                <div className="absolute top-full left-0 -translate-y-2 h-fit bg-white w-full z-50 rounded-bl-md rounded-br-md border border-neutral-400/70 border-t-transparent">
                    <ul className="w-full px-5">
                        <li 
                            id="complete"
                            onClick={(e) => setSort(e.currentTarget.id)}
                            className="py-2 border-b cursor-pointer hover:font-medium"
                        >Complete</li>
                        <li
                            id="incomplete"
                            onClick={(e) => setSort(e.currentTarget.id)}
                            className="py-2 border-b cursor-pointer hover:font-medium"
                        >Incomplete</li>
                        <li 
                            id="Fisrt Added"
                            onClick={(e) => setSort(e.currentTarget.id)}
                            className="py-2 border-b cursor-pointer hover:font-medium"
                        >Fisrt Added</li>
                        <li 
                            id="Last Added"
                            onClick={(e) => setSort(e.currentTarget.id)}
                            className="py-2 cursor-pointer hover:font-medium"
                        >Last Added</li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default ContentInputs;
