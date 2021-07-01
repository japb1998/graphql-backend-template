const { ApolloServer } = require('apollo-server');
require("dotenv").config();
const mongoose = require('mongoose');
const {typeDefs} = require('./graphql/typeDefs');
const {resolvers} = require('./graphql/resolvers');
const PORT = process.env.PORT || 3000;
let DB_URL = process.env.DB_URL;


const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req }) => {
  //   // get the user token from the headers
  //   const token = req.headers.authorization || '';
    
  //   // try to retrieve a user with the token
  //   const user = getUser(token) || '';
    
  //   // add the user to the context
  //   return { user };
  // },
});

mongoose.connect(DB_URL, {useNewUrlParser: true}).then(()=>{
  server.listen({port:PORT}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
