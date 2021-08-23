const { Book, User } = require('../models');

const resolvers = {
    Query: {
        me: async () => {
            return User.find({});
        },
    },

    Mutation: {
        LOGIN_USER: async (_, {  }, {  }) => {
            const user = await findOrCreateUser({ email });
            if (user) {
                user.token = Buffer.from(email).toString('base64');
                return user;
            }
        },
        ADD_USER: async () => {

        },
        SAVE_BOOK: async () => {
            
        },
        REMOVE_BOOK: async () => {
            
        }
    },
};

module.exports = resolvers;
