import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { actionType } from '../../util/store/action';
import { BsImage } from 'react-icons/bs'
import { AiOutlineClear, AiOutlineClose } from 'react-icons/ai'
import { ApiResponeCollection } from '../../util/api-response';
import { useTypedSelector } from '../../util/hook';
import './edit-modal.scss'

export function EditModal({ propsCallback }: any) {
    const dispatch = useDispatch()
    const { accountInfo } = useTypedSelector((state) => state.stateReducer)

    const inputRefLogo = useRef<any>(null);
    const inputRefFeatured = useRef<any>(null);
    const inputRefBanner = useRef<any>(null);
    const [id, setId] = useState("")

    const [fileDisplay, setFileDisplay] = useState<any>({
        logo: null,
        featured: null,
        banner: null,
    })

    const [formInput, setFormInput] = useState<any>({
        logo: null,
        featured: null,
        banner: null,
        address: accountInfo,
        username: null,
        blockchain: "Ethereum",
        description: null
    })

    function onChangeLogo(e: any) {
        const file = e.target.files[0]
        setFileDisplay({
            ...fileDisplay,
            logo: URL.createObjectURL(file)
        })
        setFormInput({
            ...formInput,
            logo: file
        })
    }

    function onChangeFeatured(e: any) {
        const file = e.target.files[0]
        setFileDisplay({
            ...fileDisplay,
            featured: URL.createObjectURL(file)
        })
        setFormInput({
            ...formInput,
            featured: file
        })
    }

    function onChangeBanner(e: any) {
        const file = e.target.files[0]
        setFileDisplay({
            ...fileDisplay,
            banner: URL.createObjectURL(file)
        })
        setFormInput({
            ...formInput,
            banner: file
        })
    }

    async function loadData() {
        const res = await axios.get(ApiResponeCollection)
        const filterData = await res.data.filter((ele: any) => ele.address === accountInfo)
        setFormInput({
            logo: filterData[0].logo,
            featured: filterData[0].featuredImage,
            banner: filterData[0].banner,
            address: filterData[0].address,
            username: filterData[0].username,
            blockchain: filterData[0].blockchain,
            description: filterData[0].description,
        })
        setFileDisplay({
            logo: filterData[0].logo,
            featured: filterData[0].featuredImage,
            banner: filterData[0].banner,
        })
        setId(filterData[0]._id)
    }

    const onSubmit = async (e: any) => {
        dispatch({
            type: actionType.SET_REQUEST_LOADING,
            requestLoading: true
        })
        e.preventDefault()
        const updateData = new FormData()
        updateData.append("logo", formInput?.logo)
        updateData.append("featuredImage", formInput?.featured)
        updateData.append("banner", formInput?.banner)
        updateData.append("address", formInput.address)
        updateData.append("username", formInput.username)
        updateData.append("blockchain", formInput.blockchain)
        updateData.append("description", formInput.description)

        await axios.patch(`${ApiResponeCollection}/${id}`, updateData).then((res: any) => console.log(res.data))

        dispatch({
            type: actionType.SET_REQUEST_LOADING,
            requestLoading: false
        })

        propsCallback(false)
    }

    const closeModal = () => {
        propsCallback(false)
    }

    useEffect(() => {
        loadData()
    }, [accountInfo])

    return (
        <div className='modal-class' aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className='modal-frame'>
                <div className='modal-connect'>
                    <div className='modal-content'>
                        <button className='button-close' type='button' onClick={closeModal}>
                            <AiOutlineClose />
                        </button>
                        <div className='create-collection edit-modal'>
                            <header className='header-collection'>
                                <h1>Update your collection</h1>
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
                                                fileDisplay.logo != null
                                                    ?
                                                    <>
                                                        <button className='clear-button-collection' onClick={() => setFileDisplay(
                                                            { ...fileDisplay, logo: inputRefLogo.current!.value = null }
                                                        )}>
                                                            <AiOutlineClear />
                                                        </button>
                                                        <img ref={inputRefLogo} src={fileDisplay?.logo} alt='' />
                                                    </>
                                                    :
                                                    <>
                                                        <label htmlFor="avatar-collection">
                                                            <BsImage />
                                                        </label>
                                                        <input id="avatar-collection" type="file" onChange={onChangeLogo} />
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
                                                fileDisplay.featured != null
                                                    ?
                                                    <>
                                                        <button className='clear-button-collection' onClick={() => setFileDisplay(
                                                            { ...fileDisplay, featured: inputRefFeatured.current!.value = null }
                                                        )}>
                                                            <AiOutlineClear />
                                                        </button>
                                                        <img ref={inputRefFeatured} src={fileDisplay?.featured} />
                                                    </>
                                                    :
                                                    <>
                                                        <label htmlFor="avatar-collection-featured">
                                                            <BsImage />
                                                        </label>
                                                        <input id="avatar-collection-featured" type="file" onChange={onChangeFeatured} />
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
                                                fileDisplay.banner != null
                                                    ?
                                                    <>
                                                        <button className='clear-button-collection' onClick={() => setFileDisplay(
                                                            { ...fileDisplay, banner: inputRefBanner.current!.value = null }
                                                        )}>
                                                            <AiOutlineClear />
                                                        </button>
                                                        <img ref={inputRefBanner} src={fileDisplay?.banner} alt='' />
                                                    </>
                                                    :
                                                    <>
                                                        <label htmlFor="avatar-collection-banner">
                                                            <BsImage />
                                                        </label>
                                                        <input id="avatar-collection-banner" type="file" onChange={onChangeBanner} />
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
                                                <input required placeholder='Example: Nguyen...' type="text" defaultValue={formInput?.username} onChange={(e: any) => setFormInput({ ...formInput, username: e.target.value })} />
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
                                                <textarea id='description' defaultValue={formInput?.description} onChange={(e: any) => setFormInput({ ...formInput, description: e.target.value })}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='create-submit'>
                                    <button type='submit' onClick={onSubmit}>
                                        Update
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
