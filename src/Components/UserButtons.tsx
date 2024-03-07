import toast from "react-hot-toast";
import { useLocalStorage } from "../hooks/useLocalStorage"

const UserButtons = () => {
    const { toDos, setTodos } = useLocalStorage("toDo");
    
    const allComplete = () => {
        if(toDos.length > 0){
            const completedToDos = toDos.map((toDo) => {
                return {
                    ...toDo,
                    completed: true,
                }
            });

            setTodos(completedToDos);
            toast.success('Marked All as Complete!');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }else{
            toast.error('No Tasks Registered!');
            return;
        }
    }
    
    const allIncomplete = () => {
        if(toDos.length > 0){
            const incompletedToDos = toDos.map((toDo) => {
                return {
                    ...toDo,
                    completed: false,
                }
            });

            setTodos(incompletedToDos);
            toast.success('Marked All as Incomplete!');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }else{
            toast.error('No Tasks Registered!');
            return;
        }
    }

    const removeAll = () => {
        if(toDos.length > 0){
            setTodos([]);
            toast.success('All Tasks Removed!');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }else{
            toast.error('No Tasks to Remove!');
            return;
        }
    }

    return (
        <div className="flex flex-col justify-center gap-y-2
        sm:w-1/2
        sm:justify-end
        md:w-full
        xl:justify-center">
            <button
                onClick={() => allComplete()}
                className="bg-[#A150F1] text-white rounded-md py-2 hover:bg-[#8421E8]"
            >Mark All as Complete</button>
            <button
                onClick={() => allIncomplete()}
                className="bg-[#A150F1] text-white rounded-md py-2 hover:bg-[#8421E8]"
            >Mark All as Incomplete</button>
            <button
                onClick={() => removeAll()}
                className="bg-[#A150F1] text-white rounded-md py-2 hover:bg-[#8421E8]"
            >Remove All Items</button>
        </div>
    )
}

export default UserButtons;