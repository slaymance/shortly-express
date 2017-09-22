const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  let makeNewSession = function () {
    models.Sessions.create().then(result => {
      models.Sessions.get({id: result.insertId}).then(result => {
        req.session = {hash: result.hash};
        res.cookies = {shortlyid: {value: result.hash}};
        next();
      });
    });
  };
  if (!req.cookies || Object.keys(req.cookies).length === 0) {
    makeNewSession();
  } else {
    models.Sessions.get({hash: req.cookies.shortlyid}).then(result => {
      if (result) {
        req.session = {hash: result.hash};
        if (result.user) {
          req.session.user = {username: result.user.username};
          req.session.userId = result.userId;
        }
        next();
      } else {
        makeNewSession();
      }
    });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

    // let promiseArray = [];
    // // is the user logged in???
    // promiseArray.push(models.Sessions.create()); // update with a user ID if we have one
    // promiseArray.push(models.Users.get({username: (req.body.username)}));

    // Promise.all(promiseArray).then(results => {
    //   models.Sessions.get({id: results[0].insertId}).then(result => {
    //     console.log(req);
    //     req.session = {
    //       hash: result.hash,
    //       user: {username: 'Bob'}
    //     };
    //     res.cookies.shortlyid = {value: result.hash};
    //     next();    
    //   });

    // });
    // .then(result => {
    //   console.log('result: ', result);
      // add user id to newly created session row
      // add value in hash to request.session with key named hash
      // res.cookies = {cookieKey: result} where result is the hash in the DB
      // req.session = {hash: result};
    // });
    // need to set new cookie