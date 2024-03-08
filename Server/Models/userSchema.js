const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  wishlist: [{ type: mongoose.Schema.ObjectId, ref: "product" }],
  orders: [],
  cart:[{
    productId: { type: mongoose.Schema.ObjectId, ref: "product" },
    quantity: { type: Number, default: 1 } 
}],
});
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log("Error hashing password", error);
    next(error);
  }
});
userSchema.method.comarePassword = async (password, passwordDB) => {
  return await bcrypt.compare(password, passwordDB);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
