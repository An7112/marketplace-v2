
import { actionType } from "../action"
import { initialState, defaultState } from "../state";

export type Action = {
    activeSidebar: boolean;
    type: actionType.SET_ACTIVE_SIDEBAR
} | {
    screenSize: number;
    type: actionType.SET_SCREEN_SIZE
} | {
    loadingCollection: boolean;
    type: actionType.SET_LOADING_COLLECTION
} | {
    loadingSwiper: boolean;
    type: actionType.SET_LOADING_SWIPER
} | {
    loadingDetail: boolean;
    type: actionType.SET_LOADING_DETAIL
} | {
    googleStatus: boolean;
    type: actionType.SET_GOOGLE_STATUS
} | {
    axiosMessage: any;
    type: actionType.SET_AXIOS_MESSAGE
} | {
    dataCollection: Array<any>;
    type: actionType.SET_DATA_COLLECTION
} | {
    requestLoading: boolean;
    type: actionType.SET_REQUEST_LOADING
} | {
    connect: boolean;
    type: actionType.SET_OPEN_CONNECT
} | {
    accountInfo: string;
    type: actionType.SET_ACCOUNT_INFO
} | {
    compare: any;
    type: actionType.SET_COMPARE_DATA
} | {
    openCompare: boolean;
    type: actionType.SET_OPEN_COMPARE
} | {
    itemReview: any;
    type: actionType.SET_ITEM_REVIEW
} | {
    loadingYourCollection: boolean;
    type: actionType.SET_LOADING_YOUR_COLLECTION
} | {
    shoppingCart: any;
    type: actionType.SET_SHOPPING_CART
};

export const reducer = (state: initialState = defaultState, action: Action): initialState => {
    switch (action.type) {
        case actionType.SET_AXIOS_MESSAGE:
            return {
                ...state,
                axiosMessage: action.axiosMessage.key === "remove"
                    ?
                    state.axiosMessage = []
                    :
                    state.axiosMessage.filter(
                        (f: any) =>
                            f.value !== action.axiosMessage.value)
                        .concat([action.axiosMessage])
            }

        case actionType.SET_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: action.shoppingCart.key === "removeAll"
                ?
                state.shoppingCart = []
                :
                action.shoppingCart.key === "remove"
                    ?
                    state.shoppingCart = state.shoppingCart.filter(
                        (item: any) => item.value !== action.shoppingCart.value
                    )
                    :
                    state.shoppingCart.filter(
                        (f: any) =>
                            f.value !== action.shoppingCart.value)
                        .concat([action.shoppingCart])
            }
        case actionType.SET_ACTIVE_SIDEBAR:
            return {
                ...state,
                activeSidebar: action.activeSidebar
            }
        case actionType.SET_COMPARE_DATA:
            return {
                ...state,
                compare: action.compare
            }
        case actionType.SET_ACCOUNT_INFO:
            return {
                ...state,
                accountInfo: action.accountInfo
            }
        case actionType.SET_REQUEST_LOADING:
            return {
                ...state,
                requestLoading: action.requestLoading
            }
        case actionType.SET_SCREEN_SIZE:
            return {
                ...state,
                screenSize: action.screenSize
            }
        case actionType.SET_LOADING_COLLECTION:
            return {
                ...state,
                loadingCollection: action.loadingCollection
            }
        case actionType.SET_LOADING_SWIPER:
            return {
                ...state,
                loadingSwiper: action.loadingSwiper
            }
        case actionType.SET_LOADING_DETAIL:
            return {
                ...state,
                loadingDetail: action.loadingDetail
            }
        case actionType.SET_GOOGLE_STATUS:
            return {
                ...state,
                googleStatus: action.googleStatus
            }
        case actionType.SET_OPEN_CONNECT:
            return {
                ...state,
                connect: action.connect
            }
        case actionType.SET_OPEN_COMPARE:
            return {
                ...state,
                openCompare: action.openCompare
            }
        case actionType.SET_ITEM_REVIEW:
            return {
                ...state,
                itemReview: action.itemReview
            }
        case actionType.SET_LOADING_YOUR_COLLECTION:
            return {
                ...state,
                loadingYourCollection: action.loadingYourCollection
            }
        default:
            return state
    }
}
