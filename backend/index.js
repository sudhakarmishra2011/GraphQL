import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import userModel from './models/userModel.js';

const typeDefs = `
  type User {
    id: ID
    name: String
    email: String
  }
  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String!, email: String!): User
  }
`;

const resolvers = {
  Query: {
    users: () => userModel.findAll(),
  },
  Mutation: {
    addUser: async (_, { name, email }) => {
      const user = await userModel.create({ name, email });
      return user;
    },
  },
};


/* Start Apollo Server  */
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);





/*

Since we are using type = module to load ES6 modules.

We have to metion .js as file extension while importing.

*/