import './App.css';

import { useContext } from 'react';
import { EditModalContext } from './Context/EditModalContext';

import Header from './Components/Header';
import Content from './Components/Content';
import ListModifiers from './Components/ListModifiers';
import EditModal from './Components/Modal/EditModal';

const App = () => {
  const { isOpen, toDo, setIsOpen } = useContext(EditModalContext);

  return (
    <>
      <EditModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        toDo={toDo}
      />
      <div className="bg-[#FEFEFE] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-xl overflow-x-hidden overflow-y-scroll w-full h-[555px]
      md:w-[80%]
      lg:w-[68%]
      xl:overflow-hidden
      xl:w-[60%]
      xl:max-h-[555px]
      2xl:w-[50%]">
        <Header />
        <div className='flex flex-col-reverse justify-end
        xl:flex-row
        xl:h-[450px]'>
          <Content />
          <ListModifiers />
        </div>
        <div className='pt-1 pb-2 mt-2 border-t w-[90%] mx-auto text-center'>
          <p className='text-sm'>© Powered By <span className='font-bold'>Luis Fernando</span> | 2024</p>
        </div>
      </div>
    </>
  )
}

export default App;
