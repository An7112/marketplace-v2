import React from 'react'
import { Link } from 'react-router-dom'
import Web3 from 'web3'
import { AiOutlineClose } from 'react-icons/ai'
import { FaEthereum } from 'react-icons/fa'
import { BsArrowBarRight } from 'react-icons/bs'
import { useTypedSelector } from '../../util/hook'
import { useDispatch } from 'react-redux'
import { actionType } from '../../util/store/action'
import '../compare-modal/compare.scss'

export function ItemModal({links}:any) {

    const dispatch = useDispatch()
    const { itemReview } = useTypedSelector((state: any) => state.stateReducer)

    const closeModal = () => {
        dispatch({
            type: actionType.SET_ITEM_REVIEW,
            itemReview: null
        })
    }

    const removeItemModal = () => {
        dispatch({
          type: actionType.SET_ITEM_REVIEW,
          itemReview: null
        })
      }

    return (
        <div className='modal-class' aria-labelledby="modal-title" role="dialog" aria-modal="true" 
        style={{display: itemReview != null 
            ?
            "block"
            :
            "none"
        }}>
            <div className='modal-frame'>
                <div className='modal-connect compare'>
                   
                        <div className='modal-content compare'>
                            <div className='class-info-chakra-stack'>
                                <h3>
                                    {itemReview?.nftName} #{itemReview?.tokenId}
                                    <Link to={`/${links}/${itemReview?.tokenId}`}>
                                        <BsArrowBarRight onClick={removeItemModal}/>
                                    </Link>
                                </h3>
                            </div>
                            <div className='modal-header'>
                                <img src={itemReview?.nftImage} alt='' />
                            </div>

                            <button className='button-close' type='button' onClick={closeModal}>
                                <AiOutlineClose />
                            </button>
                            <div className='modal-body'>

                                <div className='class-info-chakra-stack'>
                                    <div className='class-info-owner'>
                                        <img src='/media/items/nft3.avif' alt='' />
                                        <div className='owner-name'>
                                            <span style={{ color: '#ed8936' }}>Owner</span>
                                            <p>{itemReview?.owner}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='class-info-chakra-stack'>
                                    <div className='class-info-owner'>
                                        <img src='/media/items/nft2.avif' alt='' />
                                        <div className='owner-name'>
                                            <span style={{ color: '#ed8936' }}>Seller</span>
                                            <p>{itemReview?.seller}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='class-info-chakra-stack' style={{marginBottom:'0'}}>
                                    <div className='class-info-owner'>
                                        <div className='owner-name'>
                                            <span style={{ color: '#ed8936' }}>Price</span>
                                            <p>
                                                {itemReview?.nftPrice / 1000000000000000000}
                                                <FaEthereum style={{ color: "#2081e2" }} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}