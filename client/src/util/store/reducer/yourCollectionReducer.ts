import { actionType } from "../action"

export const defaultState = {
    nfts: [],
    addnew: 25,
    dataLength: 0
}

interface initialState {
    nfts: Array<any>,
    addnew: number,
    dataLength:number
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state:initialState = defaultState, action:any):initialState {
    switch(action.type) {
        case actionType.SET_YOUR_COLLECTION:
        return {
            ...state,
            nfts: action.nfts,
            dataLength: action.dataLength
        }
        case actionType.SET_ADD_NEW:
            return {
                ...state,
                addnew: state.addnew += action.addnew
            }
        default: return state
    }
}