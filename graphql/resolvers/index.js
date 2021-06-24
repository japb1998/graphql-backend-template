const { userResolvers } = require('./userResolvers');





const resolvers = {
    Query:{
...userResolvers.Query
    },
Mutation:{
...userResolvers.Mutation
}

};

  module.exports={resolvers};