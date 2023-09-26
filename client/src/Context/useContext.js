import { useState, createContext, useContext, useEffect } from "react";
import { providers, Contract } from "ethers";
import Web3Modal from 'web3modal';

// -----BLOCKCHAIN SETUP------
import { ACCESS_MANAGEMENT_ADDRESS, ACCESS_MANAGEMENT_ABI, VC_CONTRACT_ADDRESS, VC_ABI } from "../Constants";

const context = createContext();




const AppContext = (props) => {
    const [isLoading, setIsLoading] = useState(false);


    // -------GET PROVIDER/SIGNER--------
    const getProviderOrSigner = async (needSigner = false) => {
        try {
            const web3modal = new Web3Modal();
            const provider = await web3modal.connect();
            const web3Provider = new providers.Web3Provider(provider);

            const signer = web3Provider.getSigner();
            const address = await signer.getAddress();
            localStorage.setItem('userAddress', address);

            if (needSigner) {
                return signer;
            }
            return web3Provider;
        } catch (error) {
            console.log("Error: GetProviderOrSigner", error.message);
        }
    }
    //--------GET CONTRACT INSTANCE------
    const accessManagementContract = async (needSigner) => {
        try {
            const signer = await getProviderOrSigner(needSigner);
            const contract = new Contract(ACCESS_MANAGEMENT_ADDRESS, ACCESS_MANAGEMENT_ABI, signer, getProviderOrSigner);
            return contract;
        } catch (error) {
            console.log("Error Fetchin Account Contract:", error.message);
        }
    }

    const VC_Contract = async (needSigner = false) => {
        try {
            const signer = await getProviderOrSigner(needSigner);
            const contract = new Contract(VC_CONTRACT_ADDRESS, VC_ABI, signer);
            return contract;
        } catch (error) {
            console.log("Error Fetchin Account Contract:", error.message);
        }
    }


    return (
        <context.Provider value={{ accessManagementContract, getProviderOrSigner, VC_Contract, isLoading, setIsLoading }}>
            {props.children}
        </context.Provider>
    )
}

export const ContextState = () => {
    return useContext(context);
}

export default AppContext;