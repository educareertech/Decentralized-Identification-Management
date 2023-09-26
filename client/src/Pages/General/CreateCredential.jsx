import React, { useState } from 'react';
import Modal from 'react-modal';
import { ContextState } from '../../Context/useContext';
import FooterLayout from '../../Components/FooterLayout';
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader';


function CreateCredential() {
    const { VC_Contract } = ContextState();
    const navigate = useNavigate();

    const [schemaId, setSchemaId] = useState();
    const [credentialName, setcredentialName] = useState();
    const [credentialAttributes, setCredentialAttributes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleAttributes = async (e) => {
        e.preventDefault();
        const inputValues = e.target.value.split(',').map((value) => value.trim());
        const nonEmptyValues = inputValues.filter((value) => value !== '');
        setCredentialAttributes(nonEmptyValues);
    }

    const createNewCredential = async (e) => {
        e.preventDefault();
        const contract = await VC_Contract(true);
        const providerId = sessionStorage.getItem('providerId');
        try {
            const tx = await contract.addCredentialSchema(providerId, schemaId.toString(16), credentialName, credentialAttributes);
            setIsLoading(true);
            const receipt = await tx.wait();
            setIsLoading(false);
            const { schemaName, schemaID } = receipt.events[0].args;
            console.log("SchemaID", schemaID, "schemaName", schemaName);
            setSchemaId('');
            setIsOpen(true);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <LoggedInMenuLayout>
                <div className='createNewCredential'>
                    <h2>New Credential</h2>
                    {isLoading ?
                    <Loader color={"white"}></Loader>
                    :
                        <form action="">
                            <div>
                                <label htmlFor="" className='form-label'>Credential Id</label>
                                <input onChange={(e) => setSchemaId(e.target.value)} className='form-control' type="text" />
                            </div>
                            <div>
                                <label htmlFor="" className='form-label'>Credential Name</label>
                                <input onChange={(e) => setcredentialName(e.target.value)} className='form-control' type="text" />
                            </div>
                            <div>
                                <label htmlFor="" className='form-label'>Credential Attributes</label>
                                <input onChange={handleAttributes} className='form-control' />
                            </div>
                            <div className='mt-4'>
                                <button type="text" onClick={createNewCredential}>Submit</button>
                            </div>
                        </form>
                    }
                </div>



                <Modal className='PromptModal' isOpen={isOpen} onRequestClose={closeModal}>
                    <div className='PromptModal-inner'>
                        <h3>Credential Created Successfully</h3>
                        <button className='mr-4' onClick={() => navigate("/Credentials")}>Close</button>
                    </div>
                </Modal>
            </LoggedInMenuLayout>

            <FooterLayout />
        </>
    )
}

export default CreateCredential
