import React from 'react'
import { FacebookRounded, LinkRounded, TransferWithinAStationRounded, Twitter, YouTube  } from '@mui/icons-material';

function FooterLayout() {
  return (
    <div className='footerLayout'>
        <div className="icons">
            <a target='_blank' href="https://www.linkedin.com/company/educareertech/"><LinkRounded /></a>
            <a target='_blank' href="https://www.facebook.com/EduCareertech"><FacebookRounded /></a> 
            <a target='_blank' href=""><Twitter /></a> 
            <a target='_blank' href="https://www.youtube.com/@EduCareertech."><YouTube  /></a> 
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
