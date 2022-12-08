import React from 'react'
import { AiOutlineTwitter, AiOutlineInstagram, AiFillYoutube } from 'react-icons/ai'
import { SiDiscord, SiTiktok, SiGmail } from 'react-icons/si'
import './footer.scss'

export function Footer() {
  return (
    <div className='footer-main'>
      <div className='footer-container'>
        <div className='footer-row'>
          <div className='footer-half left'>
            <h3>Keep up to date</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            <form className='footer-form'>
              <input placeholder='Your email address' type='input' />
              <button>Register</button>
            </form>
          </div>
          <div className='footer-half right'>
            <h3>Join the community</h3>
            <div className='footer-half-button'>
              <button><AiOutlineTwitter className='half-button-icon' /></button>
              <button><AiOutlineInstagram className='half-button-icon' /></button>
              <button><SiDiscord className='half-button-icon' /></button>
              <button><AiFillYoutube className='half-button-icon' /></button>
              <button><SiTiktok className='half-button-icon' /></button>
              <button><SiGmail className='half-button-icon' /></button>
            </div>
          </div>
        </div>
        <div className='footer-row'>
          <div className='footer-quarter'>
            <h3>NFT-MARKETPLACE</h3>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
          </div>
          <div className='footer-three-quarter'>
            <div className='footer-link-column'>
              <h4>Column 1</h4>
              <span>All NFTs</span>
              <span>Art</span>
              <span>Trading Cards</span>
              <span>Sport</span>
              <span>NFT ETH</span>
            </div>
            <div className='footer-link-column'>
              <h4>Column 2</h4>
              <span>All NFTs</span>
              <span>Art</span>
              <span>Trading Cards</span>
              <span>Sport</span>
              <span>NFT ETH</span>
            </div>
            <div className='footer-link-column'>
              <h4>Column 3</h4>
              <span>All NFTs</span>
              <span>Art</span>
              <span>Trading Cards</span>
              <span>Sport</span>
              <span>NFT ETH</span>
            </div>
            <div className='footer-link-column'>
              <h4>Column 4</h4>
              <span>All NFTs</span>
              <span>Art</span>
              <span>Trading Cards</span>
              <span>Sport</span>
              <span>NFT ETH</span>
            </div>
            <div className='footer-link-column'>
              <h4>Column 5</h4>
              <span>All NFTs</span>
              <span>Art</span>
              <span>Trading Cards</span>
              <span>Sport</span>
              <span>NFT ETH</span>
            </div>
          </div>
        </div>
        <div className='footer-bottom'>
          <div className='footer-bottom-section'>
            <p>&copy; Nguyen Thanh An</p>
          </div>
          <div className='footer-bottom-section right'>
            <p>Privacy Policy</p>
            <p>Terms of use</p>
          </div>
        </div>
      </div>
    </div>
  )
}

