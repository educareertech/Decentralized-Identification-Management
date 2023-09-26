import React, { useEffect, useState } from 'react'
import FooterLayout from '../../Components/FooterLayout'
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout'
import { useParams } from 'react-router-dom'
import { ContextState } from '../../Context/useContext'

function ProviderDetail() {
    const params = useParams();
    const { VC_Contract } = ContextState();
    const [providerDetail, setProviderDetail] = useState();

    const getProviderDetail = async () => {
        const contract = await VC_Contract();
        try {
            const result = await contract.getProviderProfiles(params.providerId);
            setProviderDetail(result);
        } catch (error) {
            console.log(error);
        }
    }

    const copyProviderId = (e, providerId)=>{
        e.preventDefault()
        let id = providerId;
        navigator.clipboard.writeText(id);
    }

   

    useEffect(() => {
        const fetch = async () => {
            await getProviderDetail();
        }
        fetch();
    }, [])

    return (
        <div>
                <LoggedInMenuLayout>
                    <div className='ProviderProfile'>
                        <h2>Provider Profiles</h2>
                        <table className='table table-striped'>
                            <thead>
                                <th>Provider Name</th>
                                <th>Provider Id</th>
                                <th>Description</th>
                            </thead>
                            <tbody>
                                {providerDetail &&
                                    providerDetail?.map((item) => (
                                        <tr>
                                            <td>{item.profile}</td>
                                            <td className='tdProviderAddress' onClick={(e) => copyProviderId(e, item.providerId)}>{item.providerId.slice(0, 5) + "......" + item.providerId.slice(-5)}
                                                <span id='CopyToolTip'>Copy</span>
                                            </td>
                                            <td>{item.desciption}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </LoggedInMenuLayout>
            <FooterLayout></FooterLayout>
        </div>
    )
}

export default ProviderDetail;
