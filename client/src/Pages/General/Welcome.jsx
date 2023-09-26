import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../Components/DefaultLayout';
import FooterLayout from '../../Components/FooterLayout';
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout';



function Welcome() {

  const navigate = useNavigate()


  return (
    <>
        <LoggedInMenuLayout>
          <div className='loggedInHomePage'>
            <h2>Dashboard</h2>
            <div className='boxesGroup'>
              <div onClick={() => navigate('/UserProfile')}>
                <h3>MY PROFILE</h3>
              </div>
              {sessionStorage.getItem('providerId') ?
                <>
                  <div onClick={() => navigate('/Credentials')}>
                    <h3>ISSUED CREDENTIALS</h3>
                  </div>
                  <div onClick={() => navigate('/Credentials')}>
                    <h3>ALL CREDENTIALS</h3>
                  </div>
                </>
                :
                <>
                  <div onClick={() => navigate('/MyCredentials')}>
                    <h3>MY CREDENTIALS</h3>
                  </div>
                  <div onClick={() => navigate('/ProviderProfile')}>
                    <h3>PROVIDER MODE</h3>
                  </div>
                </>
              }

            </div>
            <div className='btnGroup'>
              {sessionStorage.getItem('providerId') &&
                <>
                  <button onClick={() => navigate('/Credentials')}>Issue Credential</button>
                  <button onClick={() => navigate('/CreateCredential')}>Create New Credential</button>
                </>
              }
            </div>
          </div>
          <div className="HomePage mt-5" >
            <div className='HomePage-inner'>
              <div className='HomePage-inner-left'>
                <h2><b>EduCareer</b> Decentralized Identification System</h2>
                <p>Platform at the forefront of identity management and verifiable credentials
                  in the digital age. Embracing the power of web3 technology and blockchain, we've crafted an ecosystem
                  that redefines the way identities are established, managed, and verified. </p>
                {!sessionStorage.getItem('userDid') &&

                  <button>Try demo</button>
                }
              </div>
              <div className='HomePage-inner-right'>
                <img src="dark.jpg" alt="" />
              </div>
            </div>
            <div className='self-sovereign'>
              <div className='self-sovereign-left'>
                <img src="ssi.png" alt="" />
              </div>
              <div className='self-sovereign-right'>
                <h1>Self-Sovereign Identity</h1>
                <p>Self-Sovereign Identity (SSI) is a model that gives individuals full ownership and control of their digital identities without relying on a third party. In contrast to centralized identity management, you are the boss of your identity and get to decide who gets to see your data. You can also remove access to your data any time.</p><br />
                <p>SSI means the individual (or organization) manages the elements that make up their identity and controls access to those credentials digitally. With SSI, the power to control personal data resides with the individual, and not an administrative third party granting or tracking access to these credentials.</p>
              </div>
            </div>
            <div className="verifiable-credentials">
              <div className='verifiable-credentials-left'>
                <h1>Verifiable Credentials</h1>
                <p>Verifiable credentials are the result of a W3C effort to standardize provable identities across a variety of use identity cases (transcripts, mortgages, licenses/passports, and many more scenarios.) A DID (Decentralized Identifer) acts as a unique identifier and refers to a DID document, which contains the information about an identity. VCs are then used to store and represent machine-readable credentials that are tied to that cryptographic identity.</p>
              </div>
              <div className='verifiable-credentials-right'>
                <img src="vc.webp" alt="" />
              </div>
            </div>
            <div className='verification'>
              <div className="verification-left">
                <h1>Blockchain Based Verification and Authentication</h1>
                <p>Atechnology solution that leverages blockchain technology to provide a secure and tamper-proof method for verifying and authenticating various types of digital information, transactions, identities, or credentials. In traditional systems, trust often relies on centralized authorities, which can lead to vulnerabilities and issues related to privacy and security. However, a blockchain-based approach offers a decentralized and transparent alternative.<br /><br />
                  By utilizing blockchain technology, a Blockchain-Based Verification and Authentication System provides a robust, secure, and efficient way to establish trust in digital interactions, ensuring data integrity and reducing reliance on central authorities.
                </p>
              </div>
              <div className="verification-right">
                <img src="verification.webp" alt="" />
              </div>
            </div>
            <div className='did'>
              <div className='did-left'>
                <img src="did.webp" alt="" />
              </div>
              <div className='did-right'>
                <h1>Decentralized Identities</h1>
                <p>In the simplest terms, it is a digital representation of an entity/individual/device. However, unlike typical identifiers (passports, driving licenses, etc.) Decentralized IDs leverage verifiable credentials (VC) and blockchain to create digital identities that users have control over and can use to log into various systems without exposing their data to online risks.

                  By design, decentralized identities eliminate dependence on intermediaries (centralized registries, identity providers, or certificate authorities) and protect against identity and data theft.</p>
              </div>
            </div>
          </div>
        </LoggedInMenuLayout>
      <FooterLayout></FooterLayout>
    </>
  )
}

export default Welcome
