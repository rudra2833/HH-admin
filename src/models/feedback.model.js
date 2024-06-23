import mongoose, { Schema } from "mongoose";

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
    name: {
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
    message: {
        type: String,
        required: true,
    },
    rating: {
        type: Number, // Assuming rating will be a number
        required: true,
        min: 1, // Minimum rating value
        max: 5, // Maximum rating value
    },
},
{
    timestamps: true,
});

export const Feedback = mongoose.model('Feedback', feedbackSchema);