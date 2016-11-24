var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  passwordlastreset: Date
});

mongoose.model('User', UserSchema);
