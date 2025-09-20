const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'worker', 'admin'], default: 'user' },
    userImage: { type: String },
    descripton: { type: String },
})

//Hache le mot de passe avant de sauvegarder
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//comparer le mot de passe
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);

