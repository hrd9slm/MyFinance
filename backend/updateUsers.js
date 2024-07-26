import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

// Load environment variables from .env file
dotenv.config();

// Function to update users
const updateUsers = async () => {
  try {
    await connectDB(); // Connect to the database

    // Find users without the salary field and update them
    const users = await User.find({ salary: { $exists: false } });

    for (const user of users) {
      user.salary = 0; // Set a default salary
      await user.save();
    }

    console.log('Users updated');
    mongoose.connection.close(); // Close the database connection
  } catch (error) {
    console.error(error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Run the update function
updateUsers();
