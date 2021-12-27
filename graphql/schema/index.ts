import { gql } from "apollo-server"
const typeDefs = gql`
type Query {
    authenticate(contentInput: UserInput): String
    getContents: [Content]!
    findContent(contentInput: ContentInput): [Content]!
    find_24h_Content(contentInput: ContentInput): [Content]!
    createContent: [Content]!
}

type Mutation {
    createContent(contentInput: ContentInput): [Content]!
}
type Content {
    ServerURL: String
    Client: String
    createdAt: String
    UserAgentData: [String]
  }

  input ContentInput{
    ServerURL: String
    UserAgentData: [String]
    Client: String
  }
  input UserInput{
    username: String
    password: String
  }
`;

module.exports = typeDefs;