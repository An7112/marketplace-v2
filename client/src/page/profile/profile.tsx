
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { useTypedSelector } from '../../util/hook'
import { TbCurrencyEthereum } from 'react-icons/tb'
import { SiWebmoney, SiDiscord } from 'react-icons/si'
import { FiInstagram, FiTwitter } from 'react-icons/fi'
import { AiOutlineStar, AiOutlineShareAlt, AiFillQuestionCircle, AiOutlineUnorderedList } from 'react-icons/ai'
import { BsPatchCheckFill } from 'react-icons/bs'
import { MdCreate} from 'react-icons/md'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import MyNFT from '../../contracts/MyNFT.json'
import Marketplace from '../../contracts/Marketplace.json'
import { CompareModal } from '../../component/compare-modal'
import { EditModal } from '../../component/edit-modal'
import { Modal } from '../../component/message-modal'
import { RequestModal } from '../../component/request-modal'
import { LoadingFrame } from '../../component/loading'
import { TableCollection } from '../../component/type-table-collection'
import { ItemModal } from '../../component/item-modal'
import '../your-collection/your-collection.scss'
import './profile.scss'

export function Profile() {

    const { dataCollection } = useTypedSelector((state) => state.dataCollection)
    const { accountInfo, googleStatus, requestLoading } = useTypedSelector((state: any) => state.stateReducer)

    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [nfts, setNfts] = useState<any>([])
    const [reload, setReload] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();

    const filData = dataCollection.filter((ele: any) => ele.address === accountInfo)
    const profile = filData[0]

    async function loadNFTs() {
        setReload(true)
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
        const myNftContractAddress = MyNFT.networks
        [
            networkId as unknown as keyof typeof MyNFT.networks
        ].address
        const myNftContract = new web3.eth.Contract
            (
                MyNFT.abi as any, myNftContractAddress
            )
        const accounts = await web3.eth.getAccounts()
        const data = await marketPlaceContract.methods.getMyNfts().call({ from: accounts[0] })
        const nfts = await Promise.all(data.map(async (i: any) => {
            try {
                const tokenURI = await myNftContract.methods.tokenURI(i.tokenId).call()
                const meta = await axios.get(tokenURI)

                let nft = {
                    nftPrice: i.price,
                    tokenId: i.tokenId,
                    seller: i.seller,
                    owner: i.owner,
                    nftName: meta.data.nftName,
                    nftImage: meta.data.nftImage,
                    nftDescription: meta.data.nftDescription,
                    tokenURI: tokenURI,
                    qty: 1,
                    cart: false,
                    cp: false
                }
                return nft
            } catch (err) {
                console.log(err)
                return null
            }
        }))
        setNfts(nfts.filter(nft => nft !== null))
        setReload(false)
    }

    const callbackUpdateModal = (callbackData: boolean) => {
        setOpenModalUpdate(callbackData)
    }

    useEffect(() => {
        loadNFTs()
    }, [accountInfo])

    return (
        <main className='main-class'>
            {googleStatus === false && <Modal />}
            {requestLoading === true && <RequestModal />}
            {
                openModalUpdate === true
                &&
                <EditModal propsCallback={callbackUpdateModal} />
            }
            <CompareModal
                propsData={
                    nfts.filter((ele: any) =>
                    ele.tokenId === searchParams.get("item1")
                    ||
                    searchParams.get("item2") === ele.tokenId)
                }
                links="resell-nft"
            />
            <ItemModal links="resell-nft"/>
         <div className='class-poster-outer'>
                <div className='class-poster-inner'>
                    <span className='span-poster'>
                        {reload === true
                            ?
                            <LoadingFrame divWidth="100%" divHeight="100%" />
                            :
                            <img className='img-poster' src={profile?.banner} />
                        }
                    </span>
                </div>
            </div>
            <div className='class-avatar'>
                <div className='class-avatar-outer'>
                    <div className='box-avatar'>
                        <div className='avatar-inline'>
                            <button type='button' className='button-avatar'>
                                {reload === true
                                    ?
                                    <LoadingFrame divWidth="100%" divHeight="100%" />
                                    :
                                    <img src={profile?.logo} alt='' />
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
                                reload === true
                                    ?
                                    <LoadingFrame divWidth="200px" divHeight="30px" borderRadius="4px" />
                                    :
                                    <h1>{profile?.username}</h1>
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
                    reload === true
                        ?
                        <LoadingFrame divWidth="442px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                        :
                        <>
                            <p>By</p>
                            {accountInfo}
                        </>
                }

                <BsPatchCheckFill style={{ color: "#2081e2" }} />
            </span>
            <div className='flex-items'>
                {
                    reload === true
                        ?
                        <LoadingFrame divWidth="80px" divHeight="30px" borderRadius="4px" />
                        :
                        <span><p>Items</p>{nfts.length}</span>
                }
                {
                    reload === true
                        ?
                        <LoadingFrame divWidth="330px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                        :
                        <span><p>Created</p>{profile?.date}</span>
                }
                {
                    reload === true
                        ?
                        <LoadingFrame divWidth="115px" divHeight="30px" borderRadius="4px" />
                        :
                        <span><p>Creation fee</p>5 % </span>
                }
                {
                    reload === true
                        ?
                        <LoadingFrame divWidth="115px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                        :
                        <span><p>Chain</p>{profile?.blockchain}</span>
                }
            </div>
            <div className='flex-items'>
                {
                    reload === true
                        ?
                        <LoadingFrame divWidth="736px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                        :
                        <span style={{ fontWeight: '400' }}>
                            {profile?.description}
                        </span>
                }

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
            <TableCollection nfts={nfts} links="/Profile" linkDetail="resell-nft"/>
        </main>
    )
}

