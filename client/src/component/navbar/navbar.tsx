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
import { IoMdClose } from 'react-icons/io'
import { AiFillExclamationCircle, AiFillRest } from 'react-icons/ai'
import { Connect } from '../connect-modal'
import { linkNavbar } from '../../util/links'
import './navbar.scss'

export function Navbar() {
  const dispatch = useDispatch()
  const { activeSidebar, googleStatus, shoppingCart } = useTypedSelector((state) => state.stateReducer)
  const { nfts } = useTypedSelector((state) => state.yourCollectionRedux)

  const [openCart, setOpenCart] = useState(false)

  const totalPrice = shoppingCart.reduce((a: any, c: any) =>
    a + (c.value.nftPrice / 1000000000000000000 * c.value.qty), 0
  );

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

  function clearAllItem() {
    dispatch({
      type: actionType.SET_YOUR_COLLECTION,
      nfts: nfts.filter((ele: any) =>
        ({ ...nfts, cart: ele.cart = false })
      )
    })
    dispatch({
      type: actionType.SET_SHOPPING_CART,
      shoppingCart: { key: "removeAll", value: [] }
    })
  }

  function removeOne (item:any) {
    dispatch({
      type: actionType.SET_YOUR_COLLECTION,
      nfts: nfts.filter((ele: any) =>
         (ele.tokenId === item.tokenId ? { ...nfts, cart: ele.cart = false } : ele)
      )
    })
    dispatch({
      type: actionType.SET_SHOPPING_CART,
      shoppingCart: { key: "remove", value: item }
    })
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
                <aside className='cart-main'>
                  <div className='cart-outer'>
                    <div className='shopping-cart'>
                      <header>
                        <div className='fresnel-greater'>
                          <div className='cart-inner'>
                            <div className='shopping-cart-name'>
                              <h4>Your cart</h4>
                              <AiFillExclamationCircle />
                            </div>
                            <button type='button' onClick={() => setOpenCart(false)}>
                              <IoMdClose />
                            </button>
                          </div>
                          <hr />
                          <div className='count-item'>
                            <span>{shoppingCart.length} item</span>
                            <button type='button' onClick={clearAllItem}>
                              <span>
                                Clear all
                              </span>
                            </button>
                          </div>
                        </div>
                      </header>
                      <ul className='list-item'>
                        {
                          shoppingCart.map((ele: any) => (
                            <div className='shopping-cart-item'>
                              <div className='box-img-item'>
                                <span>
                                  <img src={ele.value.nftImage} alt='' />
                                </span>
                              </div>
                              <div className='content-item'>
                                <div className='content-item-inner'>
                                  <span className='item-name'>
                                    {ele.value.nftName} #{ele.value.tokenId}
                                  </span>
                                  <span className='item-owner'>
                                    {ele.value.owner}
                                  </span>
                                  <span className='item-sub'>
                                    Creation fee: 0.0001 ether
                                  </span>
                                </div>
                              </div>
                              <div className='item-price'>
                                <span>{ele.value.nftPrice / 1000000000000000000} ETH</span>
                                <AiFillRest onClick={() => removeOne(ele.value)}/>
                              </div>
                            </div>
                          ))
                        }
                      </ul>
                      <div style={{ marginBottom: '16px' }}></div>
                      <hr />
                      <footer>
                        <div className='footer-inner'>
                          <span className='footer-title'>Total price</span>
                          <span>{totalPrice} ETH</span>
                        </div>
                      </footer>
                      <div className='class-button'>
                        <button>
                          Complete purchase
                        </button>
                      </div>
                    </div>
                  </div>
                </aside>
              }
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}
