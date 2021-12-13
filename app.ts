// import { GraphQLServer } from 'graphql-yoga'
import { ApolloServer, AuthenticationError } from "apollo-server"
const dbConnect = require("./DB")
const typeDefs = require("./graphql/schema")
const resolvers = require("./graphql/resolvers")
import env from "./env"

dbConnect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (!req.headers.authorization)
      throw new AuthenticationError("mssing token");

    const token = req.headers.authorization.substr(7);
    // const user = users.find((user) => user.token === token);
    let user = "";
    token === env.token ? user = token : null;
    console.log(`user: ${user}, token: ${token}`);
    if (!user) throw new AuthenticationError("invalid token");
    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`Listening at ${url}`);
});