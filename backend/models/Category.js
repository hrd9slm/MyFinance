import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  remainingBudget: {
    type: Number,
     
  }
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
