import { gql } from 'apollo-server';

export default gql`

type Service {
    name: String!
    description : String
    environments: [Environment]
}
input InputService {
    name: String!
    description : String
    environments: [InputEnvironment]
    webHook: InputWebHook 
}

input InputEnvironment {
    name: String!
    config: InputConfig,
    webHook: InputWebHook 
}

input InputConfig {
    data: String
    type: String
}
input InputWebHook {
    url: String!
    method: String!
    data: String
}

type Environment {
    name: String!
    configs: [Config]
    webHook: WebHook 
}

type Config {
    version: Int
    data: String,
    type: String,
    webHook: WebHook 
}
type WebHook {
    url: String!
    method: String!
    data: String
}

type Query {
    services: [Service]
    service(serviceName: String, lastConfig: Boolean): Service
    latestConfig(serviceName: String, environment: String, raw: Boolean): Config
    getConfigs(serviceName: String, environment: String, raw: Boolean): Environment
    getGlobalVariable: String
}

type Mutation {
    newService(service:InputService!): BasicResponse!
    deleteService(serviceName: String!): BasicResponse!
    updateGlobalVariable(globalVariable: String!): BasicResponse!
    updateConfig(serviceName: String!, environmentName: String!, data: String!, type:String): BasicResponse!
    updateService(service:InputService!, originalName:String!): BasicResponse!
}

type BasicResponse {
    success: Boolean!
    error: String   
}
`;