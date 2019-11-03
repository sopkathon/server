var mongoose = require('mongoose')
var Schema = mongoose.Schema
// var imageSchema = new Schema({
//     imageDate: { type: Date, default: Date.now }
// })

var ansSchema = new Schema({
  keyword : String,
  output: Array
},{ versionKey: '_somethingElse' })

module.exports = mongoose.model('ans',ansSchema)