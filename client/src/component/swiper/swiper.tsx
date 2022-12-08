import React, { useRef } from 'react'
import { useTypedSelector } from '../../util/hook'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FaEthereum } from 'react-icons/fa'
import { LoadingFrame } from '../loading'
import './swiper.scss'

export function SwiperSlide() {
    const { loadingSwiper } = useTypedSelector((state) => state.stateReducer)
    const listData = useTypedSelector((state) => state.dataSwiper)

    const pageLoads: Array<any> = []
    const { dataSwiper } = listData
    const swiperSlide = dataSwiper

    const ref = useRef<HTMLDivElement>(null);

    for (let i = 1; i <= 4; i++) {
        pageLoads.push(i)
    }

    const prev = () => {
        ref.current!.scrollLeft -= 467;
    }

    const next = () => {
        ref.current!.scrollLeft += 467;
    }

    return (
        <div className='class-swiper' >
            <div className='swiper-container'>
                <div className='swiper-carousel'>
                    <div className='swiper-content'>
                        <button className='slide prev' onClick={prev}><GrFormPrevious /></button>
                        <section className='swiper-initialized'>
                            <div className='swiper-wrapper' ref={ref}>
                                {loadingSwiper === true || dataSwiper.length === 0
                                    ?
                                    <>
                                        {pageLoads.map((ele: any) => (
                                            <LoadingFrame divWidth={"443px"} divHeight={"100%"} />
                                        ))}
                                    </>
                                    :
                                    <>
                                        {swiperSlide.map((ele: any) => (
                                            <div className='swiper-slide' id='swiper-slide' key={ele._id}>
                                                <img src={ele.image} alt="item" />
                                                <div className='flex-info-item'>
                                                    <div className='flex-owner info'>
                                                        <span>
                                                            {ele.title}
                                                            by
                                                            {ele.owner}
                                                            <BsPatchCheckFill style={{ color: '#c8dbe9' }} />
                                                        </span>
                                                    </div>
                                                    <div className='flex-owner floor'>
                                                        <span>
                                                            Floor: {ele.price}
                                                            <FaEthereum style={{ color: '#c8dbe9' }} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>}
                            </div>
                        </section>
                        <button className='slide next' onClick={next}><GrFormNext /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}