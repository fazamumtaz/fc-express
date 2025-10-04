const express = require('express')
const app = express()
const taskRouter = require('./taskRouter')

app.use(express.json())

app.use('/api/v1/tasks', taskRouter) 

const port = process.env.PORT ?? 5050
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})