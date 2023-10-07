const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uni_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  Thursday: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  Friday: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('User', usersSchema)
