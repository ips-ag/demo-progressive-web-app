targetScope = 'subscription'

param name string
param location string = 'westeurope'
param repositoryUrl string = ''
param deploymentId string = utcNow()
param deploy bool = true

var webAppName = 'stapp-pwademo'

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = if (deploy) {
  name: name
  location: location
}

module app 'staticWebApp.bicep' = if (deploy) {
  name: 'dep-staticWebApp-${deploymentId}'
  scope: rg
  params: {
    name: webAppName
    location: rg.location
    repositoryUrl: repositoryUrl
  }
}

module app_existing 'staticWebApp.bicep' = if (!deploy) {
  name: 'dep-staticWebApp-existing-${deploymentId}'
  scope: resourceGroup(name)
#disable-next-line explicit-values-for-loc-params
  params: {
    name: webAppName
    repositoryUrl: repositoryUrl
  }
}

output deploymentToken string = deploy ? app.outputs.deploymentToken : app_existing.outputs.deploymentToken
