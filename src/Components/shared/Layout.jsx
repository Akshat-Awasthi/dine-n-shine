import React from 'react'
import { Outlet} from 'react-router-dom'
import Sidebar from './Sidebar'




const Layout = () => {
  return (
    <div className='flex flex-row min-h-screen bg-neutral-100 overflow-hidden'>
        <Sidebar />
        <div>{<Outlet />}</div>
        
        
    </div>
  )
}

export default Layout