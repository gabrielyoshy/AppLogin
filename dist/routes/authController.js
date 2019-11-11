"use strict";

module.exports = function (app) {
  var User = app.db.models.Users;

  var bcrypt = require('bcryptjs');

  var jwt = require('jsonwebtoken');

  var encryptPassword = function encryptPassword(password) {
    var salt;
    return regeneratorRuntime.async(function encryptPassword$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(bcrypt.genSalt(10));

          case 2:
            salt = _context.sent;
            return _context.abrupt("return", bcrypt.hash(password, salt));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  var validatePassword = function validatePassword(password1, password2) {
    return bcrypt.compare(password1, password2);
  };

  function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token) {
      return res.status(401).json({
        auth: false,
        message: 'no token provided'
      });
    }

    var decoded = jwt.verify(token, 'secretToken');
    req.userId = decoded.id;
    next();
  }

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  }).route('/signup').post(function _callee(req, res, next) {
    var _req$body, name, email, password, user, aux, token;

    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
            user = {
              name: name,
              email: email,
              password: password
            };
            _context2.next = 4;
            return regeneratorRuntime.awrap(encryptPassword(password));

          case 4:
            user.password = _context2.sent;
            console.log(user);
            _context2.next = 8;
            return regeneratorRuntime.awrap(User.create(user));

          case 8:
            aux = _context2.sent;
            token = jwt.sign({
              id: aux.id
            }, 'secretToken', {
              expiresIn: 60 * 60 * 24
            });
            res.json({
              auth: true,
              token: token
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  }).route('/me').get(verifyToken, function _callee2(req, res, next) {
    var user;
    return regeneratorRuntime.async(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                id: req.userId
              }
            }));

          case 2:
            user = _context3.sent;

            if (user) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", res.status(404).send('no user found'));

          case 5:
            res.json(user);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  }).route('/signin').post(function _callee3(req, res, next) {
    var _req$body2, email, password, user, validPassword, token;

    return regeneratorRuntime.async(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context4.next = 3;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                email: email
              }
            }));

          case 3:
            user = _context4.sent;

            if (user) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(403).send("The email doesn't exists"));

          case 6:
            _context4.next = 8;
            return regeneratorRuntime.awrap(validatePassword(password, user.password));

          case 8:
            validPassword = _context4.sent;

            if (!validPassword) {
              res.status(401).json({
                auth: false,
                token: null
              });
            }

            token = jwt.sign({
              id: user.id
            }, 'secretToken', {
              expiresIn: 60 * 60 * 24
            });
            res.json({
              auth: true,
              token: token
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  }).route('/logout').get(function _callee4(req, res, next) {
    return regeneratorRuntime.async(function _callee4$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            res.status(200).send({
              auth: false,
              token: null
            });

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
};