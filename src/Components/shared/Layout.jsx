import React from 'react'
import { Outlet} from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'




const Layout = () => {
  return (
    <div className='flex flex-row min-h-screen bg-neutral-100 overflow-hidden'>
       <div className='hidden lg:block'>
       <Sidebar />
       </div>
        <div>
          <div>
          <Header/>
          </div>
          
          {<Outlet />}
          </div>
        
        
    </div>
  )
}

export default Layout