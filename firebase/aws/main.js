import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { KMSClient, CancelKeyDeletionCommand, EncryptCommand } from '@aws-sdk/client-kms';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';

const region = 'ap-northeast-2';
const identityPoolId = 'ap-northeast-2:2c82c2a8-55f4-4901-8c9b-426d0046fa30';
const kmsKeyId = 'bdc99514-3664-42a1-a44d-a38966c81e3e';

export class BorreAWS {
	constructor(accessToken) {
        console.log("before create kmsclient");
        const client = new CognitoIdentityClient({region});
        console.log("client is ", client);
        console.log(accessToken);
		this.kmsClient = new KMSClient({
            region,
            credentials: fromCognitoIdentityPool({
                clientConfig: { region },
                client,

                identityPoolId,
                logins: { 
                    "securetoken.google.com/borre-auth-test": accessToken
                }
            })
        });
        console.log("after create kmsclient");
	}

	login() {}

	encrypt(message) {
        console.log("call encrypt");
		const text = new TextEncoder().encode(message);
		const encryptCommand = new EncryptCommand({
			KeyId: kmsKeyId,
			PlainText: text
		});
		return this.kmsClient.send(encryptCommand);
	}
}

window.borre = {
	BorreAWS
};
