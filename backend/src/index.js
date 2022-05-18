import express from 'express';
import { PORT } from './constants.js';
import fcl from '@onflow/fcl';
import * as t from "@onflow/types"
import { KmsAuthorizer } from 'fcl-kms-authorizer';
import { KmsAuthorizerSigner } from './utils/authorizer.cjs';
import bodyParser from 'body-parser';
import AWS from 'aws-sdk';
import './config.js'

import privatizeEndpoint from './utils/privatizeEndpoint.js';

/** Service initialization */
const app = express()


// Use the middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const region = 'REGION';
const keyIdF = 'KEY_ID_1';
const addressF = 'ADDRESS_1';
const keyIndex = 0;

  const authorizerF = new KmsAuthorizer({ 
    credentials: new AWS.Credentials(
      "KEY",
      "PRIVATE"
            ),
    
    region }, keyIdF);


      const authorizerSignerF = new KmsAuthorizerSigner({ 
        credentials: new AWS.Credentials(
          "KEY",
          "PRIVATE"
                ),
        
        region }, keyIdF);


  const authorizationF = authorizerF.authorize(addressF, keyIndex);

  const authorizationSignerF = authorizerSignerF.authorize(addressF);

app.use(bodyParser.json());


app.get('/post-tester', async (req, res) => {
  for (var number = 10; number < 12; number++ ) {
  const RecipientTest = "RECIPIENT_ADDRESS";
  const NftTransfer = `
import NonFungibleToken from FT_ADDRESS
import NFT from NFT_ADDRESS

transaction(recipientAddress: Address, withdrawID: UInt64) {

  // local variable for storing the transferred token
  let transferToken: @NonFungibleToken.NFT
  
  prepare(acct: AuthAccount) {

      // borrow a reference to the owner's collection
      let collectionRef = acct.borrow<&NFT.Collection>(from: /storage/ItemCollection)
          ?? panic("Could not borrow a reference to the stored Item collection")
      
      // withdraw the NFT
      self.transferToken <- collectionRef.withdraw(withdrawID: withdrawID)
  }

  execute {
      
      // get the recipient's public account object
      let recipient = getAccount(recipientAddress)

      // get the Collection reference for the receiver
      let receiverRef = recipient.getCapability(/public/ItemCollection).borrow<&{NFT.ItemCollectionPublic}>()!

      // deposit the NFT in the receivers collection
      receiverRef.deposit(token: <-self.transferToken)
  }
}
`

try {
  const response3 = await fcl.send([
    fcl.transaction(NftTransfer),
    fcl.args([
      fcl.arg(RecipientTest, t.Address),
      fcl.arg(number, t.UInt64),
      ]),
    fcl.proposer(authorizationSignerF),
    fcl.authorizations([authorizationF]),
    fcl.payer(authorizationF),
    fcl.limit(9999),
  ])
  const initResponse3 = await fcl.decode(response3);
  //console.log(initResponse3)

} catch (error) {
  console.error(error);
  console.log("Transaction failed")
}
  }
})


app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}...`);
})