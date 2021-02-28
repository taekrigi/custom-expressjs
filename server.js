const express = require('./express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.end("Hello World!")
})

app.get('/login', (req, res) => {
  res.end("Log in!")
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});