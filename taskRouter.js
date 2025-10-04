const { TaskController } = require('./TaskController')
const { TaskRepository, SchemaAdd, SchemaUpdate } = require('./TaskModel')
const express = require('express')
const {ZodError} = require('zod')

const taskRepository = new TaskRepository()
const taskController = new TaskController(taskRepository)

const taskRouter = express.Router() // ✅ Fixed: Use Router instead of express()

taskRouter.get('/', taskController.getAll)
taskRouter.post('/', validate(SchemaAdd), taskController.create)
taskRouter.put('/:id', validate(SchemaUpdate), taskController.update)
taskRouter.delete('/:id', taskController.remove)

function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body)
      next()
    } catch (ex) {
      if(ex instanceof ZodError) {
        const issues = ex.errors.map(({path, message}) => ({path: path.join('.'), message}))
        return res.status(400).json({code: 'validation', issues})
      } else {
        next(ex)
      }
    }
  }
}

module.exports = taskRouter