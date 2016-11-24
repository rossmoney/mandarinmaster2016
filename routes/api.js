var mongoose = require('mongoose');

module.exports = function(app){
  var users = require('../services/user.service.js');
    app.get('/users', users.findAll);
    app.get('/users/:id', users.findById);
    app.get('/users/:email', users.findByEMail);
    app.post('/users', users.add);
    app.put('/users/:id', users.update);
    app.delete('/users/:id', users.delete);
  app.get('/users/import', users.import);
  
  var sessions = require('../services/session.service.js');
    app.get('/sessions', sessions.findAll);
    app.get('/sessions/:id', sessions.findById);
    app.post('/sessions', sessions.add);
    app.put('/sessions/:id', sessions.update);
    app.delete('/sessions/:id', sessions.delete);
}
