const { gql } = require("apollo-server");

const typeDefs = gql`
type User {
    id:Int!
    name:String!
    username:String!
    email:String!
    password:String!
},
type Token{
    username:String!
    email:String!
    token:String!
}
input userRegistrationInput{
    username: String
    email:String!
    password: String
    confirmPassword:String
    name:String!
}
type Query {
    getUsers:[User]
},
type Mutation{
    login(username:String!, password:String!):Token
    createUser(user:userRegistrationInput):Token
}
`



module.exports = {typeDefs};