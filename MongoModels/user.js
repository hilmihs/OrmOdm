const { Schema, model } = require('mongoose')
const mongoose = require("mongoose")

const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
  email: { type: String, lowercase: true, requird: true},
  password: String,
  name: String,
  address: String,
  token: String,
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
});

userSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    console.log(user.password, saltRounds)
    const hash = bcrypt.hashSync(user.password, saltRounds);
    // Store hash in your password DB.
    user.password = hash
    next()

  } else {
    next()
  }
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}
module.exports = model('User', userSchema);