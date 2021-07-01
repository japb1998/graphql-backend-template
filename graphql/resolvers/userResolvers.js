const {
  UserInputError
} = require("apollo-server");
const {
  User
} = require('../../models/User');
const Token = require("../../models/Token");
const JWT = require("jsonwebtoken");
const sendEmail = require("../../utils/sendEmail");
const {
  generateToken
} = require("../../utils/auth");
const {
  validateInput,
  validateLogin
} = require('../../utils/inputValidation');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = 'localhost:3000'



const userResolvers = {
  Query: {
    getUsers: async () => {
      const users = await User.find({});
      return users
    },
  },
  Mutation: {
    login: async (parent, {
      username,
      password
    }, context, info) => {

      const {
        errors,
        valid
      } = validateLogin(username, password);

      if (!valid) {
        throw new UserInputError("Errors", {
          errors
        })
      };
      let user = await User.findOne({
        username: username
      });
      //check if user exist
      if (!user) {
        throw new UserInputError("Invalid Credentials value");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new UserInputError("Invalid Credentials value");

      const token = generateToken(user);
      const res = {
        username,
        email: user.email,
        token: token,
      };
      return res;
    },
    createUser: async (_, {
      userInput: {
        username,
        password,
        confirmPassword,
        email,
        name
      }
    }) => {

      const {
        errors,
        valid
      } = validateInput(username, password, confirmPassword, email, name);

      if (!valid) {
        throw new UserInputError("Errors", {
          errors
        })
      };

     let user = await User.findOne({
        username: username
      });
      //   console.log(existingUser)
      if (user) {
        throw new UserInputError("Username already in use")
      }



      password = await bcrypt.hash(password, 10);

      user = new User({
        email,
        username,
        password,
        name
      });

      const res = await user.save();


      const token = generateToken(user);

      return {
        email: res.email,
        username: res.username,
        token
      }
    },
    requestPasswordReset: async (_,{email})=>{
      const user = await User.findOne({ email });

      if (!user) throw new Error("User does not exist");
      let token = await Token.findOne({ userId: user._id });
      if (token) await token.deleteOne();
      let resetToken = crypto.randomBytes(32).toString("hex");
      const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
    
      await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
      }).save();
    
      const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
      sendEmail(user.email,"Password Reset Request",{name: user.name,link: link,},"./template/requestResetPassword.handlebars");
      return link;
    },
    resetPassword: async (_,{userId, token, password}) => {
      let passwordResetToken = await Token.findOne({ userId });
      if (!passwordResetToken) {
        throw new Error("Invalid or expired password reset token");
      }
      const isValid = await bcrypt.compare(token, passwordResetToken.token);
      if (!isValid) {
        throw new Error("Invalid or expired password reset token");
      }
      const hash = await bcrypt.hash(password, Number(bcryptSalt));
      await User.updateOne(
        { _id: userId },
        { $set: { password: hash } },
        { new: true }
      );
      const user = await User.findById({ _id: userId });
      sendEmail(
        user.email,
        "Password Reset Successfully",
        {
          name: user.name,
        },
        "./template/resetPassword.handlebars"
      );
      await passwordResetToken.deleteOne();
      return true;
    }
  },
};

module.exports = {
  userResolvers
};