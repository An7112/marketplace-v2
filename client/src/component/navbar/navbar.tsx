import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../util/hook'
import { actionType } from '../../util/store/action/actionType'
import { Link, NavLink } from 'react-router-dom'
import { BsSearch, BsLayoutSidebarInset } from 'react-icons/bs'
import { BiWallet } from 'react-icons/bi'
import { FaRegUserCircle } from 'react-icons/fa'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { IoSettingsOutline } from 'react-icons/io5'
import { Connect } from '../connect-modal'
import { linkNavbar } from '../../util/links'
import './navbar.scss'
import { Shopping } from './shopping-cart/shopping'

export function Navbar() {
  const dispatch = useDispatch()
  const { activeSidebar, googleStatus, shoppingCart } = useTypedSelector((state) => state.stateReducer)

  const [openCart, setOpenCart] = useState(false)

  const setActiveSidebar = () => {
    dispatch({
      type: actionType.SET_ACTIVE_SIDEBAR,
      activeSidebar: !activeSidebar
    })
  }

  function setOnline() {
    dispatch({
      type: actionType.SET_LOADING_COLLECTION,
      loadingCollection: false
    })
    dispatch({
      type: actionType.SET_LOADING_SWIPER,
      loadingSwiper: false
    })
    dispatch({
      type: actionType.SET_GOOGLE_STATUS,
      googleStatus: true
    })
  }

  function setOffline() {
    dispatch({
      type: actionType.SET_LOADING_COLLECTION,
      loadingCollection: true
    })
    dispatch({
      type: actionType.SET_LOADING_SWIPER,
      loadingSwiper: true
    })
    dispatch({
      type: actionType.SET_GOOGLE_STATUS,
      googleStatus: false
    })
  };

  function connectWallet() {
    dispatch({
      type: actionType.SET_OPEN_CONNECT,
      connect: true
    })
  }

  const callbackOpenCart = (callbackData: boolean) => {
    setOpenCart(callbackData)
}
  
  useEffect(() => {
    window.addEventListener('offline', setOffline);
    window.addEventListener('online', setOnline);
    return () => {
      window.removeEventListener('offline', setOffline);
      window.removeEventListener('online', setOnline);
    }
  }, [googleStatus]);

  return (
    <div className='navbar-outer'>
      <Connect />
      <div className='navbar-inner'>
        <div className='navbar-main'>
          <div className='navbar-logo'>
            <a className='navbar-brand'>
              <div className='navbar-brand-logo' onClick={setActiveSidebar}>
                <BsLayoutSidebarInset />
              </div>
              <div className='navbar-brand-name'>
                <NavLink to='/ecommerce'>
                  <h3>MARKETPLACE</h3>
                </NavLink>
              </div>
            </a>
          </div>
          <div className='search-outer'>
            <div className='fresnel-container'>
              <div className='search-inner'>
                <div className='search-content'>
                  <div className='search-icon'>
                    <BsSearch className='bs-search' />
                  </div>
                  <input placeholder='Search for items, collections, and accounts...' type='search' className='search-input' />
                </div>
              </div>
            </div>
          </div>
          <ul className='ul-list'>
            <div className='navbar-list-links'>
              <li>
                <a className='navbar-item-main' href='#'>
                  <span>Explorer</span>
                </a>
              </li>
              <li>
                <a className='navbar-item-main' href='#'>
                  <span>Statistics</span>
                </a>
              </li>
              <li>
                <a className='navbar-item-main' href='#'>
                  <span>Resources</span>
                </a>
              </li>
              <li>
                <a className='navbar-item-main' href='#'>
                  <span>Create</span>
                </a>
              </li>
              <li>
                <a className='navbar-item-main'>
                  <FaRegUserCircle className='nav-icon' style={{ fontSize: "25px" }} />
                  <div className='dropdown'>
                    {linkNavbar.map((ele: any) => (
                      <NavLink
                        to={`/${ele.link}`}
                        style={({ isActive }) => ({
                          backgroundColor: isActive
                            ?
                            'rgb(26, 30, 36)'
                            :
                            '#121619',
                          color: isActive
                            ?
                            'white'
                            :
                            ""
                        })}>
                        <div className='dropdown-item'>
                          {ele.icon}
                          <p>{ele.name}</p>
                        </div>
                      </NavLink>
                    ))}

                    <Link
                      to="#"
                      onClick={connectWallet}>
                      <div className='dropdown-item'>
                        <IoSettingsOutline className='dropdown-item-icon' />
                        <p>Account</p>
                      </div>
                    </Link>
                    <NavLink to="#">
                      <div className='dropdown-item last'>
                        <IoSettingsOutline className='dropdown-item-icon' />
                        <p>Settings</p>
                      </div>
                    </NavLink>
                  </div>
                </a>
              </li>
              <li>
                <a className='navbar-item-main' href='#'>
                  <BiWallet className='nav-icon' style={{ fontSize: "25px" }} />
                </a>
              </li>
              <li>
                <div className='navbar-item-main' onClick={() => setOpenCart(true)}>
                  <HiOutlineShoppingCart className='nav-icon' style={{ fontSize: "25px" }} />
                  <div className='cart-quantity'>
                    {shoppingCart.length}
                  </div>
                </div>
              </li>

              {/*  */}
              {
                openCart === true
                &&
                <Shopping propsCallback={callbackOpenCart}/>
              }

            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}
