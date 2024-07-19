import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: String
  },
  salary: {
    type: Number,
    default: 0 
  },
  newsletterSubscribed: {
    type: Boolean,
    default: false
  }
});



const User = mongoose.model('User', UserSchema);

export default User;
