import { gql } from 'apollo-server';

export default gql`
type Service {
    name: String!
    description : String
    id: ID!
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
    data: String
    webHook: WebHook 
}
type WebHook {
    url: String!
    method: String!
    data: String
}

type Query {
    service: [Service]
    latestConfig(serviceId: String, environment: String): String
    getConfigs(serviceId: String, environment: String): Environment
}

type Mutation {
    newService(service:InputService!): BasicResponse!
    updateConfig(serviceId: ID!, environmentName: String!, data: String!): BasicResponse!
}

type BasicResponse {
    success: Boolean!
    error: String   
}
`;