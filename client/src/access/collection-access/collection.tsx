import axios from "axios";
import { ApiResponeCollection } from "../../util/api-response";
import { actionType } from "../../util/store/action";
export const getDataCollection = (add:number) => async (dispatch:any)=> {
    dispatch({
        type: actionType.SET_LOADING_COLLECTION,
        loadingCollection: true
    })
    try{
        const res = await axios.get(ApiResponeCollection)

        dispatch({
            type: actionType.SET_DATA_COLLECTION,
            dataCollection: res.data.slice(0, add),
            dataLength: res.data.length
        })
        dispatch({
            type: actionType.SET_LOADING_COLLECTION,
            loadingCollection: false
        })
    }
    catch(error:any) {
        dispatch({
            type: actionType.SET_AXIOS_MESSAGE,
            axiosMessage: ({key:"ecommerce", value: `${error.message} when receiving data about collection`, status:"error"})
        })
        dispatch({
            type: actionType.SET_LOADING_COLLECTION,
            loadingCollection: true
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