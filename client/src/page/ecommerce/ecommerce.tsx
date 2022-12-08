import React from 'react'
import { useTypedSelector } from '../../util/hook'
import { SwiperSlide } from '../../component/swiper'
import { Collection } from '../../component/collection'
import { Modal } from '../../component/message-modal'
import { ToastMessage } from '../../component/toast-message'
import './ecommerce.scss'

export function Ecommerce() {
  const { googleStatus} = useTypedSelector((state) => state.stateReducer)
  
  return (
    <>
      {googleStatus === false && <Modal />}
      <>
        <ToastMessage keyMessage={"ecommerce"} />
        <div className='content-grid'>
          <div className='fresnel-container'>
            <h1 className='headerText'>Explore, collect and sell NFTs</h1>
          </div>
          <SwiperSlide />
        </div>
        <Collection />
      </>
    </>

  )
}
