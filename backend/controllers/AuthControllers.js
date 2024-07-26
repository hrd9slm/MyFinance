// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User';

// export const registerUser = async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ error: 'Please fill in all fields' });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         return res.status(400).json({ error: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//         name,
//         email,
//         password: hashedPassword,
//     });

//     await user.save();

//     return res.status(201).json({ message: 'User created successfully' });
// };