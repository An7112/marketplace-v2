import React from 'react'
import { Link } from 'react-router-dom'
import './not-found.scss'
export function Notfound() {
    return (
        <div className='not-found-main'>
            <div className='not-found-content'>
                <div className='error-404-container'>
                    <div className='error-404'>
                        <p>4</p>
                        <p>0</p>
                        <p>4</p>
                    </div>
                    <h1>This page cannot be found.</h1>
                    <p>We've explored deep and wide, but we can't find the page you were looking for.</p>
                    <button><Link to={'/ecommerce'}>Back to home</Link></button>
                </div>
            </div>
        </div>
    )
}
