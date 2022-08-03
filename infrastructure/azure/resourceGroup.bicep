targetScope = 'subscription'

param name string
param location string
param repositoryUrl string
param deploymentId string = utcNow()

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: name
  location: location
}

module app 'staticWebApp.bicep' = {
  name: 'dep-staticWebApp-${deploymentId}'
  scope: rg
  params: {
    name: 'stapp-pwademo'
    location: rg.location
    repositoryUrl: repositoryUrl
  }
}

output deploymentToken string = app.outputs.deploymentToken
