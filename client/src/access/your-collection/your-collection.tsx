import axios from "axios";
import { actionType } from "../../util/store/action";
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import MyNFT from '../../contracts/MyNFT.json'
import Marketplace from '../../contracts/Marketplace.json'

export const loadNFTs = (_id:any) => async (dispatch: any) => {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const networkId = await web3.eth.net.getId()
    
    dispatch({
        type: actionType.SET_LOADING_YOUR_COLLECTION,
        loadingYourCollection: true
    })

    const marketplaceContract = new web3.eth.Contract(Marketplace.abi as any, Marketplace.networks[networkId as unknown as keyof typeof Marketplace.networks].address)
    const listings = await marketplaceContract.methods.getMyListedNfts().call({ from: _id })
    const nfts: any = Promise.all(listings.map(async (i: any) => {
        try {
            const myNftContract = new web3.eth.Contract(MyNFT.abi as any, MyNFT.networks[networkId as unknown as keyof typeof MyNFT.networks].address)
            const tokenURI = await myNftContract.methods.tokenURI(i.tokenId).call()
            const meta = await axios.get(tokenURI)

            let item = {
                nftPrice: i.price,
                tokenId: i.tokenId,
                seller: i.seller,
                owner: i.owner,
                nftName: meta.data.nftName,
                nftImage: meta.data.nftImage,
                qty: 1,
                cart: false,
                cp: false
            }
            return item
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
    dispatch({
        type: actionType.SET_YOUR_COLLECTION,
        nfts: (await nfts).filter((ele:any) => (
            ele != null
        ))
        ,
        dataLength: nfts.length
    })
    dispatch({
        type: actionType.SET_LOADING_YOUR_COLLECTION,
        loadingYourCollection: false
    })
}