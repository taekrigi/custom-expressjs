const express = require('./express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.get('/login', (req, res) => {
  res.json({
    success: true,
    message: "logged in"
  })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});