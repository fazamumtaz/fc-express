const { TaskController } = require('./TaskController')
const { TaskRepository } = require('./TaskModel')
const express = require('express')

const taskRepository = new TaskRepository()
const taskController = new TaskController(taskRepository)

const taskRouter = express()

taskRouter.get('/', taskController.getAll)
taskRouter.post('/', taskController.create)
taskRouter.put('/:id', taskController.update)
taskRouter.delete('/:id', taskController.remove)

module.exports = taskRouter