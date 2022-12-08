import React, { useEffect } from 'react';
import { Ecommerce } from './page/ecommerce';
import { Navbar } from './component/navbar';
import { Sidebar } from './component/sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ItemDetail } from './page/item-detail';
import {Footer} from './component/footer/footer';
import { Notfound } from './page/page-not-found';
import { CreateItem } from './page/create';
import { ApiResponeCollection, ApiResponeSwiper } from './util/api-response';
import { getDataCollection } from './access/collection-access';
import { useAppDispatch, useTypedSelector } from './util/hook';
import { GetSwiperData } from './access/swiper-access';
import { EditItem } from './page/edit-item';
import { YourCollection } from './page/your-collection';
import { Profile } from './page/profile';
import { Resell } from './page/resell-nft';
import { Collection } from './page/create-collection';
import { FirstPageCollection } from './page/create-collection/first-page/first-page-collection';
import './index.scss'

function App() {
  const dispatch = useAppDispatch()
  const { addnew} = useTypedSelector((state) => state.dataCollection)
  const { requestLoading } = useTypedSelector((state) => state.stateReducer)

  useEffect(() => {
    return () => {
      dispatch(getDataCollection(addnew))
    }
  }, [ApiResponeCollection, addnew, requestLoading])

  useEffect(() => {
    return () => {
      dispatch(GetSwiperData())
    }
  },[ApiResponeSwiper])

  return (
    <div className='main-app'>
      <BrowserRouter>
        <Navbar />
        <main className='class-main'>
          <div className='class-main content'>
            <div className='class-grid'>
              <div className='bg-image'>
                <Routes>
                  <Route path='/' element={<Ecommerce />} />
                  <Route path='/ecommerce' element={<Ecommerce />} />
                  <Route path='/Create' element={<CreateItem />} />
                  <Route path='/my-collection' element={<FirstPageCollection />} />
                  <Route path='/create-collection' element={<Collection />} />
                  <Route path='/your-collection' element={<YourCollection />} />
                  <Route path='/Profile' element={<Profile />} />
                  <Route path='/resell-nft/:_id' element={<Resell />} />
                  <Route path='/Item/:_id' element={<ItemDetail />} />
                  <Route path='/edit/:_id' element={<EditItem />} />
                  <Route path='*' element={<Notfound />} />
                </Routes>
              </div>
            </div>
            <Sidebar />
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
