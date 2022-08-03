targetScope = 'subscription'

param name string
param location string = 'westeurope'
param repositoryUrl string = ''
param deploymentId string = utcNow()
param deploy bool = true

var webAppName = 'stapp-pwademo'

resource rg_new 'Microsoft.Resources/resourceGroups@2021-04-01' = if (deploy) {
  name: name
  location: location
}

module app_new 'staticWebApp.bicep' = if (deploy) {
  name: 'dep-staticWebApp-${deploymentId}'
  scope: rg_new
  params: {
    name: webAppName
    location: rg_new.location
    repositoryUrl: repositoryUrl
  }
}

resource rg_existing 'Microsoft.Resources/resourceGroups@2021-04-01' existing = if (!deploy) {
  name: name
}

module app_existing 'staticWebApp.bicep' = if (!deploy) {
  name: 'dep-staticWebApp-${deploymentId}'
  scope: rg_existing
  params: {
    name: webAppName
    location: rg_existing.location
    repositoryUrl: repositoryUrl
  }
}

output deploymentToken string = deploy ? app_new.outputs.deploymentToken : app_existing.outputs.deploymentToken
