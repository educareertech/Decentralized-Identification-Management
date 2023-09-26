import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ContextState } from '../../Context/useContext';
import FooterLayout from '../../Components/FooterLayout';
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader';


function ProviderProfile() {
    const { VC_Contract } = ContextState();
    const navigate = useNavigate();

    const [profileName, setProfileName] = useState();
    const [providerDescription, setProviderDescription] = useState();
    const [profileDetail, setProfileDetail] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const closeModal = () => {
        setIsOpen(false);
    }

    const switchProfile = async (providerId, profileName) => {
        sessionStorage.setItem('providerId', providerId);
        sessionStorage.setItem('profileName', profileName)
        navigate('/welcome');
    }

    const getProviderProfile = async () => {
        const contract = await VC_Contract(true);
        const did = sessionStorage.getItem('userDid');
        try {
            const providerIds = await contract.getProviderIds(did);
            console.log(providerIds);

            let profiles = [];
            const promises = providerIds.map(async (item)=>{
                const profile = await contract.getProviderProfiles(item);
                // profile
                console.log(profile[0]);
                profiles.push(profile[0]);
                return { profiles }
            })
            const fetched = await Promise.all(promises);
            console.log("Fetched Data", fetched[0].profiles);
            setProfileDetail(fetched[0].profiles);
        } catch (error) {
            console.log(error)
        }
    }

    const copyProviderId = (e, providerId)=>{
        e.preventDefault()
        let id = providerId;
        navigator.clipboard.writeText(id);
    }

    const createProfile = async (e) => {
        e.preventDefault();
        const contract = await VC_Contract(true);
        const userDid = sessionStorage.getItem('userDid');
        try {
            const tx = await contract.becomeProvider(userDid, profileName, providerDescription);
            setIsLoading(true);
            await tx.wait();
            setIsLoading(false);
            setIsOpen(false);
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await getProviderProfile();
        }
        fetch();
    }, [])

    return (
        <>
                <LoggedInMenuLayout>
                    <div className='ProviderProfile'>
                        <h2>Provider Profile</h2>
                        <button onClick={() => setIsOpen(true)} className='createCredentialBtn'>Create New Profile</button>


                        <table className='table table-striped'>
                            <thead>
                                <th>Provider Name</th>
                                <th>Provider Id</th>
                                <th>Description</th>
                            </thead>
                            <tbody>
                                {profileDetail &&
                                    profileDetail?.map((item) => (
                                        <tr>
                                            <td>{item.profile}</td>
                                            <td className='tdProviderAddress' onClick={(e)=>copyProviderId(e, item.providerId)}>{item.providerId.slice(0,5) + "......" + item.providerId.slice(-5)}
                                                <span id='CopyToolTip'>Copy</span>
                                            </td>
                                            <td>{item.desciption}</td>
                                            <button onClick={() => switchProfile(item.providerId, item.profile)}>Switch</button>
                                        </tr>
                                ))
                                }
                            </tbody>

                        </table>

                    </div>



                    <Modal className='PromptModal' isOpen={isOpen} onRequestClose={closeModal}>
                        <div className='PromptModal-inner'>
                           {isLoading ?
                            <Loader color={"white"}></Loader>
                           :
                            <form action="">
                                <div>
                                    <label htmlFor="" className='form-label'>Profile/Name</label>
                                    <input onChange={(e) => setProfileName(e.target.value)} className='form-control' type="text" />
                                </div>
                                <div>
                                    <label htmlFor="" className='form-label'>Provider Detail</label>
                                    <textarea onChange={(e) => setProviderDescription(e.target.value)} className='form-control' type="text" />
                                </div>
                                <div className='mt-4'>
                                    <button type="text" onClick={createProfile}>Submit</button>
                                </div>
                            </form>
                            }
                        </div>
                    </Modal>


                </LoggedInMenuLayout>

            <FooterLayout />
        </>
    )
}

export default ProviderProfile;
