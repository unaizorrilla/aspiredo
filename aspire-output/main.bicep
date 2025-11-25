targetScope = 'subscription'

param resourceGroupName string

param location string

param principalId string

resource rg 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: resourceGroupName
  location: location
}

module redis 'redis/redis.bicep' = {
  name: 'redis'
  scope: rg
  params: {
    location: location
  }
}

module redis_roles 'redis-roles/redis-roles.bicep' = {
  name: 'redis-roles'
  scope: rg
  params: {
    location: location
    redis_outputs_name: redis.outputs.name
    principalId: principalId
    principalName: ''
  }
}