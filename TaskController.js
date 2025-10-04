const { STATUS_CODES } = require('node:http')

class TaskController {
  
  #repo

  constructor(taskRepository){
    this.#repo = taskRepository
  }

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
    res.json(this.#repo.all()).status(200)
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
    const newTask = this.#repo.add(title)
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
    const {ok, data} = task.#repo.removeById(id)
    
    if(!ok) {
      req.json({
        status: STATUS_CODES[404],
        message: 'task not found'
      }).status(400)
      return
    }
    res.json(data).status(201)
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

      const {ok, data} = this.#repo.update(id, status)
      
      if(!ok) {
        req.json({
          status: STATUS_CODES[404],
          message: 'task not found'
        }).status(404)
        return
      }
      res.json(data).status(200)

  }
}

module.exports = { TaskController };