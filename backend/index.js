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
    user(email : String): User
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    deleteUser(email : String) : User
    updateUser(name : String, email : String) : User
  }
`;

const resolvers = {
  Query: {
    users: () => userModel.findAll(),

    user: (_, { email }) => userModel.findOne({
      where: {
        email: email
      }
    })
  },
  Mutation: {
    addUser: async (_, { name, email }) => {
      const user = await userModel.create({ name, email });
      return user;
    },

    deleteUser: async (_, { email }) => await userModel.destroy({
      where: {
        email: email
      }
    }),
    
    updateUser: async (_, { name, email }) => {
      console.log(name, email)
      const user = await userModel.update({ name }, {
        where: {
          email: email
        }
      })
      return user
    }
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

We have to mention .js as file extension while importing.

*/