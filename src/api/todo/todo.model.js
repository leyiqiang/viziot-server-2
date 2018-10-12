const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

TodoSchema.index({
  created: -1,
})


const TodoString = 'Todo'
const TodoModel = mongoose.model(TodoString, TodoSchema)

module.exports = {
  TodoString,
  TodoSchema,
  TodoModel,
}
