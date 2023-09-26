import React, { useState } from 'react'
import FooterLayout from '../../Components/FooterLayout';
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout';
import { ContextState } from '../../Context/useContext';
import { useNavigate } from 'react-router-dom';

function GetCredentialInfo() {
    const { VC_Contract } = ContextState();
    const navigate = useNavigate();

    const [allowedSchemaId, setAllowedSchemaId] = useState();
    const [allowedByDid, setAllowedByDid] = useState();
    const [allowedAttributes, setAllowedAttributes] = useState();
    const [allowedValues, setAllowedValues] = useState();
    const [providerId, setProviderId] = useState();

    const [errorMessage, setErrorMessage] = useState();

    const getCredentialInfo = async (e) => {
        e.preventDefault();
        const contract = await VC_Contract(true);
        console.log(allowedByDid);
        console.log(allowedSchemaId);
        console.log(contract);
        try {
            const [allowedClaimValues, allowedClaimKeys, providerId] = await contract.getAllowedFields(allowedSchemaId, allowedByDid);
            setProviderId(providerId);
            setAllowedAttributes(allowedClaimKeys);
            setAllowedValues(allowedClaimValues);
            console.log(allowedClaimKeys)
            console.log(allowedClaimValues)
        } catch (error) {
            console.log(error);
            setErrorMessage("You Are Not Allowed to Access")
        }
    }


    return (
        <>
            <LoggedInMenuLayout>
                <div className='getUserInfo'>
                    <div className="getUserInfo-left">
                        <form action="">
                            <div>
                                <label htmlFor="" className='form-label'>Schema Id</label>
                                <input onChange={(e) => setAllowedSchemaId(e.target.value)} className='form-control' type="text" />
                            </div>
                            <div>
                                <label htmlFor="" className='form-label'>Owner Did</label>
                                <input onChange={(e) => setAllowedByDid(e.target.value)} className='form-control' />
                            </div>
                            <div className='mt-4'>
                                <button onClick={(e) => getCredentialInfo(e)} type="text" >Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="getCredentialInfo-right">
                        {allowedAttributes ?
                            <table className='table getCredentialInfo-table '>
                                <thead>
                                    <tr>
                                        <tr className='d-flex align-items-center justify-content-around'>
                                            <th>Keys</th>
                                            <th>Values</th>
                                        </tr>
                                    </tr>
                                </thead>
                                <tbody style={{ alignItems: 'center' }}>
                                    <tr>
                                        <tr className='d-flex align-items-center justify-content-around'>
                                            <td>
                                                {
                                                    allowedAttributes?.map((item) => (
                                                        <tr><th>{item}</th></tr>
                                                    ))
                                                }
                                            </td>
                                            <td>
                                                {
                                                    allowedValues?.map((item) => (
                                                        <tr><td>{item}</td></tr>
                                                    ))
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><td>Provider Id</td></th>
                                            <tr style={{cursor:'pointer'}} onClick={()=> navigate(`/ProviderDetail/${providerId}`)}><td>{providerId && providerId.slice(0, 7) + "...." + providerId.slice(-7)}</td></tr>
                                        </tr>
                                    </tr>

                                </tbody>
                            </table>
                            : <h1>{errorMessage}</h1>
                        }
                    </div>
                </div>
            </LoggedInMenuLayout>
            <FooterLayout></FooterLayout>
        </>
    )
}

export default GetCredentialInfo;