import React, { useState } from 'react'
import FooterLayout from '../../Components/FooterLayout'
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout'
import { ContextState } from '../../Context/useContext';

function IssueCredential() {
  
  const [schemaId, setSchemaId] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [subjectDid, setSubjectDid] = useState('');
  const [claimValues, setClaimValues] = useState([]);

  const {VC_Contract} = ContextState();

  const handleClaimValues = async (e) => {
    e.preventDefault();
    const inputValues = e.target.value.split(',').map((value) => value.trim());
    const nonEmptyValues = inputValues.filter((value) => value !== '');
    setClaimValues(nonEmptyValues);
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
    try {
      console.log(date);
      const tx = await contract.issueCredential(schemaId, subjectDid, date, claimValues)
      const receipt = await tx.wait();
      const issuedId = receipt.events[0].args.subjectDid;
      console.log(issuedId);
    } catch (error) {
      console.log(error.message);
    }
  }


    return (
        <>
                <LoggedInMenuLayout>
                    <div className='createNewCredential'>
                        <h2>Issue Credential</h2>
                        <form action="">
                            <div>
                                <label htmlFor="" className='form-label'>Credential Id</label>
                                <input onChange={(e) => setSchemaId(e.target.value)} className='form-control' type="text" />
                            </div>
                            <div>
                                <label htmlFor="" className='form-label'>Subject Did</label>
                                <input onChange={(e) => setSubjectDid(e.target.value)} className='form-control' type="text" />
                            </div>
                            <div>
                                <label htmlFor="" className='form-label'>Expiration Data</label>
                                <input onChange={(e) => setExpiryDate(e.target.value)} className='form-control' type="date" />
                            </div>
                            <div>
                                <label htmlFor="" className='form-label'>Claim Values</label>
                                <input onChange={handleClaimValues} className='form-control' />
                            </div>
                            <div className='mt-4'>
                                <button type="text" onClick={issueCredential}>Submit</button>
                            </div>
                        </form>
                    </div>
                </LoggedInMenuLayout>
            <FooterLayout />
        </>
    )
}

export default IssueCredential
