// import { GraphQLServer } from 'graphql-yoga'
import { ApolloServer } from "apollo-server"
const dbConnect = require("./DB")
const typeDefs = require("./graphql/schema")
const resolvers = require("./graphql/resolvers")
// import env from "./env"

dbConnect();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { req };
  },
});

server.listen().then(({ url }) => {
  console.log(`Listening at ${url}`);
});