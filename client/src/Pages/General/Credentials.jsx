import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import FooterLayout from '../../Components/FooterLayout';
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout';
import { ContextState } from '../../Context/useContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader';

function Credentials() {
    const { VC_Contract } = ContextState();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState();
    const [schemaId, setSchemaId] = useState();
    const [subjectDid, setSubjectDid] = useState();
    const [expiryDate, setExpiryDate] = useState();
    const [claimValues, setClaimValues] = useState([]);
    const [attributes, setAttributes] = useState([]);


    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = async (attributes, schemaId) => {
        setSchemaId(schemaId);
        setAttributes(attributes);
        setIsOpen(true);
    }

    const getRegisteredSchemas = async () => {
        const contract = await VC_Contract(true);
        const providerId = sessionStorage.getItem('providerId');
        try {
            const result = await contract.getRegisteredSchemas(providerId);
            console.log(result)
            setCredentials(result);
        } catch (error) {
            console.log(error);
        }
    }



    const handleClaimValues = async (e, index) => {
        e.preventDefault();
        const newValue = e.target.value;

        setClaimValues(prevState => {
            const updatedArray = [...prevState];
            updatedArray[index] = newValue;
            return updatedArray;
        });
    }


    const dateToHexTimestamp = async (dateString) => {
        const date = new Date(dateString);
        const timeStampInSeconds = Math.floor(date.getTime() / 1000);
        return '0x' + timeStampInSeconds.toString(16);
    }

    const issueCredential = async (e) => {
        e.preventDefault();
        const contract = await VC_Contract(true);
        const date = await dateToHexTimestamp(expiryDate);
        const providerId = sessionStorage.getItem('providerId');
        try {
            console.log(date);
            const tx = await contract.issueCredential(providerId, schemaId, subjectDid, date, claimValues)
            setIsLoading(true);
            const receipt = await tx.wait();
            const issuedId = receipt.events[0].args.subjectDid;
            setIsLoading(false);
            console.log(issuedId);
            setIsOpen(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await getRegisteredSchemas();
        }
        fetch();
    }, [])
    return (
        <>
                <LoggedInMenuLayout>
                    <div className="Credentials">
                        <h2>Credentials</h2>
                        <button onClick={() => navigate('/CreateCredential')} className='createCredentialBtn'>Create New Credential</button>
                        {credentials &&
                            credentials?.map((item) => (
                                <table className='table table-striped'>
                                    <>
                                        <tr>
                                            <th>Schema ID</th>
                                            <td>{item.schemaID.toNumber()}</td>
                                        </tr>
                                        <tr>
                                            <th>Schema Name</th>
                                            <td>{item.schemaName}</td>
                                        </tr>
                                        <tr>
                                            <th>Attributes</th>
                                            <td>
                                                {
                                                    item.attributes.map((attr) => (
                                                        <tr>{attr}</tr>
                                                    ))
                                                }
                                            </td>
                                        </tr>

                                    </>
                                    <button onClick={() => openModal(item.attributes, item.schemaID)}>Issue Credential</button>
                                    <button onClick={() => navigate(`/IssuedCredentials/${item.schemaID.toNumber()}`)}>View Issued Credentails</button>
                                </table>
                            ))
                        }
                    </div>

                    <Modal className='RegisteredModal' isOpen={isOpen} onRequestClose={closeModal}>
                        <div className='IssueCredentialModal-inner'>
                            {
                              isLoading ?
                                <Loader color={"white"}></Loader>
                              :
                              <>
                            <form action="">
                                <div>
                                    <div>
                                        <label htmlFor="" className='form-label'>Subject Did</label>
                                        <input onChange={(e) => setSubjectDid(e.target.value)} className='form-control' type="text" />
                                    </div>
                                    <div>
                                        <label htmlFor="" className='form-label'>Expiration Data</label>
                                        <input onChange={(e) => setExpiryDate(e.target.value)} className='form-control' type="date" />
                                    </div>

                                </div>
                                <div>
                                    {attributes &&
                                        attributes?.map((item, index) => (
                                            <div>
                                                <label htmlFor="" className='form-label'>Enter {item}</label>
                                                <input onChange={(e) => handleClaimValues(e, index)} className='form-control' />
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* <div className='mt-4'>
                                            <button type="text" onClick={issueCredential}>Submit</button>
                                        </div> */}
                            </form>
                            <div className='issueCredBtnGroup'>
                                <button className='mr-4' onClick={()=> setIsOpen(false)}>Close</button>
                                <button onClick={(e)=> issueCredential(e)}>Issue</button>
                            </div>
                            </>
                            }
                        </div>
                    </Modal>
                </LoggedInMenuLayout>
            <FooterLayout />
        </>
    )
}

export default Credentials
