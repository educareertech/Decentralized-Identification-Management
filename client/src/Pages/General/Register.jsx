import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../Style.css'
import { ContextState } from '../../Context/useContext';
import FormLoyout from '../../Components/FormLoyout';
import Loader from '../../Components/Loader';

function Register() {
    const navigate = useNavigate();
    const { accessManagementContract } = ContextState();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [nationality, setNationality] = useState();
    const [dob, setDob] = useState();
    const [myDid, setMyDid] = useState();


    const closeModal = async () => {
        setIsOpen(false);
    }

    const copyDid = () => {
        let did = myDid;
        navigator.clipboard.writeText(did);
        navigate('/login');
    }

    const dateToHexTimestamp = async (dateString) => {
        const date = new Date(dateString);
        const timeStampInSeconds = Math.floor(date.getTime() / 1000);
        return '0x' + timeStampInSeconds.toString(16);
    }

    const submitSignUpForm = async (e) => {
        e.preventDefault();
        const date = await dateToHexTimestamp(dob);
        console.log("Hex Time While Registering", date);
        const contract = await accessManagementContract(true);
        try {
            const tx = await contract.registerUser(name, email, date, nationality);
            setIsLoading(true);
            const receipt = await tx.wait();
            const did = receipt.events[0].args.did;
            setIsLoading(false);
            console.log("Congratulations You got your did", did);
            setMyDid(did);
            setIsOpen(true);
        } catch (error) {
            console.log("Erroe Signup: ", error.message);
        }
    }


    const WelcomeNote = (
        <>
            <h2>Welcome</h2>
            <p className='mt-5'>To Trust in Motion  Harnessing Web3 for Decentralized, Verifiable Identity and Credentials</p>
            <button onClick={() => navigate('/login')}>Login</button>
        </>
    )
    const form = (
        <>
            {
                isLoading ?
                    <Loader color={"#102B7B"}></Loader>
                    :
                    <>
                        <form className='d-flex'>
                            <div className='d-flex flex-column'>
                                <input name='name' onChange={(e) => setName(e.target.value)} placeholder='Enter Your Full Name' />
                                <input name='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
                            </div><br />
                            <div className='d-flex flex-column ml-3'>
                                <input name='birthDate' onChange={(e) => setDob(e.target.value)} type='date' placeholder='Enter Your Date of Birth' />
                                <input name='nationality' onChange={(e) => setNationality(e.target.value)} placeholder='Enter Your Nationality' />
                            </div>
                        </form>
                        <button onClick={submitSignUpForm}>Register</button>
                    </>
            }

        </>
    )


    return (
        <>
            <FormLoyout WelcomeNote={WelcomeNote} form={form} />

            <Modal className='RegisteredModal' isOpen={isOpen} onRequestClose={closeModal}>
                <div className='RegisteredModal-inner'>
                    <div className='registeredModal-Desc'>
                        <h5 style={{ color: 'rgb(69, 240, 17)' }}>You Have Been Registered</h5>
                        <h5>Copy Your did and save it.</h5>
                        <h5>Now You can use our services by Logging-in by this Did</h5>
                        {myDid?.slice(0, 5) + '...' + myDid?.slice(-5)}
                    </div>
                    <div className='btnGroup' style={{ float: "right", marginRight: "1vw", position: "sticky" }}>
                        <button onClick={closeModal}>Close</button>
                        <button onClick={() => copyDid()}  >Copy</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default Register;