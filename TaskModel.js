const { randomUUID } = require('node:crypto')

class TaskRepository {
    #tasks = [
    {id: randomUUID(), title: 'Belajar Matematika', status: 'completed'},
    {id: randomUUID(), title: 'Masak untuk makan siang', status: 'progress'},
    {id: randomUUID(), title: 'Tugas Basis Data', status: 'notyet'}
  ]

  all = () => this.#tasks

  add = (title) => {
    const newTask = {id: randomUUID(), title: title, status: 'pending'}
    this.#tasks.push(newTask)
    return newTask
  }

  removeById = (id) => {
    const target = this.#tasks.find((task) => task.id === id)
    
    if (target === undefined) {
      return {ok: false, data: null}
    }
  
    this.#tasks = this.#tasks.filter(task => task.id !== target.id)
    return {ok: true, data: target}
  }

  update = (id, status) => {
      const index = this.#tasks.findIndex((task) => task.id === id)

      if (index < 0) {
        return {ok: false, data: null}
      }

      this.#tasks[index].status = status
      return {ok: true, data: this.#tasks[index]}
  }
}

module.exports = {
  TaskRepository
}