
import React from 'react';
import { MdSpaceDashboard } from "react-icons/md"; 
import { FaClipboardList, FaConciergeBell, FaUtensils } from "react-icons/fa";
import { GiCook, GiTable } from "react-icons/gi"; 
import { IoMdPeople } from "react-icons/io"; 
import { RiArchiveDrawerLine } from "react-icons/ri"; 
import { AiOutlineBarChart, AiOutlineSetting } from "react-icons/ai"; 
import { BiLogOut } from "react-icons/bi"; 




export const Sidebar_Links  = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <MdSpaceDashboard/>
    },
    {
        key: 'orders',
        label: 'Orders',
        path: '/orders',
        icon: <FaClipboardList/>
    },
    {
        key: 'createorders',
        label: 'Create Orders',
        path: '/createorders',
        icon: <FaConciergeBell/>
    },
    {
        key: 'menu',
        label: 'Menu',
        path: '/menu',
        icon: <GiCook/>
    },
    {
        key: 'table',
        label: 'Table',
        path: '/table',
        icon: <GiTable/>
    },
    {
        key: 'employees',
        label: 'Employees',
        path: '/employees',
        icon: <IoMdPeople/>
    },
    {
        key: 'inventory',
        label: 'Inventory',
        path: '/inventory',
        icon: <RiArchiveDrawerLine/>
    },
    {
        key: 'kitchen_orders',
        label: 'Kitchen Orders',
        path: '/kitchen-orders',
        icon: <FaUtensils/>
    },
    {
        key: 'analytics',
        label: 'Analytics',
        path: '/analytics',
        icon: <AiOutlineBarChart/>
    },
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <AiOutlineSetting/>
    },
];

export const Sidebar_Logout  = [
    {
        key: 'logout',
        label: 'Logout',
        path: '/login',
        icon: <BiLogOut/>
    }
];
