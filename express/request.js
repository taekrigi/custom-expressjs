const request = (req) => {
  req.params = null;

  req.body = null;

  return req;
}

module.exports = request;