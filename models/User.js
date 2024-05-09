import mongoose from "mongoose";

const userAdminsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    discordId: {
        type: String,
        required: true,
    },
    roles: {
        type: [{
            role: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
        }],
        required: true,
    },
});


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
const userAuth = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Resource: {
        type: String,
        required: true,
    },
    Token: {
        type: String,
        required: true,
    },
    DiscordId: {
        type: Number,
        required: true,
    },
    Ip: {
        type: String,
        required: true,
    },
    createaAt: {
        type: Date,
        default: Date.now()
    }
})
const User = mongoose.model('User', userSchema)
const Auth = mongoose.model('Auth', userAuth)
const Admins = mongoose.model('Admins', userAdminsSchema)
export { User, Auth, Admins } 