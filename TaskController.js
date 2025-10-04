const { randomUUID } = require('node:crypto')
const { STATUS_CODES } = require('node:http')

class TaskController {
  
  #tasks = [
    {id: randomUUID(), title: 'Belajar Matematika', status: 'completed'},
    {id: randomUUID(), title: 'Masak untuk makan siang', status: 'progress'},
    {id: randomUUID(), title: 'Tugas Basis Data', status: 'notyet'}
  ]

  #sendJSON = (res, statusCode, data) => {
    const rawjson = JSON.stringify(data) 
    res.writeHead(statusCode, {
      'Content-Type':'application/json', 
      'content-length': rawjson.length
    })
    res.write(rawjson)
    res.end()
  }
  
  #onData = (req, res, onendCallback) => {
    // Coba ngirim data asli
    const chunks = []
    
    // handle error
    req.on('error', (err) => {
      console.log('error', err)
    })
    
    
    req.on('data', (chunk) => {
      chunks.push(chunk)
    })
    
    req.on('end', () => {
      const rawJSON = Buffer.concat(chunks).toString()
      console.log('data', rawJSON)
      const decoded = JSON.parse(rawJSON)
      onendCallback(decoded)
    }) }

  // membuat method GET
  getAll = (req, res) => {
    // this.#sendJSON(res, 200, this.#tasks)
    res.json(this.#tasks).status(200)
  }

  // membuat method POST
  create = (req, res) => {
    const {title} = req.body

    if(title == undefined || title.length < 3){
      req.json({
        status: STATUS_CODES[400],
        message: 'Title must be filled, and greater than 3 characters'
      }).status(400)
      return
    }
    const newTask = {id: randomUUID(), title: title, status: 'pending'}
    this.#tasks.push(newTask)
    res.json(newTask).status(201)
  }


  // membuat methode DELETE
  remove = (req, res) => {

    const {id} = req.params

    if(id == undefined){
      req.json({
        status: STATUS_CODES[400],
        message: 'ID is needed to do this action!'
      }).status(400)
      return
    }

    // temukan task dengan id yang dimaksud, dan mengembalikan -1 jika tidak ada
    const deletedTask = this.#tasks.find((task) => task.id === id)
    
    if(deletedTask === undefined) {
      req.json({
        status: STATUS_CODES[404],
        message: 'task not found'
      }).status(400)
      return
    }

    this.#tasks = this.#tasks.filter(task => task.id !== deletedTask.id)
    res.json(deletedTask).status(201)

  }

  update = (req, res) => {
      const {status} = req.body
      const {id} = req.params
      
      // handle kalo id gaada
      if(id == undefined){
        req.json({
          status: STATUS_CODES[400],
          message: 'id is required'
        }).status(400)
        return
      }

      // handle kalo status gaada
      if(status == undefined){
        req.json({
          status: STATUS_CODES[400],
          message: 'Status is required'
        }).status(400)
        return
      }

      const index = this.#tasks.findIndex((task) => task.id === id)
      
      if(index < 0) {
        req.json({
          status: STATUS_CODES[404],
          message: 'task not found'
        }).status(404)
        return
      }

      this.#tasks[index].status = status
      // this.#sendJSON(res, 201, this.#tasks[index])
      res.json(this.#tasks[index]).status(200)

  }
}

module.exports = { TaskController };