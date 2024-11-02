import React from 'react'
import { Sidebar_Links, Sidebar_Logout } from '../lib/Navigation'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'


const ClassLinks = 'flex item-center gap-2 p-3 font-light px-3 hover:bg-gradient-to-r hover:from-purple-800 hover:to-purple-100 hover:no-underline hover:text-white active:bg-neutral-600 rounded-md text-base'
function SideLink({item}){
  const {pathname} = useLocation();
  return(
    <Link to={item.path} className={classNames(pathname === item.path ? 'text-white bg-gradient-to-r from-purple-900 to-purple-100': 'text-black',ClassLinks)}>
    <span className='text-xl'>{item.icon}</span>
    {item.label}
    </Link>
  )
}
function SideBottom({item}){
  const {pathname} = useLocation();
  return(
    <Link to={item.path} className={classNames(pathname === item.path ? 'text-white bg-purple-800': 'text-black',ClassLinks,'font-bold pl-14 text-red-500')}>
    <span className='text-2xl'>{item.icon}</span>
    {item.label}
    </Link>
  )
}
const Sidebar = () => {
  return (
    <div className='flex flex-col bg-white min-w-64 min-h-screen border-r-[1px] text-black'>
      <div className='flex flex-row p-1 pl-3 h-16 border-b w-full'>
          <span className='text-2xl p-3 pb-6'>Dine-n-Shine</span>
        </div>
      <div className='flex-1 flex flex-col py-5 gap-0.5 p-3'>
        {Sidebar_Links.map((item)=>(
          <SideLink key={item.key} item={item}/>
        ))}
      </div>
      <div className='flex flex-col py-3 pt-2 mx-3 border-t border-gray-500 '>
        {Sidebar_Logout.map((item)=>(
          <SideBottom key={item.key} item={item}/>
        ))}
      </div>
    </div>
  )
}

export default Sidebar