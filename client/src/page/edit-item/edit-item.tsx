import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { actionType } from '../../util/store/action'
import { useAppDispatch, useTypedSelector } from '../../util/hook'
import { BiRename } from 'react-icons/bi'
import { IoPricetagsOutline } from 'react-icons/io5'
import { TbFileDescription } from 'react-icons/tb'
import { VscGitPullRequestCreate } from 'react-icons/vsc'
import { AiOutlineClear } from 'react-icons/ai'
import { Modal } from '../../component/message-modal'
import { ApiResponeCollection } from '../../util/api-response'
import { RequestModal } from '../../component/request-modal'
import { LoadingFrame } from '../../component/loading'
import { ToastMessage } from '../../component/toast-message'
import './edit.scss'

export function EditItem() {
  const dispatch = useAppDispatch()
  const { googleStatus, requestLoading, loadingDetail } = useTypedSelector((state) => state.stateReducer)
  const [fileUrl, setFileUrl] = useState<any>(null)
  const [fileDisplay, setFileDisplay] = useState<any>(null)
  const [formInput, updateFormInput] = useState<any>({ nftPrice: null, nftName: null, nftDescription: null })

  const { _id } = useParams()
  const inputRef = useRef<any>(null);

  const getData = async () => {
    dispatch({
      type: actionType.SET_LOADING_DETAIL,
      loadingDetail: true
    })
    try {
      const response = await axios.get(
        `${ApiResponeCollection}/${_id}`
      );
      setFileUrl(response.data.nftImage)
      updateFormInput({
        nftPrice: response.data.nftPrice,
        nftName: response.data.nftName,
        nftDescription: response.data.nftDescription,
      })
      setFileDisplay(response.data.nftImage);
      dispatch({
        type: actionType.SET_LOADING_DETAIL,
        loadingDetail: false
      })
    } catch (error: any) {
      dispatch({
        type: actionType.SET_AXIOS_MESSAGE,
        axiosMessage: ({ key: "editItem", value: `${error.message}` })
      })
    }
  }

  function onChange(e: any) {
    const file = e.target.files[0]
    setFileDisplay(URL.createObjectURL(file))
    setFileUrl(file)
  }

  function clearContent() {
    setFileDisplay(null)
    inputRef.current!.value = null
  }

  async function updateRequest(e: any) {
    dispatch({
      type: actionType.SET_REQUEST_LOADING,
      requestLoading: true
    })

    const { nftPrice, nftName, nftDescription } = formInput

    const dataForm: any = new FormData()
    dataForm.append("nftName", nftName)
    dataForm.append("nftPrice", nftPrice)
    dataForm.append("nftVolumn", "2000")
    dataForm.append("nftOwner", "An")
    dataForm.append("nftDescription", nftDescription)
    dataForm.append("nftImage", fileUrl)

    try {
      await axios.patch(`${ApiResponeCollection}/${_id}`, dataForm).then((res) => console.log(res.data))
      dispatch({
        type: actionType.SET_REQUEST_LOADING,
        requestLoading: false
      })
      dispatch({
        type: actionType.SET_AXIOS_MESSAGE,
        axiosMessage: ({ key: "editItem", value: "Successful data update", status:"successful" })
      })
      setFileUrl(null)
      const time = setTimeout(() => { 
        dispatch({
          type: actionType.SET_AXIOS_MESSAGE,
          axiosMessage: ({ key: "remove", value: "" })
        })
      }, 5000)
      return () =>  clearTimeout(time)
    } catch (error: any) {
      dispatch({
        type: actionType.SET_AXIOS_MESSAGE,
        axiosMessage: ({ key: "editItem", value: `${error.message}` , status:"error"})
      })
      const time = setTimeout(() => { 
        dispatch({
          type: actionType.SET_AXIOS_MESSAGE,
          axiosMessage: ({ key: "remove", value: "" })
        })
      }, 5000)
      return () =>  clearTimeout(time)
    }
  }

  useEffect(() => {
    return () => {
      getData()
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <div className='create-main'>
      {googleStatus === false && <Modal />}
      {requestLoading === true && <RequestModal />}
      <ToastMessage keyMessage={"editItem"} />
      <div className='create-nft-body'>

        <div className='div-form'>
          <div className='grid-form'>
            <div className='information-form'>
              <div className='title-page'>
                <p>Update your NFT</p>
                <VscGitPullRequestCreate />
              </div>
              <div className='infomation-form-content'>
                <h3>Information</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat optio debitis beatae mollitia qui dolorem deleniti nam et, tenetur quisquam? Tenetur eius, provident amet quam corrupti nemo ab voluptates quasi!</p>
              </div>
            </div>
            <div className='box-form'>
              <div className='form'>
                <div className='content-form'>
                  <div className='content-form-top'>
                    <div className='content-form-top-grid'>
                      <div className='div-label-input'>
                        <label htmlFor="Name">NFT NAME <BiRename className='icons' /></label>
                        {loadingDetail === true
                          ?
                          <LoadingFrame divWidth={"100%"} divHeight={"44px"} borderRadius={"4px"} />
                          :
                          <input className='input' defaultValue={formInput.nftName} id='Name' type="text" placeholder="NFT NAME" onChange={e => updateFormInput({ ...formInput, nftName: e.target.value })} />
                        }
                      </div>
                      <div className='div-label-input'>
                        <label htmlFor="Price">NFT PRICE <IoPricetagsOutline className='icons' /></label>
                        {loadingDetail === true
                          ?
                          <LoadingFrame divWidth={"100%"} divHeight={"44px"} borderRadius={"4px"} />
                          :
                          <input className='input' defaultValue={formInput.nftPrice} id='Price' type="Number" placeholder="NFT PRICE" onChange={e => updateFormInput({ ...formInput, nftPrice: e.target.value })} />
                        }
                      </div>
                      <div className='div-label-input full'>
                        <label htmlFor="Description">Description <TbFileDescription className='icons' /></label>
                        {loadingDetail === true
                          ?
                          <LoadingFrame divWidth={"100%"} divHeight={"62px"} borderRadius={"4px"} />
                          :
                          <textarea id='Description' defaultValue={formInput.nftDescription} rows={2} placeholder='Asset Description...' onChange={e => updateFormInput({ ...formInput, nftDescription: e.target.value })} />
                        }
                      </div>
                      <div className='div-img'>
                        {fileDisplay ?
                          <>
                            {loadingDetail === true
                              ?
                              <LoadingFrame divWidth={"250px"} divHeight={"250px"} borderRadius={"4px"} />
                              :
                              <img className='img-url' src={fileDisplay} alt="" />
                            }
                            <button className='clear-button button-not-empty' onClick={clearContent}><AiOutlineClear /></button>
                          </> 
                          : 
                          (
                            <label htmlFor="Img">
                              <div className='div-child-label'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-upload" viewBox="0 0 16 16" style={{ width: '40px', height: '40px', marginBottom: '12px', color: '#9ca3af' }}>
                                  <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                  <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                                </svg>
                                <p className='click-to-upload'><span style={{ fontWeight: "600" }}>Click to upload</span> or drag and drop</p>
                                <p className="format-text">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                              </div>
                            </label>
                          )}

                        <input ref={inputRef} id='Img' type="file" name="Asset" style={{ display: "none" }} onChange={onChange} />
                      </div>
                      {formInput.nftName !== null
                        && formInput.nftPrice !== null
                        && formInput.nftDescription !== null
                        && fileDisplay !== null ? <button className='button-not-empty' type='submit' onClick={updateRequest}>Update NFT</button>
                        : <button className='button-empty' type='button' style={{ cursor: 'default' }}>Data cannot be empty</button>}
                    </div>
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