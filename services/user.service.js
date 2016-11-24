var mongoose = require('mongoose'),
User = mongoose.model('User');

exports.findAll = function(req, res){
  User.find({},function(err, results) {
    return res.send(results);
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  User.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};
exports.findByEMail = function(req, res){
  var id = req.params.email;
  User.findOne({'email':email},function(err, result) {
    return res.send(result);
  });
};
exports.add = function(req, res) {
  User.create(req.body, function (err, musician) {
    if (err) return console.log(err);
    return res.send(musician);
  });
}
exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;

  User.update({"_id":id}, req.body,
    function (err, numberAffected) {
      if (err) return console.log(err);
      res.send(202);
  });
}
exports.delete = function(req, res){
  var id = req.params.id;
  User.remove({'_id':id},function(result) {
    return res.send(result);
  });
};

exports.import = function(req, res){
  User.create(
    { "email": "ross.s.money@gmail.com", "password": md5("temp#123") }
  , function (err) {
    if (err) return console.log(err);
    return res.send(202);
  });
};
