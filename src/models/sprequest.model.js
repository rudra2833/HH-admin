import mongoose from "mongoose";

const request = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phoneno: {
        type: String,
        required: true,
        trim: true,
    },

    status:{
        type: String,
        enum: ['pending','checked']
    },

    action: {
        type: String,
        enum:['accepted','rejected']
    },
},
{
    timestamps: true,
});

export const Sprequest = mongoose.model('Newsp-requests', request);