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
}

input InputEnvironment {
    name: String!
    config: InputConfig
}

input InputConfig {
    data: String
}

type Environment {
    name: String!
    id: ID!    
    configs: [Config]
}

type Config {
    version: Int
    data: String
}

type Query {
    service: [Service]
    configs(serviceId: String, environment: String): Environment
}

type Mutation {
    newService(service:InputService!): BasicResponse!
    updateConfig(serviceId: ID!, environmentName: String!, version: Int, data: String): BasicResponse!
}

type BasicResponse {
    success: Boolean!
    error: String   
}
`;