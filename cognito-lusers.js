/**
 * Added this cli script to handle filtering on custom attributes on 
 * the users in the Cognito pool. This script currently output response 
 * in an output.json file at the current location.
 * 
 * Users can also be filtered based on particular attribute and it's value.
 */

 const fs = require("fs");
 const log = require('loglevel');
 const { program } = require('commander');
 const { CognitoIdentityProviderClient, ListUsersCommand } = require("@aws-sdk/client-cognito-identity-provider");
 
 log.setDefaultLevel('trace');
 
 program
     .command('lusers')
     .version('0.0.1')
     .requiredOption('--accessKey <string>', 'AWS access key')
     .requiredOption('--secretKey <string>', 'AWS secret key')
     .requiredOption('-r --region <string>', 'AWS region to query')
     .requiredOption('-id --cognitoPoolId <string>', 'cognito pool id')
     .requiredOption('-atr --attributes <string...>', 'attributes on which filtering will happen')
     .requiredOption('-l --limit <number>', 'limit to fetch the number of users info')
     .option('-v --attributeValue <string>', 'value can be provided to filter an attribute based on a given value')
     .action(function (options) {
         const { accessKey, secretKey, region, cognitoPoolId, attributes, limit, attributeValue } = options;
         const client = new CognitoIdentityProviderClient({
             region,
             credentials: {
                 accessKeyId: accessKey,
                 secretAccessKey: secretKey
             }
         });
 
         const run = async () => {
             if (client) {
                 try {
                     const command = new ListUsersCommand({
                         UserPoolId: cognitoPoolId,
                         Limit: Number(limit)
                     });
                     const usersList = await client.send(command);
                     let filteredUsers = [];
                     usersList.Users.forEach(user => {
                         if (user.Enabled) {
                             const found = user.Attributes.filter(attr => {
                                 if (attributes.length > 1) {
                                    return attributes.includes(attr.Name);
                                 } else if (attr.Name === attributes[0]) {
                                     if (attributeValue) {
                                         return attr.Value === attributeValue;
                                     }
                                     return true;
                                 }
                                 return false;
                             });
                             if (found.length) {
                                 filteredUsers.push({ ...user, CreatedDate: new Date(user.UserCreateDate * 1000) });
                             }
                         }
                     });
                     console.info(`Total records matching the attributes are ${filteredUsers.length}`);
                     fs.writeFileSync(`${__dirname}/output.json`, JSON.stringify(filteredUsers), { encoding: 'utf8' });
                 } catch (e) {
                    console.error(`Error while fetching users from the cognito pool ${cognitoPoolId} in a region ${REGION}`);
                    console.error(`${e}`);
                     return;
                 }
             } else {
                console.error(`Error in creating CognitoIdentityProviderClient client`);
             }
         };
         run();
     });
 
 program.parse(process.argv);
