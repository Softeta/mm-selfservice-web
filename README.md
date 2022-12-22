# Variables

To get id of:

`VITE_FRONTOFFICE_COMPANY_APP_ID` and `VITE_FRONTOFFICE_CANDIDATE_APP_ID`

Go to `App Service` -> `Identity` -> `Object (principal) ID`

Manual service principle creation is required for each B2C tenant used in
'local-account-sign-up-page-b2c-da.yml'

# Setup App registrations for B2C user flow languages
* `az login --tenant <tenant-id> --allow-no-subscriptions`

* `az ad app create --display-name <principal-name> --required-resource-accesses @manifest.json --enable-access-token-issuance true`\
("manifest.json" contains the following content)
```json
[{
    "resourceAppId": "00000003-0000-0000-c000-000000000000",
    "resourceAccess": [
        {
          "id": "65319a09-a2be-469d-8782-f6b07debf789",
          "type": "Role"
        }
   ]
}]
```
* `az ad sp create-for-rbac -n <principal-name>`\
Save output in keyvault and Github actions secrets:\
AZURE_<CANDIDATES || COMPANIES>_B2C_APP_CLIENT_ID_<ENV>: `appId` from output\
AZURE_<CANDIDATES || COMPANIES>_B2C_APP_CLIENT_SECRET_<ENV>: `password` from output

* `az ad app permission admin-consent --id <application-id>`\
Service principal-name:\
sp-mm-github-language-companies\
sp-mm-github-language-candidates

# Code Formatting
As a team, we should follow not only good practices for the code, but also ensure our code is formatted in the same way. When coding in Visual Studio Code, it is highly recommended to install ESLin extension. In this way, your code will be formatted automatically according to the rules which are configured in a .eslintrc file of this repository.