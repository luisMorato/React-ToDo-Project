import { Dispatch, SetStateAction, createContext, useState } from "react";

type toDo = {
    id?: number,
    title?: string,
    category?: string,    
    completed?: boolean,
    fixed?: boolean
}

type EditModalContextProps = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
    toDo: toDo | undefined
    setToDo: Dispatch<SetStateAction<toDo | undefined>>
}

export const EditModalContext = createContext<EditModalContextProps>({
    isOpen: false,
    setIsOpen: () => void 0,
    toDo: undefined,
    setToDo: () => void 0,
});

export const EditModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [toDo, setToDo] = useState<toDo | undefined>(undefined);

    return (
        <EditModalContext.Provider  value={{ isOpen, setIsOpen, toDo, setToDo }}>
            { children }
        </EditModalContext.Provider>
    )
}