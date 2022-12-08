import React from 'react'
import {AiOutlineLoading} from 'react-icons/ai'
import './modal.scss'

export function RequestModal() {
  return (
    <div className='modal-class' aria-labelledby="modal-title" role="dialog" aria-modal="true" style={{zIndex:'999999999'}}>
        <div className='modal-frame'>
            <div className='modal-request'>
              <AiOutlineLoading className='load-icon'/>
              <p>Processing...</p>
            </div>
        </div>
    </div>
  )
}