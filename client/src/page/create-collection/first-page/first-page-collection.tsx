import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../../util/hook'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import '../collection.scss'
import './first-page.scss'

export function FirstPageCollection() {
  const { dataCollection } = useTypedSelector((state) => state.dataCollection)
  const { loadingCollection } = useTypedSelector((state) => state.stateReducer)
  const [collection, setCollection] = useState<any>([])


  async function loadCollection() {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const accounts = await web3.eth.getAccounts()
    // eslint-disable-next-line array-callback-return
    setCollection((dataCollection).filter((ele) => (
      ele.address === accounts[0]
    )))
  }

  useEffect(() => {
    loadCollection()
  }, [loadingCollection])

  return (
    <div className='create-main'>
      <div className='collection-manager'>
        <header className='class-header'>
          <h1>My Collections</h1>
          <span>
            <div className='class-span-header'>
              <div className='collection-header-info'>
                Create, organize and manage collections of unique NFTs to share and sell.
              </div>
              <div className='collection-header-button'>
                <Link to='/create-collection'>
                  <button>
                    Create a collection
                  </button>
                </Link>
              </div>
            </div>
          </span>
        </header>
        <div className='class-grid-items'>
          {collection.map((ele: any) => (
            <Link to="/Profile">
              <div className='item'>
                <div className='item-head'>
                  <span>
                    <img src={ele.featuredImage} alt='' />
                  </span>
                </div>
                <div className='item-info'>
                  <div className='avatar-collection'>
                    <span>
                      <img src={ele.logo} alt='' />
                    </span>
                  </div>
                  <span>
                    {ele.username}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
