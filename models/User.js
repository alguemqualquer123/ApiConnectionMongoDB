import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: { 
        type: Number,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    createaAt: {
        type: Date,
        default: Date.now()
    }
})
const User = mongoose.model('User', userSchema)
export { User } 