import axios from "axios"
import React, { useEffect, useState } from "react"
import { Swiper } from "../../model/swiper-model"
import { actionType } from "../../util/store/action"
import {useDispatch} from 'react-redux'
import { ApiResponeSwiper } from "../../util/api-response"
export const GetSwiperData = () => async (dispatch:any)=> {
    dispatch({
        type: actionType.SET_LOADING_SWIPER,
        loadingSwiper: true
    })
    try{
        const res = await axios.get(ApiResponeSwiper)
        dispatch({
            type: actionType.SET_DATA_SWIPER,
            dataSwiper: res.data
        })
        dispatch({
            type: actionType.SET_LOADING_SWIPER,
            loadingSwiper: false
        })
    }
    catch(error:any) {
        dispatch({
            type: actionType.SET_AXIOS_MESSAGE,
            axiosMessage: ({key:"ecommerce", value: `${error.message} when receiving data about swiper`, status:"error"})
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