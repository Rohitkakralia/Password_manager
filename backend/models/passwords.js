import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    userPassword: {
        type: String
    }
});

const Password = mongoose.model('Password', passwordSchema);

export default Password;
