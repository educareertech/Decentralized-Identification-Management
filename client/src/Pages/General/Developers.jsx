import React from 'react'
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout'
import FooterLayout from '../../Components/FooterLayout'

function Developers() {
  return (
    <>
    <LoggedInMenuLayout>
        <div className='Developers'>
            <div className='first'>
                <div className='dev-card'>
                    <h4>-Idea and Requirements By</h4>
                    <div className='dev-card-inner'>
                        <img src="userIcon.png" alt="" />
                        <h3>Sohail Shafique</h3>
                        <h5>Education Development, Management <br />
                            and Blockchain Professional</h5>
                            <button>See Profile</button>
                    </div>
                </div>
            </div>
            <div className='second'>
            <div className='dev-card'>
                    <h4>-Designed and developed by</h4>
                    <div className='dev-card-inner'>
                        <img src="userIcon.png" alt="" />
                        <h3>Mehboob Hassan</h3>
                        <h5>Full Stack Blockchain Developer</h5>
                        <button>See Profile</button>
                    </div>
                </div>
            </div>
        </div>
    </LoggedInMenuLayout>
    <FooterLayout></FooterLayout>
    </>
  )
}

export default Developers
