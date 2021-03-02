const bodyParsr = () => (req, res, next) => {
  const body = [];

  req.on('data', chunk => {
    body.push(chunk);
  })

  req.on('end', () => {
    const bodyString = Buffer.concat(body).toString()
    req.body = bodyString.split('&').reduce((acc, cur) => {
          const [key, value] = cur.split('=');
          acc[key] = value;
          return acc; 
      }, {});
    next();
  })
}

module.exports = bodyParsr;