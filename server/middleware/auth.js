const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  let makeNewSession = function () {
    let promiseArray = [];
    promiseArray.push(models.Sessions.create());
    console.log(req.body.username);
    promiseArray.push(models.Users.get({username: req.body.username}));
    Promise.all(promiseArray).then(results => {
      console.log(results);
    });
    // .then(result => {
    //   console.log('result: ', result);
      // add user id to newly created session row
      // add value in hash to request.session with key named hash
      // res.cookies = {cookieKey: result} where result is the hash in the DB
      // req.session = {hash: result};
    // });
    // need to set new cookie
  };

  if (Object.keys(req.cookies).length === 0) {
    makeNewSession();
  } else if (/* No results from sessions table query of the cookies */true) {
    // clear that cookie
    makeNewSession();
  } else {
    // restore that user's session
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

// check cookies  no cookie(s)
  // store   session in DB,  assign session's hash  to the cookie

// if cookie and is not in database, delete it , call above new seesion, new cookie

// if cookie exists in db, restore user's session -