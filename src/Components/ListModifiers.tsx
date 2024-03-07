import Add from "./Add";
import UserButtons from "./UserButtons";

const ListModifiers = () => {
    return(
        <div className="flex flex-col gap-y-5 px-5 pt-4
            sm:flex-row
            sm:gap-x-3
            xl:flex-col
            xl:justify-between 
            xl:w-[36%]
            xl:px-8
            xl:pt-0"
        >
            <Add />
            <UserButtons />
        </div>
    )
}

export default ListModifiers;