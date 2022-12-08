import { actionType } from "../action"

export const defaultState = {
    dataSwiper: []
}

interface initialState {
    dataSwiper: Array<any>
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state:initialState = defaultState, action:any):initialState {
    switch(action.type) {
        case actionType.SET_DATA_SWIPER:
        return {
            ...state,
            dataSwiper: action.dataSwiper,
        }
        default: return state
    }
}