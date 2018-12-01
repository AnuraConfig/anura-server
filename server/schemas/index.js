import { gql } from 'apollo-server';
export default gql`

type Service {
    name: String!
    id: ID!
    environments: [Environment]
}

type Environment {
    name: String!
    configs: [Config]
    id: ID!
}

type Config {
    version: Int
    data: String
}

type Query {
    service: [Service]
}
`