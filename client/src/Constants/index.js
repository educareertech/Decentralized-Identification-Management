// export const ACCESS_MANAGEMENT_ADDRESS = '0x983591D5Da45d79723b151AF61f64b0C79310233'; // sepolia
// export const VC_CONTRACT_ADDRESS = '0x69d9b4ADaDC1DaaB3df042D382f304d4425f28BD'; // sepolia

// LocalHost
export const ACCESS_MANAGEMENT_ADDRESS = '0xfBECbd548B8BdA886BA45cA496C89C9227a51d4F'; // Local Host
export const VC_CONTRACT_ADDRESS = '0xB40a90fdB0163cA5C82D1959dB7e56B50A0dC016'; // Local Host

export const ACCESS_MANAGEMENT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "did",
                "type": "bytes32"
            }
        ],
        "name": "IdentityRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "did",
                "type": "bytes32"
            }
        ],
        "name": "userInfoUpdated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            }
        ],
        "name": "allowAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            }
        ],
        "name": "getAllowedDids",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "ownerDid",
                "type": "bytes32"
            }
        ],
        "name": "getAllowedInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "nationality",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "birthdate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "gmail",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Identity.DidDocument",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "userDid",
                "type": "bytes32"
            }
        ],
        "name": "getDidDocument",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "nationality",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "birthdate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "gmail",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Identity.DidDocument",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getUserDid",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "identities",
        "outputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "nationality",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "birthdate",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "gmail",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_userDid",
                "type": "bytes32"
            }
        ],
        "name": "isDidRegistered",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "ownerToDid",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "gmail",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_birthdate",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "nationality",
                "type": "string"
            }
        ],
        "name": "registerUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            }
        ],
        "name": "revokeAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_did",
                "type": "bytes32"
            }
        ],
        "name": "revokeDid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "revokeDidByIndex",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_did",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "gmail",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_birthdate",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "nationality",
                "type": "string"
            }
        ],
        "name": "updateUserInfo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_userDid",
                "type": "bytes32"
            }
        ],
        "name": "verifyLogin",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
export const VC_ABI =   [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_didContractAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "credentialId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            }
        ],
        "name": "CredentialIssued",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "credentialId",
                "type": "bytes32"
            }
        ],
        "name": "CredentialRevoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "schemaID",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "string",
                "name": "schemaName",
                "type": "string"
            }
        ],
        "name": "CredentialSchemaCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "schemaId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            }
        ],
        "name": "FieldsAllowed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "IdentityUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "OwnerUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "userDid",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "providerId",
                "type": "bytes32"
            }
        ],
        "name": "ProviderCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "_subjectDid",
                "type": "bytes32"
            }
        ],
        "name": "allowedFieldsRevoked",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "CredentialSchemas",
        "outputs": [
            {
                "internalType": "string",
                "name": "schemaName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "schemaID",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "IdentityContract",
        "outputs": [
            {
                "internalType": "contract Identity",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "providerId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_schemaId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_schemaName",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_attributes",
                "type": "string[]"
            }
        ],
        "name": "addCredentialSchema",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "schemaId",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "_subjectDid",
                "type": "bytes32"
            },
            {
                "internalType": "string[]",
                "name": "claimValues",
                "type": "string[]"
            }
        ],
        "name": "allowFields",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "userDid",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "profile",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "desc",
                "type": "string"
            }
        ],
        "name": "becomeProvider",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "credentials",
        "outputs": [
            {
                "internalType": "string",
                "name": "schemaName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "schemaId",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "providerId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "issuanceDate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "expirationDate",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isRevoked",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "ownerDid",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "schemaId",
                "type": "uint256"
            }
        ],
        "name": "getAllowedClaimsDids",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "schemaId",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "_ownerDid",
                "type": "bytes32"
            }
        ],
        "name": "getAllowedFields",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_credentialId",
                "type": "bytes32"
            }
        ],
        "name": "getCredential",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_providerId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "schemaId",
                "type": "uint256"
            }
        ],
        "name": "getIssuedCredentialsIds",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_userDid",
                "type": "bytes32"
            }
        ],
        "name": "getProviderIds",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_providerId",
                "type": "bytes32"
            }
        ],
        "name": "getProviderProfiles",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "providerId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "string",
                        "name": "profile",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "desciption",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "registered",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Verifiable_Credential.Provider[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_providerId",
                "type": "bytes32"
            }
        ],
        "name": "getRegisteredSchemas",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "schemaName",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "schemaID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "attributes",
                        "type": "string[]"
                    }
                ],
                "internalType": "struct Verifiable_Credential.CredentialSchema[]",
                "name": "result",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_userDid",
                "type": "bytes32"
            }
        ],
        "name": "getUserCredentialIds",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "providerId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_schemaId",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "_subjectDid",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_expirationDate",
                "type": "uint256"
            },
            {
                "internalType": "string[]",
                "name": "_claimValues",
                "type": "string[]"
            }
        ],
        "name": "issueCredential",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "issuerCredentials",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "providerIdToProvider",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "providerId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "profile",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "desciption",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "registered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "providerIds",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "providerToSchema",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_subjectDid",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "schemaId",
                "type": "uint256"
            }
        ],
        "name": "revokeAllowedFields",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_subjectDid",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "schemaId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "revokeAllowedFieldsByIndex",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "schemaId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "revokeCredentialByIndex",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_credentialId",
                "type": "bytes32"
            }
        ],
        "name": "rovokeCredentialById",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "schemaCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_contractAddrr",
                "type": "address"
            }
        ],
        "name": "updateIdentityContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_ownerAddr",
                "type": "address"
            }
        ],
        "name": "updateOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "userVCs",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]