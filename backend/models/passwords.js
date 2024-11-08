import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
   fullName: String,
   username: String,
   userPassword: String,

});

const Password = mongoose.model('Password', passwordSchema);

export default Password;
