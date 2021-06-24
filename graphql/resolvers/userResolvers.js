const { UserInputError } = require("apollo-server");
const { User } = require('../../models/User');
const { generateToken } = require("../../utils/auth");
const bcrypt = require('bcrypt');



const userResolvers = {
  Query: {
    getUsers: async  () => {
        const users = await User.find({});
      return users
    },
  },
  Mutation: {
    login: async (parent, { username, password }, context, info) => {
      let user  = await User.find({username: username});
      //check if user exist
      if (!user) {
        throw new UserInputError("Invalid Credentials value");
      }
      const token = generateToken(userInput);
      const res = {
        username,
        email: userInput.email,
        token: token,
      };
      return res;
    },
    createUser: async (_, { user }) => {
      const { username, password, corfirmPassword, email, name } = user;
 
      const user = await User.find({username:username});
      if(user){
          throw new UserInputError("Usersname already in user")
      }

      const token = generateToken(user);
    
      const res = {
        username,
        email,
        token: token,
      };
            return res;
    },
  },
};

module.exports = { userResolvers };
