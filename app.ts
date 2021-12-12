import { GraphQLServer } from 'graphql-yoga'
const dbConnect = require("./DB")
const typeDefs = require("./graphql/schema")
const resolvers = require("./graphql/resolvers")


dbConnect();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})


server.start(() => console.log("graphql server run"))