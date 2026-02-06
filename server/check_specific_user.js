const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const checkSpecificUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const emailToCheck = 'gla@gmail.com';
        const user = await User.findOne({ email: emailToCheck });

        if (user) {
            console.log('User found:', {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            console.log(`User with email ${emailToCheck} NOT found.`);
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkSpecificUser();
