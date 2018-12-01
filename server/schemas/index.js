import { gql } from 'apollo-server';
export default gql`type Config {
    service: String!
    environment: String!  
    version: Int
    data: String
}

type Query {
    configs: [Config]
}`