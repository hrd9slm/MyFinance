import Transaction from '../models/Transaction.js';



import Category from '../models/Category.js';
import User from '../models/User.js';
/*************************** */

export const createTransaction = async (req, res) => {
  const { category, amount, date, description } = req.body;
  try {
    // Vérifier si la catégorie existe
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      throw new Error('Category not found');
    }
    console.log("existingCategory",existingCategory);

    // Créer la transaction
    const transaction = await Transaction.create({
      user: req.user.id,
      category,
      amount,
      date,
      description
    }); 

    // Mettre à jour le budget de la catégorie
    existingCategory.remainingBudget = existingCategory.remainingBudget - amount;
    await existingCategory.save();
    console.log("remainingBudget-category",existingCategory.remainingBudget);
    // Mettre à jour le salaire de l'utilisateur
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new Error('User not found');
    }
    
    user.remainingSalary -= amount; // Soustraire le montant de la transaction du salaire de l'utilisateur
    await user.save();
console.log(user.remainingSalary );
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/************************************************* */
export const getTransactions = async (req, res) => {
  try {
    // const transactions = await Transaction.find().populate('category');
     const transactions = await Transaction.find({ user: req.user.id }).populate('category');
   
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { category: newCategory, amount, date, description } = req.body;

  try {
    // Find the transaction to update
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    // Save the original category ID and amount for later use
    const originalCategory = transaction.category;
    const originalAmount = transaction.amount;

    // Calculate the difference in amount
    const amountDifference = amount - originalAmount;

    // Update the transaction with the new values
    transaction.category = newCategory;
    transaction.amount = amount;
    transaction.date = date;
    transaction.description = description;
    await transaction.save();

    // Update the user's salary
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new Error('User not found');
    }
    user.remainingSalary -= amountDifference; // Ajuster le salaire en fonction de la différence de montant
    await user.save();

    // If the category has not changed, only update the remainingBudget in the same category
    if (originalCategory.toString() === newCategory.toString()) {
      const originalCat = await Category.findById(originalCategory);
      if (originalCat) {
        originalCat.remainingBudget -= amountDifference;
        await originalCat.save();
      }
    } else {
      // If the category has changed, update both the original and new categories

      // Update the original category
      const originalCat = await Category.findById(originalCategory);
      if (originalCat) {
        originalCat.remainingBudget += originalAmount;
        await originalCat.save();
      }

      // Update the new category
      const updatedCat = await Category.findById(newCategory);
      if (!updatedCat) {
        throw new Error('New category not found');
      }
      updatedCat.remainingBudget -= amount;
      await updatedCat.save();
    }

    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Supprime une transaction


export const deleteTransaction = async (req, res) => {
  const { id: transactionId } = req.params;

  try {
    // Find the transaction to delete
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Find the associated category
    const category = await Category.findById(transaction.category);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Update the remainingBudget of the category
    category.remainingBudget += transaction.amount;
    await category.save();

    // Update the user's salary
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new Error('User not found');
    }
    user.remainingSalary += transaction.amount; // Ajouter le montant de la transaction au salaire de l'utilisateur
    await user.save();

    // Delete the transaction
    await Transaction.findByIdAndDelete(transactionId);

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
