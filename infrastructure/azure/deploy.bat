@REM Create service principal for deployment
az ad sp create-for-rbac --name demo-pwa-gh --role contributor --scopes /subscriptions/1edcae36-b0ca-4eb6-bf76-e2ae5aea6a35 --sdk-auth

@REM Deploy template
az deployment sub create --name dep-pwa-demo --subscription 1edcae36-b0ca-4eb6-bf76-e2ae5aea6a35 --location westeurope --template-file resourceGroup.bicep --parameters parameters.json repositoryUrl=https://github.com/ips-ag/demo-progressive-web-app