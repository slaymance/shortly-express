const querystring = require('querystring');
const _ = require('lodash');

const parseCookies = (req, res, next) => {
  // access the cookie ??
  if (req.headers.cookie === undefined) {
    req.cookies = {};
    
  } else {
    let unparsedArray = (req.headers.cookie).split('; ');
    req.cookies = unparsedArray.reduce((acc, val) => {
      let parsedCookie = querystring.parse(val);
      return _.extend(acc, parsedCookie);
    }, {});
  }
  next();
};

module.exports = parseCookies;