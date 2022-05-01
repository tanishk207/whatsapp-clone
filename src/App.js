import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Chat } from './components/Chat'
import FormDialog from './components/FormDialog';
import { Info } from './components/Info';
import { Login } from './components/Login';
import { Notify } from './components/Notify';
import { Sidebar } from './components/Sidebar'
import { useStateValue } from './utils/StateProvider';
export const App = () => {

  const [{ user },] = useStateValue();

  return (
    <div className='bg-[#dadbd3] h-screen w-screen min-h-[700px] grid place-items-center relative overflow-hidden'>
      {
        user ?
          (
            <>
              <div className='strip hidden lg:block h-32 w-full bg-teal-500 place-self-start absolute'></div>
              <div className='body flex lg:h-[95%] lg:w-[90%] h-full w-full bg-[#F8F8F8] shadow-lg z-10 overflow-hidden'>
                <FormDialog />
                <Routes>
                  <Route path='/' element={<><Sidebar /><Info /></>} />
                  <Route path="/rooms/:seed/:roomId" element={<><Sidebar /><Chat /></>} />
                </Routes>
                <Notify />
              </div>
            </>
          )
          :
          (
            <Login />
          )
      }
    </div>
  )
}
