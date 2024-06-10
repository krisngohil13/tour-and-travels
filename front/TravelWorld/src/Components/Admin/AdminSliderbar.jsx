import React from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";

import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

function AdminSliderbar ({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        
        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/AdminTour">
                    <BsFillArchiveFill className='icon'/> Tours
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/booked">
                    <BsFillGrid3X3GapFill className='icon'/> Booking
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default AdminSliderbar;