const { default: mongoose } = require("mongoose");


export const connectDB = async()=>{

await mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
console.log('DB Connected')

}
