import { gql } from "apollo-server"
const typeDefs = gql`
type Query {
    getContents: [Content]!
    findContent(contentInput: ContentInput): [Content]!
    find_24h_Content(contentInput: ContentInput): [Content]!
}

type Mutation {
    createContent(contentInput: ContentInput): [Content]!
}
type Content {
    ServerURL: String
    Client: String
    createdAt: String
  }

  input ContentInput{
    ServerURL: String
    Client: String
  }
`;

module.exports = typeDefs;