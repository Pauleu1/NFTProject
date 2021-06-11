import * as fcl from '@onflow/fcl';
import { KmsAuthorizer } from 'fcl-kms-authorizer';

const region = 'REGION';
const keyId = 'KEY-ID';
const apiUrl = 'http://localhost:8080';

fcl.config().put('accessNode.api', apiUrl);

const SignTransaction = () => {



  // Create an instance of the authorizer
  const authorizer = new KmsAuthorizer({ region }, keyId);
  //
  // * The first argument can be the same as the option for AWS client.
  //   Example:
  //     const authorizer = new KmsAuthorizer({
  //       credentials: new AWS.Credentials(
  //         <AWS_ACCESS_KEY_ID>,
  //         <AWS_SECRET_ACCESS_KEY>
  //       ),
  //       region
  //     }, keyId);

  // Sign and send transactions with KMS
  //

  // `address` and `keyIndex` obtained when the account was created.
  const address = 'AccountAddress';
  const keyIndex = 0;

  const authorization = authorizer.authorize(address, keyIndex);

  const SignThisTransaction = async () => {
  const response = await fcl.send([
    fcl.transaction`
      transaction {
        prepare(signer: AuthAccount) {
          log("Test transaction signed by fcl-kms-authorizer")
        }
      }
    `,
    fcl.args([]),
    fcl.proposer(authorization),
    fcl.authorizations([authorization]),
    fcl.payer(authorization),
    fcl.limit(9999),
  ]);

  await fcl.tx(response).onceSealed();

  console.log('Transaction Succeeded');
}




return (
    <button onClick={SignThisTransaction}></button>
     )



}

export default SignTransaction