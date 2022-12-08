
export interface initialState {
    activeSidebar: boolean,
    screenSize: number,
    loadingCollection: boolean,
    loadingSwiper: boolean,
    loadingDetail: boolean,
    googleStatus: boolean,
    axiosMessage: any,
    requestLoading: boolean,
    connect: boolean,
    accountInfo:any,
    compare: any,
    openCompare: boolean,
    itemReview: any,
    loadingYourCollection: boolean,
    shoppingCart: any
}

export const defaultState = {
    activeSidebar: false,
    screenSize: 0,
    loadingCollection: false,
    loadingSwiper: false,
    loadingDetail: false,
    googleStatus: navigator.onLine,
    axiosMessage: [],
    requestLoading: false,
    connect: false,
    accountInfo:null,
    compare:null,
    openCompare: false,
    itemReview: null,
    loadingYourCollection: false,
    shoppingCart: []
}
  
 
  