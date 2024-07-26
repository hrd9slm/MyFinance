import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
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
    required: true
  },
  remainingSalary: {
    type: Number,
  
  },
  newsletterSubscribed: {
    type: Boolean,
    default: false
  }
});

UserSchema.pre('save', function(next) {
  if (this.isNew && !this.remainingSalary) {
    this.remainingSalary = this.salary;
  }
  next();
});
const User = mongoose.model('User', UserSchema);

export default User;
