import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { actionType } from '../../util/store/action'
import { useTypedSelector } from '../../util/hook'
import { useParams, useNavigate, useSearchParams, createSearchParams } from 'react-router-dom'
import { AiFillCaretDown } from 'react-icons/ai'
import { BsPatchCheckFill, BsShare } from 'react-icons/bs'
import { GiSelfLove } from 'react-icons/gi'
import { FaEthereum, FaHome } from 'react-icons/fa'
import { MdCompare } from 'react-icons/md'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { LoadingFrame } from '../../component/loading'
import { Modal } from '../../component/message-modal'
import { ToastMessage } from '../../component/toast-message'
import { RequestModal } from '../../component/request-modal'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import MyNFT from '../../contracts/MyNFT.json'
import Marketplace from '../../contracts/Marketplace.json'
import { CompareModal } from '../../component/compare-modal'
import './item-detail.scss'
import { Activity, ItemDetailDropDown, Offer, Properties } from './dropdown'

export function ItemDetail() {
    const dispatch = useDispatch()
    const { loadingDetail, googleStatus, requestLoading, compare } = useTypedSelector((state) => state.stateReducer)
    const { nfts } = useTypedSelector((state) => state.yourCollectionRedux)

    const [edit, setEdit] = useState(false)
    const [nft, setNfts] = useState<any>({})

    const [searchParams, setSearchParams] = useSearchParams();
    const { _id } = useParams()
    const history = useNavigate()

    async function fetchNFT() {
        dispatch({
            type: actionType.SET_LOADING_DETAIL,
            loadingDetail: true
        })
        const web3Modal = new Web3Modal()
        const provider = await web3Modal.connect()
        const web3 = new Web3(provider)
        const networkId = await web3.eth.net.getId()
        const marketplaceContract = new web3.eth.Contract(Marketplace.abi as any, Marketplace.networks[networkId as unknown as keyof typeof Marketplace.networks].address)
        const listings = await marketplaceContract.methods.getListedNfts().call()
        await Promise.all(listings.filter((ele: any) => ele.tokenId === _id).map(async (i: any) => {
            try {
                const myNFTContract = new web3.eth.Contract(MyNFT.abi as any, MyNFT.networks[networkId as unknown as keyof typeof MyNFT.networks].address)
                const tokenURI = await myNFTContract.methods.tokenURI(_id).call()
                const meta = await axios.get(tokenURI)
                setNfts({
                    nftPrice: i.price,
                    nftName: meta.data.nftName,
                    tokenId: i.tokenId,
                    seller: i.seller,
                    owner: i.owner,
                    nftImage: meta.data.nftImage,
                    nftDescription: meta.data.nftDescription
                })
                dispatch({
                    type: actionType.SET_LOADING_DETAIL,
                    loadingDetail: false
                })

            } catch (error: any) {
                dispatch({
                    type: actionType.SET_AXIOS_MESSAGE,
                    axiosMessage: ({ key: "ecommerce", value: `${error.message} when receiving data about collection`, status: "error" })
                })

                const time = setTimeout(() => {
                    dispatch({
                        type: actionType.SET_AXIOS_MESSAGE,
                        axiosMessage: ({ key: "remove", value: "" })
                    })
                }, 5000)
                return () => clearTimeout(time)
            }
        }))
    }

    async function buyNft(nft: any) {
        dispatch({
            type: actionType.SET_REQUEST_LOADING,
            requestLoading: true
        })
        const web3Modal = new Web3Modal()
        const provider = await web3Modal.connect()
        const web3 = new Web3(provider)
        const networkId = await web3.eth.net.getId()
        const marketplaceContract = new web3.eth.Contract(Marketplace.abi as any, Marketplace.networks[networkId as unknown as keyof typeof Marketplace.networks].address)
        const accounts = await web3.eth.getAccounts()
        try {
            await marketplaceContract.methods.buyNft(MyNFT.networks[networkId as unknown as keyof typeof MyNFT.networks].address, nft.tokenId).send({ from: accounts[0], value: nft.nftPrice })
            dispatch({
                type: actionType.SET_REQUEST_LOADING,
                requestLoading: false
            })
            history("/profile")
        } catch (error: any) {
            dispatch({
                type: actionType.SET_REQUEST_LOADING,
                requestLoading: false
            })
        }
    }

    const compareFunction = () => {
        if (searchParams.get("item1") != null && searchParams.get("item2") != null) {
            const item1: any = searchParams.get("item1")
            const item2: any = searchParams.get("item2")
            history({
                pathname: `/Item/${_id}`,
                search: `${createSearchParams({ item1: item1, item2: item2 }).toString()}`,
            })
        } else {
            history({
                pathname: `/Item/${_id}`,
                search: `${createSearchParams({ item1: nft.tokenId, item2: compare.tokenId }).toString()}`,
            })
        }
    }

    useEffect(() => {
        fetchNFT()
        return () => {
            window.scrollTo(0, 0)
        }
    }, [_id])

    return (
        <div className='class-collection-detail' id='collection-detail'>
            {googleStatus === false && <Modal />}
            {requestLoading === true && <RequestModal />}
            <CompareModal propsData={nfts.filter((ele: any) =>
                ele.tokenId === searchParams.get("item1")
                ||
                searchParams.get("item2") === ele.tokenId)
            }
                links={"Item"}
            />
            <ToastMessage keyMessage={"detail"} />
            <div className='content-page'>
                <div className='collection-detail-left'>
                    {
                        loadingDetail === true
                            ?
                            <LoadingFrame divWidth={"100%"} divHeight={"480px"} />
                            :
                            <img src={nft.nftImage} />
                    }
                    {
                        loadingDetail === true
                            ?
                            <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                            :
                            (
                                <Properties />
                            )
                    }

                    {/*  */}
                    {
                        loadingDetail === true
                            ?
                            <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                            :
                            (
                                <ItemDetailDropDown />
                            )}

                </div>
                <div className='collection-detail-right'>
                    <div className='chakra-stack'>
                        <AiFillCaretDown className='svg-down-edit' style={{ display: edit ? 'block' : 'none' }} />
                        {/* <div className='box-edit' style={{ display: edit ? 'flex' : 'none' }}>
                             <Link to={`/edit/${_id}`}><button><RiEditBoxLine /> <span>Edit</span></button></Link> 
                             <button onClick={deleteRequest}><AiOutlineDelete /> <span>Delete</span></button> 
                        </div> */}
                        <div className='chakra-stack-header'>
                            <div className='chakra-stack-header-left'>
                                <span className='header-left-span'>
                                    <p>Certified</p>
                                    <p className='check'><BsPatchCheckFill /></p>
                                </span>
                                <div className='floor-type'>
                                    {
                                        loadingDetail === true
                                            ?
                                            <LoadingFrame divWidth={"100px"} divHeight={"24px"} />
                                            :
                                            <>
                                                <p>Volumn</p>
                                                <p style={{ overflow: "hidden" }}>
                                                    {nft.nftPrice / 1000000000000000000}</p>
                                            </>
                                    }
                                </div>
                            </div>
                            <div className='chakra-stack-header-right'>
                                <span><GiSelfLove /></span>
                                <span><BsShare /></span>
                                {
                                    compare != null
                                        ?
                                        <span onClick={compareFunction}><MdCompare /></span>
                                        :
                                        <span style={{ opacity: 0.2, cursor: 'default' }}><MdCompare /></span>
                                }
                                <span onClick={() => history("/ecommerce")}><FaHome /></span>
                                <span onClick={() => setEdit(!edit)}><BiDotsVerticalRounded /></span>
                            </div>
                        </div>
                        <div className='class-info-chakra-stack'>
                            {loadingDetail === true
                                ?
                                <LoadingFrame divWidth={"100%"} divHeight={"24px"} />
                                :
                                <h3>{nft.nftName} #{nft.tokenId}</h3>
                            }

                        </div>
                        <div className='class-info-chakra-stack'>
                            <div className='class-info-owner'>
                                {
                                    loadingDetail === true
                                        ?
                                        <LoadingFrame divWidth={"40px"} divHeight={"40px"} />
                                        :
                                        <img src={nft.nftImage} alt='' />
                                }

                                {loadingDetail === true
                                    ?
                                    <LoadingFrame divWidth={"240px"} divHeight={"40px"} />
                                    :
                                    <div className='owner-name'>
                                        <span>Owner</span>
                                        <p>{nft.owner}</p>
                                    </div>}
                            </div>
                        </div>
                        {
                            loadingDetail === true
                                ?
                                <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                                :
                                (
                                    <div className='class-info-chakra-stack'>
                                        <div className='class-offer'>
                                            <div className='class-offer-content'>
                                                <div className='offer-info'>
                                                    <span>Price</span>
                                                    <FaEthereum />
                                                    <p>{nft.nftPrice / 1000000000000000000}</p>
                                                </div>
                                            </div>
                                            <div className='class-offer-content'>
                                                <div className='offer-info'>
                                                    <button onClick={() => buyNft(nft)}>Buy now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                        }

                        {
                            loadingDetail === true
                                ?
                                <LoadingFrame divWidth={"100%"} divHeight={"60px"} spacing={"32px 0"} />
                                :
                                (
                                    <Offer />
                                )
                        }

                        {
                            loadingDetail === true
                                ?
                                <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                                :
                                (
                                    <Activity />
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
