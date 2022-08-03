targetScope = 'resourceGroup'

param name string
param location string
param repositoryUrl string
param branch string = 'main'

resource swa 'Microsoft.Web/staticSites@2021-03-01' = {
  name: name
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: branch
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: 'GitHub'
    enterpriseGradeCdnStatus: 'Disabled'
  }
}

#disable-next-line outputs-should-not-contain-secrets
output deploymentToken string = listSecrets(swa.id, '2021-03-01').properties.apiKey
