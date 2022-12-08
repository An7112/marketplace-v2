import { actionType } from "../action"

export const defaultState = {
    dataCollection: [],
    addnew: 25,
    dataLength: 0
}

interface initialState {
    dataCollection: Array<any>,
    addnew: number,
    dataLength:number
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state:initialState = defaultState, action:any):initialState {
    switch(action.type) {
        case actionType.SET_DATA_COLLECTION:
        return {
            ...state,
            dataCollection: action.dataCollection,
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