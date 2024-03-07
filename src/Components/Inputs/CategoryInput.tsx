import { SetStateAction, Dispatch } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"

type CategoryInputProps = {
    setCategory: Dispatch<SetStateAction<string>>
    category: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean,
    emptyInput?: boolean,
}

const CategoryInput = ({ 
    setCategory,
    category,
    setIsOpen,
    isOpen,
    emptyInput
 }: CategoryInputProps) => {
    // const handleClick = () => {

    // }

    return (
        <>
            <div className={`flex items-center justify-between px-2 py-1 border text-neutral-400 rounded-md
            ${emptyInput ? "border-red-600" : "border-neutral-400/70"}`}>
                <p className={
                    `opacity duration-200
                    ${isOpen ? "opacity-0" : "opacity-1"}
                `}>{category ? category : "Select a Category"}</p>
                <button
                    onClick={() => setIsOpen((prevValue) => !prevValue)}
                >
                    {!isOpen ?
                        <FaChevronDown />
                    :
                        <FaChevronUp />
                    }
                </button>
            </div>
            {isOpen &&
                <div className={`bg-white absolute top-full border border-t-transparent w-full -translate-y-2 rounded-bl-md rounded-br-md z-50
                ${emptyInput ? "border-red-600" : "border-neutral-400/70"}`}>
                    <ul className="w-full px-5">
                        <li 
                            id="work"
                            onClick={(e) => {
                                setIsOpen(false)
                                setCategory(e.currentTarget.id)
                            }}
                            className={`py-2 border-b cursor-pointer hover:font-medium`}
                        >Work</li>
                        <li 
                            id="personal"
                            onClick={(e) => {
                                setCategory(e.currentTarget.id)
                                setIsOpen(false)
                            }}
                            className="py-2 border-b cursor-pointer hover:font-medium"
                        >Personal</li>
                        <li 
                            id="study"
                            onClick={(e) => {
                                setCategory(e.currentTarget.id)
                                setIsOpen(false)
                            }}
                            className="py-2 cursor-pointer hover:font-medium"
                        >Study</li>
                    </ul>
                </div>
            }
        </>
    )
}

export default CategoryInput;