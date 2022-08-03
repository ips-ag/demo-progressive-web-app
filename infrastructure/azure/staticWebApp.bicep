targetScope = 'resourceGroup'

param name string
param location string = resourceGroup().location
param repositoryUrl string = ''
param branch string = 'main'
param deploy bool = true

resource swa 'Microsoft.Web/staticSites@2021-03-01' = if (deploy) {
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

resource swa_existing 'Microsoft.Web/staticSites@2021-03-01' existing = if (deploy) {
  name: name
}

#disable-next-line outputs-should-not-contain-secrets
output deploymentToken string = listSecrets(deploy ? swa.id : swa_existing.id, '2021-03-01').properties.apiKey
