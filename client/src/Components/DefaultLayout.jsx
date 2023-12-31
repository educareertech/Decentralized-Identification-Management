import React, { useEffect } from 'react'
import './CompStyle.css'
import { useNavigate } from 'react-router-dom'
import { ContextState } from '../Context/useContext';

function DefaultLayout(props) {
  const navigate = useNavigate();

  const {getProviderOrSigner}= ContextState();

  const logout = () => {
    sessionStorage.setItem('userDid', '');
    navigate('/');
  }



  const checkNetwork = async () => {
    console.log("This is being called")
    const signer = await getProviderOrSigner();
    const network = await signer.getNetwork();
    if (network.chainId !== 11155111) {
      window.alert("Change Network to Sepolia");
    }
  }

  // useEffect(() => {
  //   checkNetwork();
  // }, [])

  return (
    <div className='defaultLayout'>
      <div className="header">
        <div className="inner">
          <img src="officialLogo.jpg" alt="Logo Image" />
          <ul>
            {sessionStorage.getItem('userDid') &&
              <li onClick={() => navigate('/UserProfile')}>Profile |</li>
            }
            <li>Platform |</li>
            <li onClick={()=> navigate('/AboutUs')}>About Us |</li>
            <li onClick={()=> navigate('/Developers')}>Developers |</li>
            {!sessionStorage.getItem('userDid') &&
              <li onClick={() => navigate('/register')}>Sign In |</li>
            }
          </ul>
          <div className="buttonGroup">
            {!sessionStorage.getItem('userDid') ?
              <>
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/login')}>Try Free</button>
              </> :
              <>
                <button className='becomeProviderBtn' onClick={() => logout()}>Logout</button>
              </>
            }
          </div>
        </div>
      </div>
      <div className="content">
        {props.children}
      </div>
    </div>
  )
}

export default DefaultLayout
