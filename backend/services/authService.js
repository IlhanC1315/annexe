const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async ({ name, userName, email, password }) => {
    const existingUser = await User.findOne({ email });
    if(existingUser) throw new Error("Le compte existe deja")
    
    const newUser = new User({ name, userName, email, password });
    await newUser.save();
    return { message: "Le compte a était crée avec succès"};
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email })
    if(!user) throw new Error("Champs invalide");

    const isMatch = await user.comparePassword(password);
    if(!isMatch) throw new Error("Champs invalide")

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    return { token, user: { id: user._id, name: user.name, userName: user.userName, email: user.email } };
};