import React from 'react'
import { AiFillExclamationCircle, AiFillRest } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { TbShoppingCartDiscount } from 'react-icons/tb'
import { useAppDispatch, useTypedSelector } from '../../../util/hook'
import { actionType } from '../../../util/store/action'
import './shopping.scss'

export function Shopping({ propsCallback }: any) {
  const dispatch = useAppDispatch()
  const { shoppingCart } = useTypedSelector((state) => state.stateReducer)
  const { nfts } = useTypedSelector((state) => state.yourCollectionRedux)

  const totalPrice = shoppingCart.reduce((a: any, c: any) =>
    a + (c.nftPrice / 1e18 * c.qty), 0
  );

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

  function removeOne(item: any) {
    const exist = shoppingCart.find((x: any) => x.tokenId === item.tokenId)
    if (exist.qty === 1) {
      dispatch({
        type: actionType.SET_YOUR_COLLECTION,
        nfts: nfts.filter((ele: any) =>
          (ele.tokenId === item.tokenId ? { ...nfts, cart: ele.cart = false } : ele)
        )
      })
      dispatch({
        type: actionType.SET_SHOPPING_CART,
        shoppingCart: { key: "remove", value: shoppingCart.filter((x: any) => x.tokenId !== item.tokenId) }
      })
    } else {
      dispatch({
        type: actionType.SET_SHOPPING_CART,
        shoppingCart: { key: "remove", value: shoppingCart.map((x: any) => x.tokenId === item.tokenId ? { ...exist, qty: exist.qty -= 1 } : x) }
      })
    }
  }

  const closeCart = () => {
    propsCallback(false)
  }

  return (
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
                <button type='button' onClick={closeCart}>
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
              shoppingCart.length === 0
                ?
                <img src='/media/cart-empty.jpg' alt='' className='cart-empty-bg' />
                :
                <>
                  {
                    shoppingCart.map((ele: any) => (
                      <div className='shopping-cart-item'>
                        <div className='box-img-item'>
                          <span>
                            <img src={ele.nftImage} alt='' />
                          </span>
                        </div>
                        <div className='content-item'>
                          <div className='content-item-inner'>
                            <span className='item-name'>
                              {ele.nftName} #{ele.tokenId}
                              <span className='item-name qty'><TbShoppingCartDiscount /> {ele.qty}</span>
                            </span>
                            <span className='item-owner'>
                              {ele.owner}
                            </span>
                            <span className='item-sub'>
                              Creation fee: 0.0001 ether
                            </span>

                          </div>
                        </div>
                        <div className='item-price'>
                          <span>{ele.nftPrice / 1e18} ETH</span>
                          <AiFillRest onClick={() => removeOne(ele)} />
                        </div>
                      </div>
                    ))
                  }
                </>
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
              Coming soon
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}