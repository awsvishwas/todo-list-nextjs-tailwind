const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
    title:{
        type: String, required: true
    },
    description:{
        type: String, required: true
    },
    isComplete:{
        type: Boolean, default: false
    },
    tag:{
        type: String, required:true
    },
    classification:{
        type: String, required:true
    },
    dueDate:{
        type: String, required:true
    },
},
{
    timeStamp: true
})

export const TodoModel = mongoose.models.todo ||mongoose.model('todo',TodoSchema)