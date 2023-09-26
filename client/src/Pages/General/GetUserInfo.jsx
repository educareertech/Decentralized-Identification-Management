import React, { useState } from 'react'
import FooterLayout from '../../Components/FooterLayout'
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout'
import { ContextState } from '../../Context/useContext'
import { BigNumber } from 'ethers';

function GetUserInfo() {
    const { accessManagementContract } = ContextState();

    const [ownerDid, setOwnerDid] = useState();
    const [userInfo, setUserInfo] = useState();
    const [birthday, setBirthday] = useState();

    const [errorMessage, setErrorMessage] = useState();

    const parseDate = async (hex) => {
        const bigNoTime = BigNumber.from(hex);
    
        const timeMiliSeconds = bigNoTime.mul(1000).toNumber();
        const date = new Date(timeMiliSeconds);
        const options = { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric'
      };
        const formated = date.toLocaleDateString('en-US', options);
        console.log(formated);
        return formated;
      }

    const getUserInfo = async (e) => {
        e.preventDefault();
        const contract = await accessManagementContract(true);
        try {
            const result = await contract.getAllowedInfo(ownerDid);
            setUserInfo(result);
            console.log("HexBirthDate", result.birthdate);
            const birthdate = await parseDate(result.birthdate);
            console.log(birthdate);
            setBirthday(birthdate);
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
                                <label htmlFor="" className='form-label'>User DID</label>
                                <input onChange={(e) => setOwnerDid(e.target.value)} className='form-control' type="text" />
                            </div>
                            <button onClick={getUserInfo}>Access Info</button>
                        </form>
                    </div>
                    <div className="getUserInfo-right">
                        {userInfo ?
                            <table className='table table-striped'>
                                <tr>
                                    <th>Name</th>
                                    <td>{userInfo.name}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{userInfo.userAddress}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{userInfo.gmail}</td>
                                </tr>
                                <tr>
                                    <th>Birthdate</th>
                                    <td>{birthday}</td>
                                </tr>
                            </table>
                            :
                            <h1>{errorMessage}</h1>
                        }
                    </div>
                </div>
            </LoggedInMenuLayout>
            <FooterLayout></FooterLayout>
        </>
    )
}

export default GetUserInfo
