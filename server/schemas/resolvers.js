const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({})
                .populate('books')            
                return userData;
            }
            throw new AuthenticationError('Please log in');
        },
    },

    Mutation: {
        LOGIN_USER: (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Check your username');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Check your password');
            }

            const token = signToken(user);
            return {token, user};
    
        },

        ADD_USER: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return {token, user};
        },

        SAVE_BOOK: async (parent, args, context) => {
            if (context.user) {
            //   const savedBook = await Book.create({ ...args, username: context.user.username });
          
             const updatedUser =  await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.input } },
                { new: true }
              );
          
            return updatedUser;
            }
          
            throw new AuthenticationError('Please log in.');
        },
        
        REMOVE_BOOK: async (parent, args, context) => {
            if(context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );

            return updatedUser;
            }

            throw new AuthenticationError('Please log in.');
        }
    }
};

module.exports = resolvers;
