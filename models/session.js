var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var SessionSchema = new Schema({
  email: String,
  logindate: Date,
  expired: String
});

mongoose.model('Session', SessionSchema);
