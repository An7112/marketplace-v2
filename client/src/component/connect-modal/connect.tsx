import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../util/hook'
import { actionType } from '../../util/store/action'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import { AiOutlineClose } from 'react-icons/ai'
import { FaWallet } from 'react-icons/fa'
import './connect.scss'

export function Connect() {
    const dispatch = useAppDispatch()
    const { connect, accountInfo } = useTypedSelector((state) => state.stateReducer)

    function closeConnect() {
        dispatch({
            type: actionType.SET_OPEN_CONNECT,
            connect: false
        })
    }

    async function loadAccount() {
        const web3Modal = new Web3Modal()
        const provider = await web3Modal.connect()
        const web3 = new Web3(provider)
        const addressWallet = await web3.eth.getAccounts()
        dispatch({
            type: actionType.SET_ACCOUNT_INFO,
            accountInfo: addressWallet[0]
        })
    }

    useEffect(() => {
        loadAccount()
    }, [])

    return (
        <div className='modal-class' aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {connect === true
                &&
                <div className='modal-frame'>
                    <div className='modal-connect'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h4>Connect your wallet</h4>
                            </div>
                            <button className='button-close' type='button'
                                onClick={closeConnect}>
                                <AiOutlineClose />
                            </button>
                            <div className='modal-body'>
                                <div className='modal-message'>
                                    <span>If you don't have a wallet, you can select a provider and create one now.
                                        <a href='#'>Learn more</a>
                                    </span>
                                </div>
                                {accountInfo !== null
                                    ?
                                    <div className='account-info'>
                                        <FaWallet />
                                        <h4>{accountInfo}</h4>
                                    </div>
                                    :
                                    <ul>
                                        <li>
                                            <button className='choose-wallet' onClick={loadAccount}>
                                                <span><img src='/media/items/metamask-fox.svg' /> MetaMask</span>
                                                <p>POPULAR</p>
                                            </button>
                                        </li>
                                        <li>
                                            <button className='choose-wallet'>
                                                <span><img src='/media/items/walletlink-alternative.webp' />Coinbase Connect</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button className='choose-wallet'>
                                                <span><img src='/media/items/walletconnect-alternative.webp' />Wallet Connect</span>
                                            </button>
                                        </li>
                                    </ul>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
