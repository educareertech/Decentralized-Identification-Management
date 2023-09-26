import React, { useEffect, useState } from 'react'
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout';
import FooterLayout from '../../Components/FooterLayout'
import { ContextState } from '../../Context/useContext'
import { useParams } from 'react-router-dom';

function IssuedCredential() {
    const { VC_Contract } = ContextState();
    const param = useParams();

    console.log(param.schemaId);

    const [subjectDids, setSubjectDids] = useState([]);

    const getIssuedCredentials = async () => {
        const contract = await VC_Contract();
        const providerId = sessionStorage.getItem('providerId');
        try {
            const result = await contract.getIssuedCredentialsIds(providerId, param.schemaId);
            setSubjectDids(result)
            console.log(result);
        } catch (error) {

        }
    }

    const revokeCredential = async (e, subjectDid, index) => {
        e.preventDefault();
        const contract = await VC_Contract(true);
        try {
            const tx = await contract.revokeCredentialByIndex(subjectDid, param.schemaId, index);
            await tx.wait();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await getIssuedCredentials();
        }
        fetch();
    }, [])
    return (
        <>
            <LoggedInMenuLayout>
                <div className='IssuedCredentials'>
                    <h2>Issued Credentials</h2>
                    {subjectDids != '' ?
                        <table className='table table-striped'>
                            <thead>
                                <th>Subject Did</th>
                            </thead>
                            <tbody>
                                {
                                    subjectDids?.map((item, index) => (
                                        <tr>
                                            <td>
                                                {item.slice(0, 5) + "..." + item.slice(-5)}
                                            </td>
                                            <td>
                                                <button onClick={(e) => revokeCredential(e, item, index)}>Revoke</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <h3 style={{ marginTop: "10vw" }}>No Issued Credentials</h3>
                    }
                </div>
            </LoggedInMenuLayout>
            <FooterLayout></FooterLayout>
        </>
    )
}

export default IssuedCredential
