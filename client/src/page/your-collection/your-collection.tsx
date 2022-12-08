import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../util/hook'

import { TbCurrencyEthereum } from 'react-icons/tb'
import { SiWebmoney, SiDiscord, } from 'react-icons/si'
import { FiInstagram, FiTwitter } from 'react-icons/fi'
import { AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai'
import { BsThreeDots, BsPatchCheckFill } from 'react-icons/bs'
import { MdCreate } from 'react-icons/md'
import { CompareModal } from '../../component/compare-modal'
import { LoadingFrame } from '../../component/loading'
import { CreateModal } from '../../component/create-modal'
import { Modal } from '../../component/message-modal'
import { RequestModal } from '../../component/request-modal'
import { ToastMessage } from '../../component/toast-message'
import { ItemModal } from '../../component/item-modal'
import { TableCollection } from '../../component/type-table-collection'
import { loadNFTs } from '../../access/your-collection'
import './your-collection.scss'

export function YourCollection() {
    const dispatch = useAppDispatch()

    const { dataCollection } = useTypedSelector((state) => state.dataCollection)
    const { nfts } = useTypedSelector((state) => state.yourCollectionRedux)
    const { requestLoading, googleStatus, loadingCollection } = useTypedSelector((state: any) => state.stateReducer)

    const [openModalUpdate, setOpenModalUpdate] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams();

    const _id = searchParams.get("yourCollectionId")

    const filData = dataCollection.filter((ele: any) => ele.address === _id)
    const yourCollection = filData[0]

    const callbackUpdateModal = (callbackData: boolean) => {
        setOpenModalUpdate(callbackData)
    }

    useEffect(() => {
        return () => {
            dispatch(loadNFTs(_id))
        }
    }, [_id])

    return (
        <main className='main-class'>
            {
                openModalUpdate === true
                &&
                <CreateModal propsCallback={callbackUpdateModal} />
            }
            {googleStatus === false && <Modal />}
            {requestLoading === true && <RequestModal />}
            <ToastMessage keyMessage={"createItem"} />
            <CompareModal
                propsData={
                    nfts.filter((ele: any) =>
                        ele.tokenId === searchParams.get("item1")
                        ||
                        searchParams.get("item2") === ele.tokenId)
                }
                links={"Item"}
            />
            <ItemModal links="Item"/>
            <div className='class-poster-outer'>
                <div className='class-poster-inner'>
                    <span className='span-poster'>
                        {loadingCollection === true || googleStatus === false
                            ?
                            <LoadingFrame divWidth="100%" divHeight="100%" />
                            :
                            <img className='img-poster' src={yourCollection?.banner} />
                        }
                    </span>
                </div>
            </div>
            <div className='class-avatar'>
                <div className='class-avatar-outer'>
                    <div className='box-avatar'>
                        <div className='avatar-inline'>
                            <button type='button' className='button-avatar'>
                                {loadingCollection === true || googleStatus === false
                                    ?
                                    <LoadingFrame divWidth="100%" divHeight="100%" />
                                    :
                                    <img src={yourCollection?.logo} alt='' />
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='class-info-main'>
                <div className='info-main-left'>
                    <div className='info-left-outer'>
                        <div className='fresnel-container'>
                            {
                                loadingCollection === true || googleStatus === false
                                    ?
                                    <LoadingFrame divWidth="200px" divHeight="30px" borderRadius="4px" />
                                    :
                                    <h1>{yourCollection?.username}</h1>
                            }
                        </div>
                    </div>
                </div>
                <div className='info-main-right'>
                    <div className='fresnel-container'>
                        <div className='list-items-info'>
                            <div className='fresnel-container'>
                                <div className='list-items-info'>
                                    <div className='list-items'>
                                        <button className='item'>
                                            <TbCurrencyEthereum />
                                        </button>
                                        <button className='item'>
                                            <SiWebmoney />
                                        </button>
                                        <button className='item'>
                                            <SiDiscord />
                                        </button>
                                        <button className='item'>
                                            <FiInstagram />
                                        </button>
                                        <button className='item'>
                                            <FiTwitter />
                                        </button>
                                    </div>
                                    <div className='line'></div>
                                </div>
                            </div>
                            <div className='list-items-share'>
                                <div className='class-flex-3'>
                                    <button className='item'>
                                        <AiOutlineStar />
                                    </button>
                                    <button className='item'>
                                        <AiOutlineShareAlt />
                                    </button>
                                    <button className='item'>
                                        <BsThreeDots />
                                    </button>
                                    <button className='item' onClick={() => setOpenModalUpdate(true)}>
                                        <MdCreate />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className='span-flex'>
                {
                    loadingCollection === true || googleStatus === false
                        ?
                        <LoadingFrame divWidth="442px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                        :
                        <>
                            <p>By</p>
                            <span> {_id}</span>
                        </>
                }

                <BsPatchCheckFill style={{ color: "#2081e2" }} />
            </span>
            <div className='flex-items'>
                {
                    loadingCollection === true || googleStatus === false
                        ?
                        <LoadingFrame divWidth="80px" divHeight="30px" borderRadius="4px" />
                        :
                        <span><p>Items</p>{nfts.length}</span>
                }
                {
                    loadingCollection === true || googleStatus === false
                        ?
                        <LoadingFrame divWidth="330px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                        :
                        <span>
                            <p>Created</p>
                            {new Date(yourCollection?.date).toDateString()}
                        </span>
                }
                {
                    loadingCollection === true || googleStatus === false
                        ?
                        <LoadingFrame divWidth="115px" divHeight="30px" borderRadius="4px" />
                        :
                        <span><p>Creation fee</p>5 % </span>
                }
                {
                    loadingCollection === true || googleStatus === false
                        ?
                        <LoadingFrame divWidth="115px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                        :
                        <span><p>Chain</p>{yourCollection?.blockchain}</span>
                }
            </div>
            <div className='flex-items'>
                {
                    loadingCollection === true || googleStatus === false
                        ?
                        <LoadingFrame divWidth="736px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                        :
                        <span style={{ fontWeight: '400' }}>
                            {yourCollection?.description}
                        </span>
                }
            </div>
            <div className='flex-items'>
                <span className='column'>
                    {
                        loadingCollection === true || googleStatus === false
                            ?
                            <LoadingFrame divWidth="80px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                            :
                            " 354,925 ETH"
                    }

                    <p>Volume total</p></span>
                <span className='column'>
                    {
                        loadingCollection === true || googleStatus === false
                            ?
                            <LoadingFrame divWidth="80px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                            :
                            "0.939 ETH"
                    }
                    <p>Floor price</p>
                </span>
                <span className='column'>
                    {
                        loadingCollection === true || googleStatus === false
                            ?
                            <LoadingFrame divWidth="80px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                            :
                            "4%"
                    }
                    <p>Listed</p></span>
                <span className='column'>
                    {
                        loadingCollection === true || googleStatus === false
                            ?
                            <LoadingFrame divWidth="80px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                            :
                            " 0.886 WETH"
                    }
                    <p>Best offer</p></span>
            </div>
            <div className='flex-items'>
                <ul className='collection-nav-ul'>
                    <div className='collection-list-li'>
                        <li className='collection-nav-li'>
                            <a className='collection-nav-a active'>
                                <span>Elements</span>
                            </a>
                        </li>
                        <li className='collection-nav-li'>
                            <a className='collection-nav-a'>
                                <span>Analyses</span>
                            </a>
                        </li>
                        <li className='collection-nav-li'>
                            <a className='collection-nav-a'>
                                <span>Activity</span>
                            </a>
                        </li>
                    </div>
                </ul>
            </div>
            <TableCollection nfts={nfts} links={`/your-collection/${_id}`} linkDetail="Item"/>
        </main>
    )
}
