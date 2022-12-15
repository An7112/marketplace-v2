import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { actionType } from '../../util/store/action'
import { useTypedSelector } from '../../util/hook'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { AiOutlineUnorderedList, AiFillCaretDown } from 'react-icons/ai'
import { GrFormDown, GrFormUp } from 'react-icons/gr'
import { BsExclamationSquare, BsPatchCheckFill, BsShare } from 'react-icons/bs'
import { GiSelfLove } from 'react-icons/gi'
import { FaEthereum, FaOpencart, FaHome } from 'react-icons/fa'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { GoLinkExternal } from 'react-icons/go'
import { RiEditBoxLine } from 'react-icons/ri'
import { FiActivity } from 'react-icons/fi'
import { BiTransferAlt } from 'react-icons/bi'
import { TiArrowLeftOutline } from 'react-icons/ti'
import { LoadingFrame } from '../../component/loading'
import { Modal } from '../../component/message-modal'
import { ToastMessage } from '../../component/toast-message'
import { RequestModal } from '../../component/request-modal'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import MyNFT from '../../contracts/MyNFT.json'
import Marketplace from '../../contracts/Marketplace.json'
import '../item-detail/item-detail.scss'

export function Resell() {
    const dispatch = useDispatch()
    const { loadingDetail, googleStatus, requestLoading } = useTypedSelector((state) => state.stateReducer)

    const [showDescribe, setShowDescribe] = useState(true)
    const [tokenDetail, setTokenDetail] = useState(false)
    const [offer, setShowOffer] = useState(false)
    const [edit, setEdit] = useState(false)
    const [activity, setActivity] = useState(true)
    const [formInput, setFormInput] = useState<any>()
    const [nfts, setNfts] = useState<any>({})

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
        const accounts = await web3.eth.getAccounts()
        const marketplaceContract = new web3.eth.Contract(Marketplace.abi as any, Marketplace.networks[networkId as unknown as keyof typeof Marketplace.networks].address)
        const listings = await marketplaceContract.methods.getMyNfts().call({ from: accounts[0] })

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
                setFormInput({ nftPrice: Web3.utils.fromWei(i.price) })
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

    function showDown() {
        setShowDescribe(!showDescribe)
    }
    function showDownToken() {
        setTokenDetail(!tokenDetail)
    }
    function showOffer() {
        setShowOffer(!offer)
    }
    function showActivity() {
        setActivity(!activity)
    }

    async function listNFTForSale() {
        dispatch({
            type: actionType.SET_REQUEST_LOADING,
            requestLoading: true
        })
        if (!nfts.nftPrice) {
            return
        } else {
            const web3Modal = new Web3Modal()
            const provider = await web3Modal.connect()
            const web3 = new Web3(provider)
            const networkId = await web3.eth.net.getId()
            const marketPlaceContract = new web3.eth.Contract
                (
                    Marketplace.abi as any,
                    Marketplace.networks
                    [
                        networkId as unknown as keyof typeof Marketplace.networks
                    ].address
                )
            let listingFee = await marketPlaceContract.methods.getListingFee().call()
            listingFee = listingFee.toString()
            const accounts = await web3.eth.getAccounts()
            try {
                marketPlaceContract.methods.resellNft
                    (
                        MyNFT.networks
                        [
                            networkId as unknown as keyof typeof MyNFT.networks
                        ].address,
                        _id,
                        Web3.utils.toWei(formInput.nftPrice, "ether")
                    )
                    .send({ from: accounts[0], value: listingFee }).on('receipt', function () {
                        console.log('listed')
                        dispatch({
                            type: actionType.SET_REQUEST_LOADING,
                            requestLoading: false
                        })
                        // history(`/your-collection/${accounts[0]}`)
                    }
                    );
            } catch (error: any) {
                dispatch({
                    type: actionType.SET_REQUEST_LOADING,
                    requestLoading: false
                })
            }
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
            <ToastMessage keyMessage={"detail"} />
            <div className='content-page'>
                <div className='collection-detail-left'>
                    {
                        loadingDetail === true
                            ?
                            <LoadingFrame divWidth={"100%"} divHeight={"480px"} />
                            :
                            <img src={nfts.nftImage} />
                    }
                    {
                        loadingDetail === true
                            ?
                            <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                            :
                            (
                                <div className='class-showdown'>
                                    <div className='class-properties'>
                                        <div className='class-name-properties'>
                                            <AiOutlineUnorderedList className='properties icon' />
                                            <span className='properties'>Properties</span>
                                        </div>
                                        <div className='showdown'>
                                            {
                                                showDescribe
                                                    ?
                                                    <GrFormDown className='showdown-icon' onClick={showDown} />
                                                    :
                                                    <GrFormUp className='showdown-icon' onClick={showDown} />
                                            }
                                        </div>
                                    </div>
                                    {
                                        showDescribe && <div className='class-down-detail'>
                                            <div className='class-down-grid'>
                                                <div className='down-detail-item'>
                                                    <span className='title-item'>Category</span>
                                                    <span>Shadow</span>
                                                    <div className='detail-item-bottom'>
                                                        <div className='detail-item-bottom-percent'>
                                                            <p>9,007</p>
                                                        </div>
                                                        <div className='detail-item-bottom-price'>
                                                            <p>1.33323213</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='down-detail-item'>
                                                    <span className='title-item'>Category</span>
                                                    <span>Shadow</span>
                                                    <div className='detail-item-bottom'>
                                                        <div className='detail-item-bottom-percent'>
                                                            <p>9,007</p>
                                                        </div>
                                                        <div className='detail-item-bottom-price'>
                                                            <p>1.33323213</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='down-detail-item'>
                                                    <span className='title-item'>Category</span>
                                                    <span>Shadow</span>
                                                    <div className='detail-item-bottom'>
                                                        <div className='detail-item-bottom-percent'>
                                                            <p>9,007</p>
                                                        </div>
                                                        <div className='detail-item-bottom-price'>
                                                            <p>1.33323213</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='down-detail-item'>
                                                    <span className='title-item'>Category</span>
                                                    <span>Shadow</span>
                                                    <div className='detail-item-bottom'>
                                                        <div className='detail-item-bottom-percent'>
                                                            <p>9,007</p>
                                                        </div>
                                                        <div className='detail-item-bottom-price'>
                                                            <p>1.33323213</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='down-detail-item'>
                                                    <span className='title-item'>Category</span>
                                                    <span>Shadow</span>
                                                    <div className='detail-item-bottom'>
                                                        <div className='detail-item-bottom-percent'>
                                                            <p>9,007</p>
                                                        </div>
                                                        <div className='detail-item-bottom-price'>
                                                            <p>1.33323213</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )}

                    {/*  */}
                    {
                        loadingDetail === true
                            ?
                            <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                            :
                            (
                                <div className='class-showdown'>
                                    <div className='class-properties'>
                                        <div className='class-name-properties'>
                                            <BsExclamationSquare className='properties icon' />
                                            <span className='properties'>Item Detail</span>
                                        </div>
                                        <div className='showdown'>
                                            {
                                                tokenDetail
                                                    ?
                                                    <GrFormDown className='showdown-icon' onClick={showDownToken} />
                                                    :
                                                    <GrFormUp className='showdown-icon' onClick={showDownToken} />
                                            }
                                        </div>
                                    </div>
                                    {
                                        tokenDetail && <div className='class-down-detail'>
                                            <div className='class-down-grid'>
                                                <div className='down-detail-item'>
                                                    <span className='title-item'>Category</span>
                                                    <span>Shadow</span>
                                                    <div className='detail-item-bottom'>
                                                        <div className='detail-item-bottom-percent'>
                                                            <p>9,007</p>
                                                        </div>
                                                        <div className='detail-item-bottom-price'>
                                                            <p>1.33323213</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='down-detail-item'>
                                                    <span className='title-item'>Category</span>
                                                    <span>Shadow</span>
                                                    <div className='detail-item-bottom'>
                                                        <div className='detail-item-bottom-percent'>
                                                            <p>9,007</p>
                                                        </div>
                                                        <div className='detail-item-bottom-price'>
                                                            <p>1.33323213</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='down-detail-item'>
                                                    <span className='title-item'>Category</span>
                                                    <span>Shadow</span>
                                                    <div className='detail-item-bottom'>
                                                        <div className='detail-item-bottom-percent'>
                                                            <p>9,007</p>
                                                        </div>
                                                        <div className='detail-item-bottom-price'>
                                                            <p>1.33323213</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='down-detail-item'>
                                                    <span className='title-item'>Category</span>
                                                    <span>Shadow</span>
                                                    <div className='detail-item-bottom'>
                                                        <div className='detail-item-bottom-percent'>
                                                            <p>9,007</p>
                                                        </div>
                                                        <div className='detail-item-bottom-price'>
                                                            <p>1.33323213</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='down-detail-item'>
                                                    <span className='title-item'>Category</span>
                                                    <span>Shadow</span>
                                                    <div className='detail-item-bottom'>
                                                        <div className='detail-item-bottom-percent'>
                                                            <p>9,007</p>
                                                        </div>
                                                        <div className='detail-item-bottom-price'>
                                                            <p>1.33323213</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )}
                </div>
                <div className='collection-detail-right'>
                    <div className='chakra-stack'>
                        <AiFillCaretDown className='svg-down-edit' style={{ display: edit ? 'block' : 'none' }} />
                        <div className='box-edit' style={{ display: edit ? 'flex' : 'none' }}>
                            <Link to={`/edit/${_id}`}><button><RiEditBoxLine /> <span>Edit</span></button></Link>
                            {/* <button onClick={deleteRequest}><AiOutlineDelete /> <span>Delete</span></button> */}
                        </div>
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
                                                    {nfts.nftPrice / 1e18}</p>
                                            </>
                                    }
                                </div>
                            </div>
                            <div className='chakra-stack-header-right'>
                                <span><GiSelfLove /></span>
                                <span><BsShare /></span>
                                <span onClick={() => history("/ecommerce")}><FaHome /></span>
                                {/* <span onClick={() => setEdit(!edit)}><BiDotsVerticalRounded /></span> */}
                            </div>
                        </div>
                        <div className='class-info-chakra-stack'>
                            {loadingDetail === true ? <LoadingFrame divWidth={"100%"} divHeight={"24px"} /> : <h3>{nfts.nftName} #{nfts.tokenId}</h3>}

                        </div>
                        <div className='class-info-chakra-stack'>
                            <div className='class-info-owner'>
                                {loadingDetail === true
                                    ?
                                    <LoadingFrame divWidth={"40px"} divHeight={"40px"} />
                                    :
                                    <img src={nfts.nftImage} alt='' />}
                                {loadingDetail === true
                                    ?
                                    <LoadingFrame divWidth={"240px"} divHeight={"40px"} />
                                    :
                                    <div className='owner-name'>
                                        <span>Owner</span>
                                        <p>{nfts.owner}</p>
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
                                                    <div className='input-resell-outer'>
                                                        <input value={formInput?.nftPrice} onChange={(e: any) => setFormInput({ nftPrice: e.target.value })} type="number" />
                                                    </div>
                                                    <TiArrowLeftOutline className='svg-resell' />
                                                </div>
                                            </div>
                                            <div className='class-offer-content'>
                                                <div className='offer-info'>
                                                    {/* <button>Buy now</button> */}
                                                    <button onClick={listNFTForSale}>List NFT For Sale</button>
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
                                    <div className='class-info-chakra-stack'>
                                        <div className='class-showdown'>
                                            <div className='class-properties offer'>
                                                <div className='class-name-properties'>
                                                    <MdOutlineLocalOffer className='properties icon' />
                                                    <span className='properties'>Offer</span>
                                                </div>
                                                <div className='showdown'>
                                                    {
                                                        offer
                                                            ?
                                                            <GrFormDown className='showdown-icon' onClick={showOffer} />
                                                            :
                                                            <GrFormUp className='showdown-icon' onClick={showOffer} />
                                                    }
                                                </div>
                                            </div>
                                            {
                                                offer && <div className='class-down-offer'>
                                                    <div className='chakra-accordion-panel'>
                                                        <div className='chakra-stack'>
                                                            <div className='chakra-stack-list'>
                                                                <div className='chakra-stack-grid'>
                                                                    <div className='chakra-wrap'>
                                                                        <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                                                        <span>2%</span>
                                                                        <span>Below floor</span>
                                                                    </div>
                                                                    <div className='chakra-wrap'>
                                                                        <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                                                        <p>An</p>
                                                                        <span>Expiry: in 30 days</span>
                                                                    </div>
                                                                    <hr></hr>
                                                                </div>
                                                                <div className='chakra-stack-grid'>
                                                                    <div className='chakra-wrap'>
                                                                        <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                                                        <span>2%</span>
                                                                        <span>Below floor</span>
                                                                    </div>
                                                                    <div className='chakra-wrap'>
                                                                        <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                                                        <p>An</p>
                                                                        <span>Expiry: in 30 days</span>
                                                                    </div>
                                                                    <hr></hr>
                                                                </div>
                                                                <div className='chakra-stack-grid'>
                                                                    <div className='chakra-wrap'>
                                                                        <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                                                        <span>2%</span>
                                                                        <span>Below floor</span>
                                                                    </div>
                                                                    <div className='chakra-wrap'>
                                                                        <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                                                        <p>An</p>
                                                                        <span>Expiry: in 30 days</span>
                                                                    </div>
                                                                    <hr></hr>
                                                                </div>
                                                                <div className='chakra-stack-grid'>
                                                                    <div className='chakra-wrap'>
                                                                        <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                                                        <span>2%</span>
                                                                        <span>Below floor</span>
                                                                    </div>
                                                                    <div className='chakra-wrap'>
                                                                        <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                                                        <p>An</p>
                                                                        <span>Expiry: in 30 days</span>
                                                                    </div>
                                                                    <hr></hr>
                                                                </div>
                                                                <div className='chakra-stack-grid'>
                                                                    <div className='chakra-wrap'>
                                                                        <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                                                        <span>2%</span>
                                                                        <span>Below floor</span>
                                                                    </div>
                                                                    <div className='chakra-wrap'>
                                                                        <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                                                        <p>An</p>
                                                                        <span>Expiry: in 30 days</span>
                                                                    </div>
                                                                    <hr></hr>
                                                                </div>
                                                                <div className='chakra-stack-grid'>
                                                                    <div className='chakra-wrap'>
                                                                        <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                                                        <span>2%</span>
                                                                        <span>Below floor</span>
                                                                    </div>
                                                                    <div className='chakra-wrap'>
                                                                        <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                                                        <p>An</p>
                                                                        <span>Expiry: in 30 days</span>
                                                                    </div>
                                                                    <hr></hr>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )}

                        {
                            loadingDetail === true
                                ?
                                <LoadingFrame divWidth={"100%"} divHeight={"60px"} /> : (
                                    <div className='class-info-chakra-stack'>
                                        <div className='class-showdown'>
                                            <div className='class-properties offer'>
                                                <div className='class-name-properties'>
                                                    <FiActivity className='properties icon' />
                                                    <span className='properties'>Activity</span>
                                                </div>
                                                <div className='showdown'>
                                                    {
                                                        activity
                                                            ?
                                                            <GrFormDown className='showdown-icon' onClick={showActivity} /> : <GrFormUp className='showdown-icon' onClick={showActivity} />}
                                                </div>
                                            </div>
                                            {
                                                activity && <div className='class-down-offer'>
                                                    <div className='chakra-accordion-panel'>
                                                        <div className='chakra-stack'>
                                                            <div className='chakra-stack-list'>
                                                                <div className='chakra-stack-grid-activity'>
                                                                    <div className='chakra-wrap-left'>
                                                                        <div className='chakra-wrap-left-content'>
                                                                            <button className='wrap-left-content-button'>
                                                                                <BiTransferAlt />
                                                                                <p>Transfer</p>
                                                                            </button>
                                                                        </div>
                                                                        <div className='chakra-wrap-left-content info'>
                                                                            <span>From</span>
                                                                            <p>71a12b</p>
                                                                            <span>To</span>
                                                                            <p>27a11b</p>
                                                                            <span>22 hours ago</span>
                                                                        </div>
                                                                    </div>
                                                                    <button className='chakra-wrap-right'>
                                                                        <GoLinkExternal />
                                                                    </button>
                                                                </div>
                                                                <hr style={{ width: '96%' }}></hr>
                                                                <div className='chakra-stack-grid-activity'>
                                                                    <div className='chakra-wrap-left'>
                                                                        <div className='chakra-wrap-left-content'>
                                                                            <button className='wrap-left-content-button sale'>
                                                                                <FaOpencart />
                                                                                <p>Sale</p>
                                                                            </button>
                                                                        </div>
                                                                        <div className='chakra-wrap-left-content info'>
                                                                            <span>From</span>
                                                                            <p>71a12b</p>
                                                                            <span>To</span>
                                                                            <p>27a11b</p>
                                                                            <span>22 hours ago</span>
                                                                        </div>
                                                                    </div>
                                                                    <button className='chakra-wrap-right'>
                                                                        <GoLinkExternal />
                                                                    </button>
                                                                </div>
                                                                <hr style={{ width: '96%' }}></hr>
                                                                <div className='chakra-stack-grid-activity'>
                                                                    <div className='chakra-wrap-left'>
                                                                        <div className='chakra-wrap-left-content'>
                                                                            <button className='wrap-left-content-button'>
                                                                                <BiTransferAlt />
                                                                                <p>Transfer</p>
                                                                            </button>
                                                                        </div>
                                                                        <div className='chakra-wrap-left-content info'>
                                                                            <span>From</span>
                                                                            <p>71a12b</p>
                                                                            <span>To</span>
                                                                            <p>27a11b</p>
                                                                            <span>22 hours ago</span>
                                                                        </div>
                                                                    </div>
                                                                    <button className='chakra-wrap-right'>
                                                                        <GoLinkExternal />
                                                                    </button>
                                                                </div>
                                                                <hr style={{ width: '96%' }}></hr>
                                                                <div className='chakra-stack-grid-activity'>
                                                                    <div className='chakra-wrap-left'>
                                                                        <div className='chakra-wrap-left-content'>
                                                                            <button className='wrap-left-content-button sale'>
                                                                                <FaOpencart />
                                                                                <p>Sale</p>
                                                                            </button>
                                                                        </div>
                                                                        <div className='chakra-wrap-left-content info'>
                                                                            <span>From</span>
                                                                            <p>71a12b</p>
                                                                            <span>To</span>
                                                                            <p>27a11b</p>
                                                                            <span>22 hours ago</span>
                                                                        </div>
                                                                    </div>
                                                                    <button className='chakra-wrap-right'>
                                                                        <GoLinkExternal />
                                                                    </button>
                                                                </div>
                                                                <hr style={{ width: '96%' }}></hr>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )}
                    </div>
                </div>
            </div>
        </div>
    )
}
