const { TaskController } = require('./TaskController')
const express = require('express')
const taskController = new TaskController()

const taskRouter = express()

taskRouter.get('/', taskController.getAll)
taskRouter.post('/', taskController.create)
taskRouter.put('/:id', taskController.update)
taskRouter.delete('/:id', taskController.remove)

module.exports = taskRouter