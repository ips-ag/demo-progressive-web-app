@REM Create service principal for deployment
az ad sp create-for-rbac --name demo-pwa-gh --role contributor --scopes /subscriptions/187a4e97-7e6b-413d-bc6f-f80719c1baa0 --sdk-auth

@REM Deploy template
az deployment sub create --name dep-pwa-demo --subscription 187a4e97-7e6b-413d-bc6f-f80719c1baa0 --location westeurope --template-file resourceGroup.bicep --parameters parameters.json repositoryUrl=https://github.com/ips-ag/demo-progressive-web-app