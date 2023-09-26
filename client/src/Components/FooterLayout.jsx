import React from 'react'
import { FacebookRounded, LinkRounded, TransferWithinAStationRounded, Twitter, YouTube  } from '@mui/icons-material';

function FooterLayout() {
  return (
    <div className='footerLayout'>
        <div className="icons">
            <LinkRounded />
            <FacebookRounded />
            <Twitter />
            <YouTube  />
        </div>
        <div className='footerMenu'>
            <li>Contact Us |</li>
            <li>Terms And Conditions | </li>
            <li>Notices | </li>
            <li>Bug Reporting | </li>
        </div>
    </div>
  )
}

export default FooterLayout
