const express = require('express')
const app = express()
const taskRouter = require('./taskRouter')

const morgan = require('morgan')
const logger = morgan('Metode=:method Path=:url Status=:status Content-length=:res[content-length] Content-type=:res[content-type] - :response-time ms')

app.use(express.json())
app.use(logger)

app.use('/api/v1/tasks', taskRouter)


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.json({mess: "something going wrong!"})
})

const port = process.env.PORT ?? 5050
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})