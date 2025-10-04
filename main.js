const { TaskController } = require('./TaskController')
const express = require('express')
const taskController = new TaskController()
const app = express()

app.use(express.json())


app.get('/api/v1/tasks', taskController.getAll)
app.post('/api/v1/tasks', taskController.create)
app.put('/api/v1/tasks', taskController.update)
app.delete('/api/v1/tasks', taskController.remove)



const port = process.env.PORT ?? 5050
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})