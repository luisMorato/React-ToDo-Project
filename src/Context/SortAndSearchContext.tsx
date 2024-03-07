import { Dispatch, SetStateAction, createContext, useState } from "react";

type sortAndSearchContextProps = {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
    Sort: string,
    setSort: Dispatch<SetStateAction<string>>,
}

export const SortAndSearchContext = createContext<sortAndSearchContextProps>({
    search: '',
    setSearch: () => void 0,
    Sort: '',
    setSort: () => void 0,
});

export const SortAndSearchContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [search, setSearch] = useState<string>('');
    const [Sort, setSort] = useState<string>('');

    return (
        <SortAndSearchContext.Provider value={{search, setSearch, Sort, setSort}}>
            { children }
        </SortAndSearchContext.Provider>
    )
}