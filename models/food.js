const pry = require('pryjs')
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Food {
  static all(){
    return database('foods').select('id', 'name', 'calories')
  }

  static find(id){
    return database('foods').where('id', id).select('id', 'name', 'calories')
    .then(rows => rows[0])
  }

  static create(attributes){
    return database('foods').returning(['id', 'name', 'calories']).insert(attributes)
    .then(rows => rows[0])
  }
}

module.exports = Food
