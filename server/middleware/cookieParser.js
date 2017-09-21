const parseCookies = (req, res, next) => {
  // access the cookie ??
  if (req.headers.Cookies === undefined) {
    req.cookies = {};
    
  }
  next();
};

module.exports = parseCookies;