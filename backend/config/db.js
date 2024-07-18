import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log('MongoDB database connection established successfully');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
