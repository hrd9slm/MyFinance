import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },

  profile: {
    type: String
  },
  newsletterSubscribed: {
    type: Boolean,
    default: false
  }
});



const User = mongoose.model('User', UserSchema);

export default User;
