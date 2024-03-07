import { useLocalStorage } from "../hooks/useLocalStorage";

const Header = () => {
    const { toDos } = useLocalStorage("toDo");

    return (
        <header className="bg-[#D8BAFD] flex items-center justify-between w-full px-10 py-5 rounded-tl-xl rounded-tr-xl">
            <div className="flex gap-x-3">
                <div className="bg-[#D9D9D9] w-4 h-4 rounded-full"></div>
                <div className="bg-[#D9D9D9] w-4 h-4 rounded-full"></div>
                <div className="bg-[#D9D9D9] w-4 h-4 rounded-full"></div>
            </div>
            <div>
                <p className="text-black"><span className="font-medium">{toDos.filter((toDo) => toDo.completed === true).length}</span>/{toDos.length} Items Completed</p>
            </div>
        </header>
    )
}

export default Header;