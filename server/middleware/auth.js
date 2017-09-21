const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  let makeNewSession = function () {
    models.Sessions.create()
    .then(result => {
      // res.cookies = {cookieKey: result} where result is the hash in the DB
    });
    // need to set new cookie
  };

  if (Object.keys(req.cookies).length === 0) {
    makeNewSession();
  } else if (/* No results from sessions table query of the cookies */) {
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