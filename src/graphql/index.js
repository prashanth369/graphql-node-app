import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typedefs/index.js'
import resolvers from './resolvers/index.js'

const server = new ApolloServer({
  typeDefs, resolvers
});

export default server;
