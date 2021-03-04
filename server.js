const express = require('./express')
const app = express()
const PORT = 3001

app.use(express.bodyParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  res.json({
    success: true,
    body: req.body,
    message: 'logged in',
  })
})

app.use((req, res, next) => {
  res.status(404).send(`<h1>Not Found</h1>`)
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
