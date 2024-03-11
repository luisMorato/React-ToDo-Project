import { useCallback, useContext, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

import { SortAndSearchContext } from "../Context/SortAndSearchContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

import ContentInputs from "./ContentInputs";
import List from "./List";

type toDo = {
    id?: number,
    title?: string,
    category?: string,    
    completed?: boolean,
    fixed?: boolean,
};

const Content = () => {
    const [isPending, startTransition] = useTransition();

    const {toDos, setTodos} = useLocalStorage("toDo");
    const { search, Sort } = useContext(SortAndSearchContext);

    const [filteredToDos, setFilteredToDos] = useState<Array<toDo>>([]);

    useEffect(() => {
        const checkSort = () => {
            let filtered = toDos;
            
            if(Sort){
                switch(Sort.replace(" ", "")){
                    case "complete":
                        return [...filtered] = filtered.sort((toDoA, toDoB) => {
                            if(toDoB.completed === toDoA.completed){
                                return 0;
                            }
                            if(toDoB.completed){
                                return -1;
                            }
                            return 1;
                        });
                        case "incomplete":
                            return [...filtered] = filtered.sort((toDoA, toDoB) => {
                                if(toDoA.completed === toDoB.completed){
                                    return 0;
                                }
                                if(toDoA.completed){
                                    return -1;
                                }
                                return 1;
                            });
                        case "FisrtAdded":
                            return [...filtered] = filtered.sort((toDoA, toDoB) => {
                                 return toDoB.id! - toDoA.id!
                            });
                        case "LastAdded":
                            return [...filtered] = filtered.sort((toDoA, toDoB) => {
                                    return toDoA.id! - toDoB.id!
                            });
                }
            }
            return filtered;
        }

        const sortedToDos = checkSort();
        setFilteredToDos(sortedToDos);
    }, [Sort, toDos]);

    useEffect(() => {
        if(toDos.some((toDo) => toDo.fixed === true)){
            setFilteredToDos(() => {
                return toDos.sort((toDoA, toDoB) => {
                    if(toDoA.fixed === toDoB.fixed){
                        return 0;
                    }
                    if(toDoA.fixed){
                        return -1;
                    }
                    return 1;
                })
            })
        }
    }, [toDos]);

    const RemoveToDo = useCallback((id: number) => {
        if(id === null || id === undefined){
            toast.error('Something Went Wrong!');
            return;
        }

        try {
            startTransition(() => {
                setTodos(toDos.filter((toDo) => toDo.id !== id));
            });
            toast.success('Task Removed Successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log('error: ', error);
            toast.error('Something Went Wrong!');
        }
    }, [setTodos, toDos])

    const CompleteToDo = useCallback((id: number) => {
        if(id === null || id === undefined){
            toast.error('Something Went Wrong!');
            return;
        }

        const searchToDo = toDos.find((toDo) => toDo.id === id);

        if(searchToDo){
            try {
                startTransition(() => {
                    searchToDo.completed = !searchToDo.completed;

                    setTodos([
                        ...(toDos.filter((toDo) => toDo.id !== searchToDo.id)),
                        searchToDo
                    ]);
                });
                toast.success(searchToDo.completed ? `State Updated to Completed!` : `State Updated to Incompleted!`);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (error) {
                console.log('error: ', error);
                toast.error('Something Went Wrong!');
            }
        }
    }, [setTodos, toDos])

    const pinningToDo = useCallback((id: number) => {
        if(id === null || id === undefined){
            toast.error('Something Went Wrong!');
            return;
        }

        const searchToDo = toDos.find((toDo) => toDo.id === id);

        if(searchToDo){
            try {
                startTransition(() => {
                    searchToDo.fixed = !searchToDo.fixed;
                    setTodos([
                        ...toDos.filter((toDo) => toDo.id !== searchToDo.id),
                        searchToDo
                    ]);
                });
                toast.success(searchToDo.fixed ? `Task Pinned Successfully!` : `Task Unpinned Successfully!`);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (error) {
                console.log('error: ', error);
                toast.error('Something Went Wrong!');
            }
        }
    }, [setTodos, toDos]);

    return (
        <div className="w-full mt-5 px-5
        xl:px-0
        xl:mt-0
        xl:pl-10 
        xl:pr-5 
        xl:py-8
        xl:w-[64%]">
            <ContentInputs />
            <div 
                className={
                    `mt-5
                    ${toDos.length > 4 ? "overflow-y-scroll h-[300px]" : "h-[450px] max-h-[450px]"}
                `}
            >
                {filteredToDos && toDos.length > 0 ?
                    filteredToDos
                    .filter((toDo) => toDo.title?.toLowerCase().replace(/\s/g, '').includes(search.toLowerCase().replace(/\s/g, '')))
                    .map((toDo) => (
                        <List
                            key={toDo.id}
                            toDo={toDo}
                            filteredToDos={filteredToDos}
                            RemoveToDo={RemoveToDo}
                            CompleteToDo={CompleteToDo}
                            pinningToDo={pinningToDo}
                            isPending={isPending}
                        />
                    ))
                    :
                    (<h2 className="text-center font-medium text-xl mt-10">The List Is Empty</h2>)
                }
            </div>
        </div>
    )
}

export default Content;