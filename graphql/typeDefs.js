const { gql } = require("apollo-server");

const typeDefs = gql`
type User {
    id:ID!
    name:String!
    username:String!
    email:String!
    password:String!
    registeredAt:String!
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
    createUser(userInput:userRegistrationInput):Token
    requestPasswordReset(email:String!):String!
    resetPassword(userId:ID!, token:ID!, password:String!):Boolean!
},
`



module.exports = {typeDefs};