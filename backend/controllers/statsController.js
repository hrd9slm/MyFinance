// import Transaction from '../models/Transaction.js';
// import Category from '../models/Category.js';
// import Profile from '../models/Profile.js';

// export const getTotalExpensesByCategory = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const categories = await Category.find({ user: userId });
    
//     const totalExpensesByCategory = await Promise.all(
//       categories.map(async (category) => {
//         const totalAmount = await Transaction.aggregate([
//           { $match: { user: userId, category: category._id } },
//           { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
//         ]);
        
//         return {
//           category: category.name,
//           totalAmount: totalAmount.length ? totalAmount[0].totalAmount : 0,
//         };
//       })
//     );


//     const profile = await Profile.findOne({ user: userId });
//     const salary = profile ? profile.salary : 0;

//     res.json({ totalExpensesByCategory, salary });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const getTotalExpensesByMonth = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const totalExpensesByMonth = await Transaction.aggregate([
//       { $match: { user: userId } },
//       {
//         $group: {
//           _id: { $month: "$date" },
//           totalAmount: { $sum: "$amount" },
//         },
//       },
//       { $sort: { "_id": 1 } },
//     ]);

   
//     const profile = await Profile.findOne({ user: userId });
//     const salary = profile ? profile.salary : 0;

//     res.json({ totalExpensesByMonth, salary });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const getRemainingBudgetByCategory = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const categories = await Category.find({ user: userId });
    
//     const remainingBudgetByCategory = categories.map(category => ({
//       category: category.name,
//       remainingBudget: category.remainingBudget,
//     }));

   
//     const profile = await Profile.findOne({ user: userId });
//     const salary = profile ? profile.salary : 0;
    
//     res.json({ remainingBudgetByCategory, salary });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const getTotalUserExpenses = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const totalUserExpenses = await Transaction.aggregate([
//       { $match: { user: userId } },
//       { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
//     ]);

    
//     const profile = await Profile.findOne({ user: userId });
//     const salary = profile ? profile.salary : 0;

//     res.json({
//       totalUserExpenses: totalUserExpenses.length ? totalUserExpenses[0] : { totalAmount: 0 },
//       salary,
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
