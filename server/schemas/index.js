import { gql } from 'apollo-server';

export default gql`
type Service {
    name: String!
    description : String
    id: ID!
    environments: [Environment]
}

type Environment {
    name: String!
    configs: [Config]
}

type Config {
    version: Int
    data: String
}

type Query {
    service(isNew : Boolean): [Service]
    configs(serviceId: String, environment: String): Environment
}

type Mutation {
    updateConfig(serviceId: ID!, enviormentName: String!): ConfigUpdateResponse!
}

type ConfigUpdateResponse {
    success: Boolean!
}
`;