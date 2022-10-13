# cognito-lusers

Currently AWS provides cognito users filtering only on some standard attributes as given in the following documentation
https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ListUsers.html

This script helps to get a list of cognito users filtered on any attributes including custom attributes. 

### Usage
1. Down files from the git repo or clone the project
2. cd to the download location
3. run **npm i** on the terminal to install the dependencies.
4. run **node cognito-lusers.js** on terminal

Script will start showing command to run. 

### Mandatory cli attributes to run the script
1) AWS access token
2) AWS secret key
3) Region to query
4) Cognito pool id
5) Limit
6) Attributes to query

##### Command 1: 
node cognito-lusers.js lusers --accessKey `<value>` --secretKey `<value>` -r `<region>` -id `<cognito pool id>` -atr `<attributeKey1,attributeKey2>` -l `<limit>`

### Optional attribute
1) Attribute value

##### Command 2: 
node cognito-lusers.js lusers --accessKey `<value>` --secretKey `<value>` -r `<region>` -id `<cognito pool id>` -atr `<attributeKey>` -l `<limit>` -v `<value>`

Example 1:
If more than one attribute is provided as shown in the command 1 above, value data will not be considered. Filtered list will match the users having all given attributes.

Example 2:
If one attribute is provided as shown in the command 2 above, value data will be considered if provided in the command.

### Limitations
This script output the result in a json file (output.json) at the current location of the project file.

Anyone can use this utility script without any restrictions and allowed to modify based on their need. 
If you like the utility; please do not forget to give stars.

