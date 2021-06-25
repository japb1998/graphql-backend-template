const { UserInputError } = require("apollo-server");
const { User } = require('../../models/User');
const { generateToken } = require("../../utils/auth");
const {validateInput , validateLogin}=require('../../utils/inputValidation');
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

    const {errors, valid} = validateLogin(username, password); 
       
    if(!valid){
        throw new UserInputError("Errors",{errors})
}; 
      let user  = await User.findOne({username: username});
      //check if user exist
      if (!user) {
        throw new UserInputError("Invalid Credentials value");
      }

      const match = await bcrypt.compare(password, user.password);
      if(!match) throw new UserInputError("Invalid Credentials value");

      const token = generateToken(user);
      const res = {
        username,
        email: user.email,
        token: token,
      };
      return res;
    },
    createUser: async (_, { userInput:{ username, password, confirmPassword, email, name } }) => {
    
        const {errors, valid} = validateInput(username, password, confirmPassword, email, name);

        if(!valid){
                throw new UserInputError("Errors",{errors})
        }; 

      const existingUser = await User.findOne({username:username});
    //   console.log(existingUser)
      if(existingUser){
          throw new UserInputError("Username already in use")
      }



password = await bcrypt.hash(password, 10);

const newUser =  new User({
    email, 
    username,
    password,
    name
});

const res = await newUser.save();


      const token = generateToken(newUser);
    
            return {
                email:res.email,
                username:res.username,
                token
            }
    },
  },
};

module.exports = { userResolvers };
