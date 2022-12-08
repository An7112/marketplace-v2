import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { actionType } from '../../util/store/action'
import Web3 from 'web3'
import { AiOutlineClose } from 'react-icons/ai'
import { FaEthereum } from 'react-icons/fa'
import { BsArrowBarRight } from 'react-icons/bs'
import './compare.scss'

export function CompareModal({ propsData, links }: any) {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();

    const closeModal = () => {
        searchParams.delete("item1")
        searchParams.delete("item2")
        setSearchParams(searchParams)
    }

    const removeModal = () => {
        dispatch({
            type: actionType.SET_COMPARE_DATA,
            compare: null
        })
    }

    return (
        <>
            {
                propsData.length > 1
                &&
                <div className='modal-class' aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className='modal-frame'>
                        <div className='modal-connect compare'>
                            {propsData.filter((ele: any) => ele != null).map((ele: any) => (
                                <div className='modal-content compare' key={ele.tokenId}>
                                    <div className='class-info-chakra-stack'>
                                        <h3>
                                            {ele.nftName} #{ele.tokenId} 
                                            <Link to={`/${links}/${ele.tokenId}`}>
                                                <BsArrowBarRight onClick={removeModal}/>
                                            </Link>
                                        </h3>
                                        
                                    </div>
                                    <div className='modal-header'>
                                        <img src={ele.nftImage} alt='' />
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
                                                    <p>{ele.owner}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='class-info-chakra-stack'>
                                            <div className='class-info-owner'>
                                                <img src='/media/items/nft2.avif' alt='' />
                                                <div className='owner-name'>
                                                    <span style={{ color: '#ed8936' }}>Seller</span>
                                                    <p>{ele.seller}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='class-info-chakra-stack'>
                                            <div className='class-info-owner'>
                                                <div className='owner-name'>
                                                    <span style={{ color: '#ed8936' }}>Price</span>
                                                    <p>
                                                        {Web3.utils.fromWei(ele.nftPrice)}
                                                        <FaEthereum style={{ color: "#2081e2" }} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}