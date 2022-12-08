import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useTypedSelector } from '../../util/hook'
import { actionType } from '../../util/store/action'
import { useDispatch } from 'react-redux'
import { BsImage } from 'react-icons/bs'
import { AiOutlineClear } from 'react-icons/ai'
import { Modal } from '../../component/message-modal'
import { RequestModal } from '../../component/request-modal'
import { ToastMessage } from '../../component/toast-message'
import { ApiResponeCollection } from '../../util/api-response'
import { useNavigate } from 'react-router-dom'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import './collection.scss'

export function Collection() {
    const dispatch = useDispatch()
    const { googleStatus, requestLoading } = useTypedSelector((state) => state.stateReducer)

    const inputRefLogo = useRef<any>(null);
    const inputRefFeatured = useRef<any>(null);
    const inputRefBanner = useRef<any>(null);

    const history = useNavigate()


    const [formInput, setFormInput] = useState<any>({
        logo: null,
        featured: null,
        banner: null,
        username: null,
        blockchain: "Ethereum",
        description: null
    })

    const onSubmit = async (e: any) => {
        const web3Modal = new Web3Modal()
        const provider = await web3Modal.connect()
        const web3 = new Web3(provider)
        const accounts = await web3.eth.getAccounts()
        e.preventDefault()
        dispatch({
            type: actionType.SET_REQUEST_LOADING,
            requestLoading: true
        })
        const createData = new FormData()
        createData.append("logo", formInput?.logo)
        createData.append("featuredImage", formInput?.featured)
        createData.append("banner", formInput?.banner)
        createData.append("address", accounts[0])
        createData.append("username", formInput.username)
        createData.append("blockchain", formInput.blockchain)
        createData.append("description", formInput.description)

        await axios.post(ApiResponeCollection, createData).then((res: any) => console.log(res.data))

        dispatch({
            type: actionType.SET_REQUEST_LOADING,
            requestLoading: false
        })
        history('/')
    }

    return (
        <div className='create-main'>
            {googleStatus === false && <Modal />}
            {requestLoading === true && <RequestModal />}
            <ToastMessage keyMessage={"createItem"} />
            <div className='create-collection'>
                <header className='header-collection'>
                    <h1>Create a collection</h1>
                </header>
                <form className='form-collection'>
                    <span>
                        <span>*</span>
                        Mandatory fields
                    </span>
                    <div className='class-form-items'>
                        <div className='class-form-items inner'>
                            <div className='class-form-items inner head'>
                                <label>
                                    Logo
                                    <span>*</span>
                                </label>
                                <span>
                                    This image will also be used for navigation. Recommended dimensions: 350 x 350.
                                </span>
                            </div>
                            <div className='class-logo'>
                                {
                                    formInput.logo != null
                                        ?
                                        <>
                                            <button className='clear-button-collection' onClick={() => setFormInput(
                                                { ...formInput, logo: inputRefLogo.current!.value = null }
                                            )}>
                                                <AiOutlineClear />
                                            </button>
                                            <img
                                                ref={inputRefLogo}
                                                src={URL.createObjectURL(formInput?.logo)}
                                                alt=''
                                            />
                                        </>
                                        :
                                        <>
                                            <label htmlFor="avatar-collection">
                                                <BsImage />
                                            </label>
                                            <input id="avatar-collection" type="file" onChange={(e: any) => setFormInput(
                                                { ...formInput, logo: e.target.files[0] }
                                            )} />
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='class-form-items'>
                        <div className='class-form-items inner'>
                            <div className='class-form-items inner head'>
                                <label>
                                    featured image
                                    <span>*</span>
                                </label>
                                <span>
                                    This image will be used to showcase your collection on the home page,
                                    category pages or other promotional areas on OpenSea. Recommended dimensions: 600 x 400.
                                </span>
                            </div>
                            <div className='class-logo featured'>
                                {
                                    formInput.featured != null
                                        ?
                                        <>
                                            <button className='clear-button-collection' onClick={() => setFormInput(
                                                { ...formInput, featured: inputRefFeatured.current!.value = null }
                                            )}>
                                                <AiOutlineClear />
                                            </button>
                                            <img
                                                ref={inputRefFeatured}
                                                src={URL.createObjectURL(formInput?.featured)}
                                                alt=''
                                            />
                                        </>
                                        :
                                        <>
                                            <label htmlFor="avatar-collection-featured">
                                                <BsImage />
                                            </label>
                                            <input id="avatar-collection-featured" type="file" onChange={(e: any) => setFormInput(
                                                { ...formInput, featured: e.target.files[0] }
                                            )} />
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='class-form-items'>
                        <div className='class-form-items inner'>
                            <div className='class-form-items inner head'>
                                <label>
                                    Banner
                                    <span>*</span>
                                </label>
                                <span>
                                    This image will appear at the top of your collection page.
                                    Avoid including too much text, as the dimensions vary between devices. Recommended dimensions: 1400 x 350.
                                </span>
                            </div>
                            <div className='class-logo banner'>
                                {
                                    formInput.banner != null
                                        ?
                                        <>
                                            <button className='clear-button-collection' onClick={() => setFormInput(
                                                { ...formInput, banner: inputRefBanner.current!.value = null }
                                            )}>
                                                <AiOutlineClear />
                                            </button>
                                            <img
                                                ref={inputRefBanner}
                                                src={URL.createObjectURL(formInput?.banner)}
                                                alt=''
                                            />
                                        </>
                                        :
                                        <>
                                            <label htmlFor="avatar-collection-banner">
                                                <BsImage />
                                            </label>
                                            <input id="avatar-collection-banner" type="file" onChange={(e: any) => setFormInput(
                                                { ...formInput, banner: e.target.files[0] }
                                            )} />
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='class-form-items'>
                        <div className='class-form-items inner'>
                            <div className='class-form-items inner head'>
                                <label>
                                    Last name
                                    <span>*</span>
                                </label>
                            </div>
                            <div className='class-input'>
                                <div className='input-main'>
                                    <div className='input-prefix'></div>
                                    <input required placeholder='Example: Nguyen...' type="text" onChange={(e: any) => setFormInput(
                                        { ...formInput, username: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='class-form-items'>
                        <div className='class-form-items inner'>
                            <div className='class-form-items inner head'>
                                <label>
                                    Description
                                </label>
                                <span>Markdown syntax is supported. 0 character(s) used out of 1000.</span>
                            </div>
                            <div className='class-input'>
                                <div className='input-main'>
                                    <textarea id='description' onChange={(e: any) => setFormInput(
                                        { ...formInput, description: e.target.value })
                                    }></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type='button' onClick={onSubmit}>
                        Create
                    </button>
                </form>

            </div>
        </div>
    )
}
