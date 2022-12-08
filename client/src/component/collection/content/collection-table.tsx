import React from 'react'
import { createSearchParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PropsType } from '../../../model/collection-model'
import { useTypedSelector } from '../../../util/hook'
import { LoadingFrame } from '../../loading'

export function CollectionTable({dataCollection, currentData}:any) {
    const { loadingCollection } = useTypedSelector((state) => state.stateReducer)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const pageCollectionLoads: Array<any> = []

    for (let i = 1; i <= 5; i++) {
        pageCollectionLoads.push(i)
    }

    const addRouter = (e:string) => {
        navigate({
            pathname: `/your-collection`,
            search: `${createSearchParams({yourCollectionId:e}).toString()}`,
          })
    }

  return (
    <>
    <div className='colection-list tendency'>
                        <div className='colection-grid-col6'>
                            <div className='colection-grid-col6-content'>
                                <>
                                    <div className='colection-grid-header'>
                                        <div className='colection-header-name'>
                                            <span>COLLECTION</span>
                                        </div>
                                        <div className='colection-header-name plancher'>
                                            <span>FLOOR PRICE</span>
                                        </div>
                                        <div className='colection-header-name volume'>
                                            <span>VOLUME</span>
                                        </div>
                                    </div>
                                </>
                                {dataCollection.length === 0 || loadingCollection === true
                                    ?
                                    <div className='collection-table-grid'>
                                        {pageCollectionLoads.map((ele: any) => (
                                            <LoadingFrame divWidth={"100%"} divHeight={"96px"} />
                                        ))}
                                    </div>
                                    :
                                    (
                                        <div className='collection-table-grid'>
                                            {
                                                currentData.map((ele:PropsType, index:number) => (
                                                    <>
                                                        <a className='collection-list-item' key={ele._id} onClick={ ()  => addRouter(ele.address)}>
                                                            <div className='colection-header-name items'>
                                                                <span className='span-id'>{index + 1}</span>
                                                                <img src={ele.logo || "/media/items/nft3.avif"} />
                                                                <span>{ele.username}</span>
                                                            </div>
                                                            <div className='colection-header-name plancher items'>
                                                                <span>3000 ETH</span>
                                                            </div>
                                                            <div className='colection-header-name volume items'>
                                                                <span>3000</span>
                                                            </div>
                                                        </a>
                                                    </>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className='colection-list tendency right'>
                        <div className='colection-grid-col6'>
                            <div className='colection-grid-col6-content'>
                                <div>
                                    <div className='colection-grid-header'>
                                        <div className='colection-header-name'>
                                            <span>COLLECTION</span>
                                        </div>
                                        <div className='colection-header-name plancher'>
                                            <span>FLOOR PRICE</span>
                                        </div>
                                        <div className='colection-header-name volume'>
                                            <span>VOLUME</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='collection-table-grid'>
                                    {dataCollection.length === 0 || loadingCollection === true
                                        ?
                                        <div className='collection-table-grid'>
                                            {pageCollectionLoads.map((ele: any) => (
                                                <LoadingFrame divWidth={"100%"} divHeight={"96px"} />
                                            ))}
                                        </div>
                                        : (
                                            <div className='collection-table-grid'>
                                                {
                                                    dataCollection.slice(5, 10).map((ele:PropsType, index:number) => (
                                                        <Link to={"/collection-detail/" + ele._id} className='collection-list-item' key={ele._id}>
                                                            <div className='colection-header-name items'>
                                                                <span className='span-id'>{index + 6}</span>
                                                                <img src={ele.logo} />
                                                                <span>{ele.username}</span>
                                                            </div>
                                                            <div className='colection-header-name plancher items'>
                                                                <span>3000 ETH</span>
                                                            </div>
                                                            <div className='colection-header-name volume items'>
                                                                <span>3000</span>
                                                            </div>
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
    </>
  )
}