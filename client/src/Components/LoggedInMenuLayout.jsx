import React from 'react'
import { useNavigate } from 'react-router-dom'
import DefaultLayout from './DefaultLayout';

function LoggedInMenuLayout(props) {
  const navigate = useNavigate();

  const SwitchUserMode = async () => {
    console.log("Switching to User Mode");
    sessionStorage.setItem('providerId', '');
    navigate('/welcome')
    window.location.reload();
  }


  return (
    <DefaultLayout>
      <div className='LoggedIn-menu'>
        {sessionStorage.getItem('providerId') &&
          <h3>{sessionStorage.getItem('profileName')}</h3>
        }
        <ul>
          <li onClick={() => navigate('/welcome')}>Home |</li>
          <div className="getInfo-dropdown">
            <li>Get Info |</li>
            <div className="getInfo-dropdown-content">
              <ul>
                <li onClick={() => navigate('/GetUserInfo')}>Get User Info</li>
                <li onClick={() => navigate('/GetCredentialInfo')}>Get Credential Info</li>
              </ul>
            </div>
          </div>
          <li onClick={() => navigate('/MyCredentials')}>My Credentials |</li>
          {sessionStorage.getItem('providerId') &&
            <div className='Credential-Dropdown'>
              <li className='credential-dropdown-button'>Credentials |</li>
              <div className='Credential-Dropdown-content' id='Credential-Dropdown-content'>
                <ul>
                  <li onClick={() => navigate('/CreateCredential')}>Create Credential</li>
                  <li onClick={() => navigate('/Credentials')}>Issue Credential</li>
                  <li onClick={() => navigate('/Credentials')}>Registered Credentials</li>
                  <li onClick={() => navigate('/Credentials')}>Issued Credentials</li>
                  <li onClick={() => navigate('/MyCredentials')}>My Credentials</li>
                </ul>
              </div>
            </div>
          }

        </ul>
          <div className='switchButtons'>
            <button className={!sessionStorage.getItem('providerId') && 'activeButton'} disabled={!sessionStorage.getItem('providerId')} onClick={() => SwitchUserMode()}>User Mode</button>
            <button className={sessionStorage.getItem('providerId') && 'activeButton'} disabled={!!sessionStorage.getItem('providerId')}  onClick={() => navigate('/ProviderProfile')}>Provider Mode</button>
          </div>
      </div>
      <div className='LoggedInLayout'>
        {props.children}
      </div>
    </DefaultLayout>
  )
}

export default LoggedInMenuLayout
