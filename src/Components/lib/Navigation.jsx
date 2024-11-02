
import React from 'react';
import { MdSpaceDashboard } from "react-icons/md"; 
import { FaClipboardList, FaConciergeBell, FaUtensils } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { LiaTableSolid } from "react-icons/lia";
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
        key: 'search',
        label: 'Search',
        path: '/search',
        icon: <FaClipboardList/>
    },
    {
        key: 'mangaeorders',
        label: 'Manage Orders',
        path: '/manage',
        icon: <FaConciergeBell/>
    },
    {
        key: 'menu',
        label: 'Menu',
        path: '/menu',
        icon: <MdOutlineRestaurantMenu/>
    },
    {
        key: 'table',
        label: 'Table',
        path: '/table',
        icon: <LiaTableSolid/>
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
