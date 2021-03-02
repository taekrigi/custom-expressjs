const express = require('./express');
const app = express();
const PORT = 3001;

app.use(express.bodyParser())

app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.get('/login', (req, res) => {
  res.json({
    success: true,
    message: "logged in"
  })
})

app.use((req, res, next) => {
  next(new Error("Not Found"));
})

app.use((err, req, res, next) => {
  next(err);
})

app.use((err, req, res, next) => {
  res.send(`<h1>${err.message}</h1>`);
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});