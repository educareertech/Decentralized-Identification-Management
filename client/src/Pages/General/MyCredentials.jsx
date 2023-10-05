import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
import FooterLayout from '../../Components/FooterLayout';
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout';
import { ContextState } from '../../Context/useContext';
import { useNavigate } from 'react-router-dom';
import { BigNumber, utils } from 'ethers';
// import Loader from '../../Components/Loader';
import QRCodeGenerator from './QRGenerator';
import CertificateGenerator from './PDFGenerator';

function MyCredentials() {
  const { VC_Contract } = ContextState();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [revokeModalOpen, setRevokeModalOpen] = useState(false);

  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [allowedDid, setAllowedDid] = useState();
  // const [revokeDid, setRevokeDid] = useState();

  const [selectedCredentialId, setSelectedCredentialId] = useState();
  const [schemaId, setSchemaId] = useState();
  const [providerId, setProviderId] = useState()
  const [applicantName, setApplicantName] = useState();
  const [credentialName, setCredentialName] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [issuanceDate, setIssuanceDate] = useState();
  const [claimData, setClaimData] = useState();


  const [schemaNameArray, setSchemaNameArray] = useState();



  const closeModal = async () => {
    setIsOpen(false);
  }
  // const closeRevokeModal = async () => {
  //   setRevokeModalOpen(false);
  // }


  const handleButtonClick = async (e, item, expiryDate, issuanceDate, providerId, schemaId, applicant) => {
    setProviderId(providerId);
    const contract = await VC_Contract(true);
    setApplicantName(applicant);
    console.log(issuanceDate);
    try {
      setSelectedCredentialId(e);
      setSchemaId(schemaId);
      setCredentialName(item);
      setExpiryDate(expiryDate);
      setIssuanceDate(issuanceDate);
      console.log("E in Desired Funciton", e);
      const [claimValues, schemas] = await contract.getCredential(e);
      console.log(claimValues);
      console.log(schemas);

      // Make a single Object From Keys and Values
      const mergedObj = schemas.reduce((result, key, index) => {
        result[key] = claimValues[index];
        return result;
      }, {})
      setClaimData(JSON.stringify(mergedObj));
      console.log(mergedObj);
    } catch (error) {
      console.log(error);
    }
  }

  const parseDate = async (hex) => {
    const bigNoTime = BigNumber.from(hex);

    const timeMiliSeconds = bigNoTime.mul(1000).toNumber();
    const date = new Date(timeMiliSeconds);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const formated = date.toLocaleDateString('en-US', options);
    console.log(formated);
    return formated;
  }

  const getMyCertificates = async () => {
    const did = sessionStorage.getItem('userDid');
    const contract = await VC_Contract(true);
    console.log(did)
    const credentialIds = await contract.getUserCredentialIds(did);
    let _schemaArray = [];
    let _expiryDate = [];
    let _issuanceDate = [];
    let _schemaId = [];
    let _providerId = [];
    let _applicants = [];
    const promises = credentialIds.map(async (item) => {
      console.log("Item in Get Funciton", item);
      const VC = await contract.credentials(item);
      console.log("VC 2 Lac", VC);

      if (!VC.isRevoked) {
        // ------------------------
        const parsedIssueDate = await parseDate(VC.issuanceDate);
        console.log(parsedIssueDate);
        const parsedExpiryDate = await parseDate(VC.expirationDate)
        console.log(parsedExpiryDate);
        // ------------------------

        _applicants.push(VC.applicant);
        _providerId.push(VC.providerId);
        const schemaId = VC.schemaId.toNumber();
        _schemaId.push(schemaId);
        const schema = await contract.CredentialSchemas(schemaId);

        _issuanceDate.push(parsedIssueDate);
        _expiryDate.push(parsedExpiryDate);
        _schemaArray.push(schema[0]);
      }
      return { schemas: _schemaArray, credentialIds, _expiryDate, _issuanceDate, _schemaId, _providerId, _applicants };
    })

    const schemaArray = await Promise.all(promises);
    console.log(schemaArray.credentialIds)

    setSchemaNameArray(schemaArray[0]);

  }

  const presentCredential = async (e) => {
    e.preventDefault();
    const contract = await VC_Contract(true);
    console.log("selected Attributes", selectedAttributes)
    try {
      const tx = await contract.allowFields(schemaId, allowedDid, selectedAttributes);
      setIsLoading(true);
      await tx.wait();
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  }



  // const revokeClaimSharing = async (e) => {
  //   e.preventDefault();
  //   const contract = await VC_Contract(true);
  //   try {
  //     const tx = await contract.revokeAllowedFields(revokeDid);
  //     console.log(tx.hash);
  //     setRevokeModalOpen(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleCheckboxChange = async (item) => {
    console.log("Clicked")
    if (selectedAttributes.includes(item)) {
      setSelectedAttributes(selectedAttributes.filter(attribute => attribute !== item))
    } else {
      setSelectedAttributes([...selectedAttributes, item]);
    }
  }

  useEffect(() => {
    const fetch = async () => {
      await getMyCertificates();
    }
    fetch();
  }, [])


  return (
    <>
      <LoggedInMenuLayout>
        <div className='certificate'>
          <h2>My Credentials</h2>
          <div className='btns'>
            {schemaNameArray?.schemas && schemaNameArray.credentialIds &&
              schemaNameArray?.schemas?.map((item, index) => (
                <button className='credentialBtn' onClick={(e) => handleButtonClick(schemaNameArray.credentialIds[index], item, schemaNameArray._expiryDate[index], schemaNameArray._issuanceDate[index], schemaNameArray._providerId[index], schemaNameArray._schemaId[index], schemaNameArray._applicants[index])}>{item}</button>
              ))
            }
          </div>
          {schemaId && expiryDate &&
            <>
              {/* <table className='table certificate-table '>
                <thead>
                  <tr>
                    <th>Credential Name</th>
                    <th>Credential Id</th>
                    <th>Provider Id</th>
                    <th>Issue Date</th>
                    <th>Expiry Date</th>
                    <th>Credential Attributes</th>
                  </tr>
                </thead>
                <tbody style={{ alignItems: 'center' }}>
                  <tr>
                    <td>{credentialName}</td>
                    <td>{schemaId}</td>
                    <td style={{ cursor: "pointer" }} onClick={() => navigate(`/ProviderDetail/${providerId}`)}>{providerId.slice(0, 5) + "...." + providerId.slice(-5)}</td>
                    <td>Issue Date</td>
                    <td>{expiryDate}</td>
                    <tr >
                      <td className='attr-key-val'>
                        {
                          claimAttributes?.map((item) => (
                            <tr>{item}</tr>
                          ))
                        }
                      </td>
                      <td className='attr-key-val'>
                        {
                          claimValues?.map((item) => (
                            <tr>{item}</tr>
                          ))
                        }
                      </td>
                    </tr>
                  </tr>
                </tbody>
              </table>
              <div className='btns'>
                <button className='presentButton' onClick={(e) => navigate(`/CredentialAccess/${schemaId}`)}>Check Access</button>
                <button className='presentButton' onClick={(e) => setRevokeModalOpen(true)}>Revoke Sharing</button>
                <button className='presentButton' onClick={(e) => setIsOpen(true)}>Present</button>
              </div> */}
            </>
          }
        </div>



        {/* <Modal className="presentCredentialModal d-flex flex-column align-items-center justify-content-center  rounded" isOpen={isOpen} onRequestClose={closeModal}>
          <div className='w-100 presentCredentialModal-div'>
            {
              isLoading ?
                <Loader color={"white"}></Loader>
                :
                <form className='form' action="">
                  <div className="mb-3">
                    <label htmlFor="subjectDID" className='form-label'>Subject DID</label>
                    <input onChange={(e) => setAllowedDid(e.target.value)} className='form-control' type="text" id="subjectDID" />
                  </div>

                  {
                    claimAttributes?.map((item, index) => (
                      <div className="form-check" key={item}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item}
                          id={item}
                          checked={selectedAttributes.includes(item)}
                          onChange={() => handleCheckboxChange(item)}
                        />
                        <label className="form-check-label" htmlFor={item}>{item}</label>
                      </div>
                    ))

                  }
                  <div className='mt-4'>
                    <button onClick={presentCredential} type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </form>

            }
          </div>
        </Modal> */}


        {schemaId && expiryDate &&
          <>
            {/* <div className="certificateTemp">
              <h1>Certificate of Achievement</h1>
              <p>This is to certify that</p>
              <h2>{applicantName}</h2>
              <p>has successfully completed the certificate of</p>
              <h3>{credentialName}</h3>
              <div className="signature">
              <img src="signature.png" alt="Signature" />
            </div>
              <div className='QRDiv'>
                <p className="date">{issuanceDate}</p>
                <QRCodeGenerator data={claimData} />
              </div>
            </div> */}
            <CertificateGenerator data={{applicantName, credentialName, issuanceDate, claimData}}></CertificateGenerator>
          </>
          // <CertificateDownload data={{applicantName, credentialName, issuanceDate, claimData}} />
        }
      </LoggedInMenuLayout>
      <FooterLayout />
    </>
  )
}

export default MyCredentials
