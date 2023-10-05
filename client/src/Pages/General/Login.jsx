import React, { useState } from 'react';
import '../Style.css';
import { useNavigate } from 'react-router-dom';
import FormLoyout from '../../Components/FormLoyout';
import { ContextState } from '../../Context/useContext';
import { utils } from 'ethers';
import Loader from '../../Components/Loader';


function Login() {
  const navigate = useNavigate();
  const { accessManagementContract, getProviderOrSigner } = ContextState();

  const [did, setDid] = useState('');
  const [wrongCredential, setWrongCredential] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  
  const submitLoginForm = async (e) => {
    e.preventDefault();
    try {
      const contract = await accessManagementContract(true);
      const isVerified = await contract.verifyLogin(did);
      setIsLoading(true);
      if (isVerified) {
        sessionStorage.setItem('userDid', did);
        sessionStorage.setItem('providerId', '');
        setIsLoading(false);
        navigate('/welcome');
      } else {
        setWrongCredential(true);
      }

      console.log("Is it verified?", isVerified);
    } catch (error) {
      console.log("Error in Login: ", error);
      setWrongCredential(true);
    }
  }

  
  const renderDesc = () => {
    return <p style={{ color: 'red' }}>You Don't have Access</p>
  }

  const WelcomeNote = (
    <>
      <h2>Welcome</h2>
      <h5>To Trust in Motion</h5>
      <p className='mt-3'>Harnessing Web3 for Decentralized, Verifiable Identity and Credentials</p>
      <button onClick={() => navigate('/register')}>Register</button>
    </>
  )
  const form = (
    <>
      {isLoading ? 
      <Loader color={"#102B7B"}></Loader>
      :
      <>
      <div clas style={{display:'flex', flexDirection:'column'}} className='d-flex'>
        <p>{wrongCredential && renderDesc()}</p>
        <input style={{borderRadius:"10px", padding:".5vw 2vw", width:"20vw"}} name='name' onChange={(e) => setDid(e.target.value)} placeholder='Enter Your Did' />
      </div>
      <button onClick={submitLoginForm}>Login</button>
      </>
      }
    </>
  )


  return (
    <>
      <FormLoyout WelcomeNote={WelcomeNote} form={form} />
    </>

  )
}
export default Login