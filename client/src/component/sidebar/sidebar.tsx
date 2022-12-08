import React from 'react'
import { useTypedSelector } from '../../util/hook';
import { NavLink } from 'react-router-dom';
import { linkList } from '../../util/links';
import './sidebar.scss'

export function Sidebar() {
  const { activeSidebar } = useTypedSelector((state) => state.stateReducer)
  
  return (
    <div className='sidebar' style={{ width: activeSidebar ? "272px" : "0" }}>
      <div className='sidebar-link' style={{ width: activeSidebar ? "100%" : "0" }}>
        {linkList.map((item:any) => (
          <div key={item.title} className="link-list">
            <span className='title-link'>{item.title}</span>
            {item.links.map((link: any) => (
              <NavLink
                className="sisebar-navlink"
                to={`/${link.name}`}
                key={link.name}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? 'white' : '',
                  color: isActive ? 'rgb(32, 34, 37)' : ""
                })}
              >
                {link.icon} <span>{link.name}</span>
              </NavLink>
            ))
            }
          </div>
        ))}
      </div>
    </div>
  )
}
