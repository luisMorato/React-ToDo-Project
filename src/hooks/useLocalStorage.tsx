import { Dispatch, SetStateAction, useEffect, useState } from "react";

type toDo = {
    id?: number,
    title?: string,
    category?: string,    
    completed?: boolean,
    fixed?: boolean,
};

type useLocalStorageProps = {
    toDos: toDo[], 
    setTodos: Dispatch<SetStateAction<toDo[]>>
}

export const useLocalStorage = (key: string): useLocalStorageProps => {
    const [toDos, setTodos] = useState<Array<toDo>>(() => {
        return JSON.parse(localStorage.getItem(key) ?? JSON.stringify([]));
    });

    useEffect(() => {
        const FilteredToDos = Array.from(new Set(toDos));
        if(FilteredToDos){
            localStorage.setItem(key, JSON.stringify(FilteredToDos) ?? JSON.stringify([]));
        }
    }, [toDos, key]);

    return { toDos, setTodos };
}