import React, { useEffect, useState } from 'react'
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout'
import { ContextState } from '../../Context/useContext'
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Loader';

function CredentialAccess() {
    const { VC_Contract } = ContextState();
    const params = useParams();

    const [allowedDids, setAllowedDids] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const getCredentialAccess = async () => {
        const contract = await VC_Contract();
        const userDid = sessionStorage.getItem('userDid');
        try {
            const result = await contract.getAllowedClaimsDids(userDid, params.schemaId);
            console.log(result);
            setAllowedDids(result)
        } catch (error) {
            console.log(error);
        }
    }

    // Revoke Access 
    const revokeAccess = async (e, subjectDid, index) => {
        const contract = await VC_Contract(true);
        try {
            const tx = await contract.revokeAllowedFieldsByIndex(subjectDid, params.schemaId, index);
            setIsLoading(true);
            await tx.wait();
            setIsLoading(false);    
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await getCredentialAccess();
        }
        fetch();
    }, [])


    return (
        <LoggedInMenuLayout>
            <div className='IssuedCredentials'>
                <h2>Credential Access</h2>
                {isLoading ?
                    <Loader color={"#102B7B"}></Loader>
                    :
                    allowedDids != '' ?
                        <table className='table table-striped'>
                            <thead>
                                <th>Subject Did</th>
                            </thead>
                            <tbody>
                                {
                                    allowedDids?.map((item, index) => (
                                        <tr>
                                            <td>
                                                {item.slice(0, 5) + "..." + item.slice(-5)}
                                            </td>
                                            <td>
                                                <button onClick={(e) => revokeAccess(e, item, index)}>Revoke</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <h3 style={{ marginTop: "10vw" }}>No access given</h3>
                }
            </div>
        </LoggedInMenuLayout>
    )
}

export default CredentialAccess