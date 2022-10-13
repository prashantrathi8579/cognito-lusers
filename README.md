# cognito-lusers

Simple script to get a list of cognito users based on filtering on an attribute including a custom attribute. 
Currently AWS provides filtering only on some standard attributes as given in the following documentation

https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ListUsers.html

This script is created to ease the filtering on any attribute.

### Usage
1. Down files from the git repo or clone the project
2. cd to download location.
3. run **npm i** on the terminal to install the dependencies.
4. run **node cognito-lusers.js** on terminal

Script will start showing command to run. 

### Mandatory cli attributes to run the script
1) AWS access token
2) AWS secret key
3) Region to query
4) Cognito pool id
5) Limit
6) Attribute to query

##### Command: 
node cognito-lusers.js lusers --accessKey `<value>` --secretKey `<value>` -r `<region>` -id `<cognito pool id>` -atr `<attribute to query>` -l `<limit>`
