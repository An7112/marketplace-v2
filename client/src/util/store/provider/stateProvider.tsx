

import { combineReducers } from "redux";
import { reducer } from "../reducer";
import collectionReducer from "../reducer/collectionReducer";
import swiperReducer from "../reducer/swiperReducer";
import yourCollectionReducer from "../reducer/yourCollectionReducer";
export const allReducers = combineReducers({
    stateReducer: reducer,
    dataCollection: collectionReducer,
    yourCollectionRedux: yourCollectionReducer,
    dataSwiper: swiperReducer
})

export type RootState = ReturnType<typeof allReducers>