import React, { useEffect, useState } from 'react'
import { createSearchParams, Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../util/hook'
import { actionType } from '../../util/store/action'
import { TbListDetails } from 'react-icons/tb'
import { AiFillCaretDown, AiFillQuestionCircle, AiOutlineUnorderedList } from 'react-icons/ai'
import { BsCheck2Circle, BsSearch, BsCartCheckFill } from 'react-icons/bs'
import { BiChevronDown, BiTable } from 'react-icons/bi'
import { MdOutlineFilterList, MdCompare, MdOutlineBackupTable, MdOutlineTableChart, MdAddShoppingCart } from 'react-icons/md'
import Web3 from 'web3'
import { LoadingFrame } from '../../component/loading'
import './table.scss'

export function TableCollection({ nftsProps, links, linkDetail }: any) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadingCollection, requestLoading, shoppingCart, loadingYourCollection } = useTypedSelector((state: any) => state.stateReducer)
  const { nfts } = useTypedSelector((state) => state.yourCollectionRedux)
  const propsData = nftsProps

  const [countCompare, setCountCompare] = useState<any>(0)
  const [search, setSearch] = useState<any>("")
  const [paramsRouter, setParamsRouter] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [collectionItem, setCollectionItem] = useState<any>()
  const [searchParams, setSearchParams] = useSearchParams();
  const [nftCompare, setNftCompare] = useState<any>([])

  const onAdd = async (item: any) => {
    const exist: any = await propsData.find((x: any) => x.tokenId === item.tokenId)
    dispatch({
      type: actionType.SET_COMPARE_DATA,
      compare: exist
    })
    if (countCompare <= 1) {
      if (exist) {
        dispatch({
          type: actionType.SET_YOUR_COLLECTION,
          nfts: propsData.filter((x: any) =>
            x.tokenId === item.tokenId ? { ...exist, cp: exist.cp = true } : x
          )
        })
        setNftCompare(
          propsData.filter((x: any) =>
            x.tokenId === item.tokenId ? { ...exist, cp: exist.cp = true } : x
          )
        )
        searchParams.delete("item1")
        searchParams.delete("item2")
        setSearchParams(searchParams)
        setCountCompare(countCompare + 1)
      }
    }
    else {
      if (exist) {
        const index = propsData.findIndex((ele: any) => ele.cp === true)
        propsData[index].cp = false
        dispatch({
          type: actionType.SET_YOUR_COLLECTION,
          nfts: propsData.filter((x: any) =>
            x.tokenId === item.tokenId ? { ...exist, cp: exist.cp = true } : x
          )
        })
        setNftCompare(
          propsData.filter((x: any) =>
            x.tokenId === item.tokenId ? { ...exist, cp: exist.cp = true } : x
          )
        )
        searchParams.delete("item1")
        searchParams.delete("item2")
        setSearchParams(searchParams)
        setCountCompare(2)
      }
    }
  }

  const onRemove = (item: any) => {
    const exist = propsData.find((x: any) => x.tokenId === item.tokenId)
    if (exist) {
      dispatch({
        type: actionType.SET_YOUR_COLLECTION,
        nfts: propsData.filter((x: any) =>
          x.tokenId === item.tokenId ? { ...exist, cp: exist.cp = false } : x
        )
      })
      setNftCompare(
        propsData.filter((x: any) =>
          x.tokenId === item.tokenId ? { ...exist, cp: exist.cp = false } : x
        )
      )
      searchParams.delete("item1")
      searchParams.delete("item2")
      setSearchParams(searchParams)
      setCountCompare(countCompare - 1)
    }
  }

  const addToCart = (item: any) => {
    const exist = shoppingCart.find((x: any) => x.tokenId === item.tokenId)
    const addexist = propsData.find((x: any) => x.tokenId === item.tokenId)
    dispatch({
      type: actionType.SET_YOUR_COLLECTION,
      nfts: nfts.filter((ele: any) =>
        (ele.tokenId === item.tokenId ? { ...nfts, cart: ele.cart = true } : ele)
      )
    })
    if (exist) {
      dispatch({
        type: actionType.SET_SHOPPING_CART,
        shoppingCart: {
          key: "", value: shoppingCart.map((x: any) =>
            x.tokenId === item.tokenId ? { ...exist, qty: exist.qty += 1 } : x
          )
        }
      })
    } else {
      dispatch({
        type: actionType.SET_YOUR_COLLECTION,
        nfts: propsData.filter((ele: any) =>
          (ele.tokenId === item.tokenId ? { ...propsData, cart: ele.cart = true } : ele)
        )
      })
      dispatch({
        type: actionType.SET_SHOPPING_CART,
        shoppingCart: { key: "add", value: { ...addexist, cart: addexist.cart = true, qty: 1 } }
      })
    }
  }

  const removeOne = async (item: any) => {
    const exist = await shoppingCart.find((x: any) => x.tokenId === item.tokenId)
    if (exist.qty === 1) {
      dispatch({
        type: actionType.SET_YOUR_COLLECTION,
        nfts: propsData.filter((ele: any) =>
          (ele.tokenId === item.tokenId ? { ...propsData, cart: ele.cart = false } : ele)
        )
      })
      dispatch({
        type: actionType.SET_SHOPPING_CART,
        shoppingCart: { key: "remove", value: shoppingCart.filter((x: any) => x.tokenId !== item.tokenId) }
      })
    } else {
      dispatch({
        type: actionType.SET_SHOPPING_CART,
        shoppingCart: { key: "remove", value: shoppingCart.map((x: any) => x.tokenId === item.tokenId ? { ...exist, qty: exist.qty -= 1 } : x) }
      })
    }
  }

  const viewItemModal = (ele: any) => {
    dispatch({
      type: actionType.SET_ITEM_REVIEW,
      itemReview: ele
    })
  }

  const compareFunction = () => {
    if (searchParams.get("item1") != null && searchParams.get("item2") != null) {
      const item1: any = searchParams.get("item1")
      const item2: any = searchParams.get("item2")
      console.log(item1, item2)
      navigate({
        pathname: `${links}`,
        search: `${createSearchParams({ item1: item1, item2: item2 }).toString()}`,
      })
    } else {
      navigate({
        pathname: `${links}`,
        search: `${createSearchParams({ item1: paramsRouter?.[0], item2: paramsRouter?.[1] }).toString()}`,
      })
    }
  }

  useEffect(() => {
    dispatch({
      type: actionType.SET_YOUR_COLLECTION,
      nfts: nfts.filter((ele: any) =>
        shoppingCart.filter((x: any) =>
          (ele.tokenId === x.tokenId) ? { ...nfts, cart: ele.cart = true } : ele)
      )
    })
  }, [loadingYourCollection])

  useEffect(() => {
    if (search !== "" || search != null) {
      setLoading(true)
      setCollectionItem(propsData?.filter((ele: any) => (
        ele.nftName?.toLowerCase().includes(search.toLowerCase())
      )))
      setLoading(false)
    } else {
      setCollectionItem(propsData.filter((ele: any) => (
        ele != null
      )))
    }
  }, [search, propsData])

  useEffect(() => {
    setParamsRouter(nftCompare.filter((ele: any) => (
      ele.cp === true
    )).map((ele: any) => (
      ele.tokenId
    )))
  }, [nftCompare])
  return (
    <>
      <div className='flex-items-header'>
        <div className='flex-items-header-position'>
          <div className='fresnel-container'>
            <div className='flex-items-header-outer'>
              <div className='flex-items-header-inner'>
                <button className='item'>
                  <MdOutlineFilterList />
                </button>
                <div className='search-outer'>
                  <div className='fresnel-container search'>
                    <div className='search-inner'>
                      <div className='search-content'>
                        <div className='search-icon'>
                          <BsSearch className='bs-search' />
                        </div>
                        <input onChange={(e: any) => setSearch(e.target.value)} placeholder='Search by name or attribute' type='search' className='search-input' />
                      </div>
                    </div>
                  </div>
                </div>
                {countCompare === 2 || searchParams.get("item1") && searchParams.get("item2") != null
                  ?
                  <div className='fresnel-container not-search-box' onClick={compareFunction}>
                    <div className='class-button-offer'>
                      <button className='button-offer'>
                        <span>Ready to compare</span>
                      </button>
                    </div>
                  </div>
                  :
                  <div className='fresnel-container not-search-box' >
                    <div className='class-button-offer'>
                      <button className='button-offer not-selected'>
                        <span>Choose 2 </span>
                        <div className='class-question'>
                          <AiFillQuestionCircle />
                          <div className='answer'>
                            <div className='answer-content'>
                              <span>
                                Compare right here
                                <br />
                                - choose 2 items.
                              </span>
                            </div>
                            <AiFillCaretDown />
                          </div>
                        </div>

                      </button>
                    </div>
                  </div>
                }
                <div className='fresnel-container not-search-box'>
                  <div className='class-select'>
                    <div className='select-input'>Ascending price</div>
                    <BiChevronDown />
                  </div>
                </div>
                <div className='fresnel-container not-search-box'>
                  <div className='class-grid-row'>
                    <button className='item-button'><AiOutlineUnorderedList /></button>
                    <button className='item-button'><MdOutlineBackupTable /></button>
                    <button className='item-button'><MdOutlineTableChart /></button>
                    <button className='item-button'><BiTable /></button>
                  </div>
                </div>
                <div className='fresnel-container not-search-box last'>
                  <div className='class-button-offer'>
                    <button className='button-offer'>
                      <span>Make a collection offer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='asset-search-view-main'>
        <div className='asset-search-view-result'>
          <div className='asset-search-view-assets'>
            <div className='fresnel-greater-sm'>
              <div className='asset-view'>
                <div className='table-grid-item'>
                  <div className='table-items'>
                    {
                      loadingCollection === true
                        ?
                        <LoadingFrame divHeight="380px" divWidth="285px" borderRadius="10px" />
                        :
                        <>
                          {collectionItem?.map((ele: any) => (
                            <div className='item'>
                              <img src={ele.nftImage} onClick={() => viewItemModal(ele)} alt='' />
                              <div className={ele.cp === true || ele.cart === true
                                ?
                                'shadow-content active'
                                :
                                'shadow-content'
                              }>
                                <div className='flex-item'>
                                  <span>
                                    {ele.nftName} #{ele.tokenId}
                                    <br />
                                    {ele.owner}
                                  </span>
                                </div>
                                <div className='flex-item bottom'>
                                  <div className='flex-offer'>
                                    <span className='span-price'>{Web3.utils.fromWei(ele.nftPrice)} ETH</span>
                                  </div>
                                  <div className='flex-offer right'>
                                    {
                                      ele.cart === false
                                        ?
                                        <button type='button' className='button-add' onClick={() => addToCart(ele)}>
                                          <MdAddShoppingCart />
                                        </button>
                                        :
                                        <button type='button' className='button-add active' onClick={() => removeOne(ele)}>
                                          <BsCartCheckFill />
                                        </button>
                                    }
                                    {countCompare === 2
                                      ?
                                      <>
                                        {
                                          ele.cp === false
                                            ?
                                            <button type='button' className='button-add' style={{ opacity: 0.2 }} onClick={() => onAdd(ele)}>
                                              <MdCompare />
                                            </button>
                                            :
                                            <button type='button' className='button-add active' onClick={() => onRemove(ele)}>
                                              {ele.cp === true ? <BsCheck2Circle /> : <MdCompare />}
                                            </button>
                                        }
                                      </>
                                      :
                                      <button type='button' className={ele.cp === true ? 'button-add active' : 'button-add'} onClick={() => ele.cp === true ? onRemove(ele) : onAdd(ele)}>
                                        {ele.cp === true ? <BsCheck2Circle /> : <MdCompare />}
                                      </button>
                                    }
                                    <Link to={`/${linkDetail}/${ele.tokenId}`}>
                                      <button type='button' className='button-add'>
                                        <TbListDetails />
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                    }

                    {loading === true || requestLoading === true && <LoadingFrame divHeight="380px" divWidth="277px" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
