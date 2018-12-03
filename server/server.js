import { ApolloServer, gql } from 'apollo-server';
import resolvers from './resolvers'
import typeDefs from './schemas'


const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true
}); 

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});