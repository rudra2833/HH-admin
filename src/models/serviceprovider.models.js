// import mongoose, { Schema } from "mongoose";


// const review = new Schema({
//     username: {
//         type: String,
//         required: true,
//         lowercase: true,
//         trim: true,
//     },
//     rating: {
//         type: Number, // Assuming rating will be a number
//         required: true,
//         min: 1, // Minimum rating value
//         max: 5, // Maximum rating value
//     },
//     review: {
//         type: String,
//         required: true,
//     }

// })

// const book = new Schema({

//     timeslot: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: Boolean,
//         required: true,
//     }
// });


// // create a pipeline
// const pastbooks = new Schema({
    
//     bookingid: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Booking'
//     },
// },
//     {
//         timestamps: true,
//     }
// );

// const serviceInfo = new Schema({

//     providername: {
//         type: String,
//         required: true,
//         lowercase: true,
//         trim: true,
//     },

//     // email: {
//     //     type: String,
//     //     required: true,
//     //     unique: true,
//     //     lowercase: true,
//     //     trim: true,
//     // },

//     // phoneno: {
//     //     type: String,
//     //     required: true,
//     //     trim: true,
//     // },

//     // adharno: {
//     //     type: String,
//     //     required: true,
//     //     trim: true,

//     // },

//     // birthday: {
//     //     type: Date,
//     //     required: true,
//     // },

//     // password: {
//     //     type: String,
//     //     required: true,
//     //     lowercase: true,
//     //     trim: true,
//     //     unique: true,
//     // },

//     category: {
//         type: String,
//         required: true,
//     },

//     charges: {
//         type: Number,
//         required: true,
//         trim: true,
//     },

//     // create a pipe line for that
//     // or edit it when anyone rates the provider
//     // rating: {
//     //     type: Number, // Assuming rating will be a number
//     //     default: 0,
//     //     min: 1, // Minimum rating value
//     //     max: 5, // Maximum rating value
//     // },

//     availability: {
//         type: Boolean,
//         required: true,
//     },

//     city: {
//         type: String,
//         required: true,
//         lowercase: true,
//         trim: true,
//     },

//     reviewers: {
//         type: [review],
//     },

//     pincodes: {
//         type: [String],
//         required: true,
//     },

//     // slot: {
//     //     type: [book],
//     //     required: true,
//     // },

//     // pastBooking: {
//     //     type: [pastbooks],
//     //     required: true,
//     // }

// }, {
//     timestamps: true,
// })

// export const ServiceInfo = mongoose.model('serviceinfo', serviceInfo);



































































import mongoose, { Schema } from "mongoose";


const review = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    rating: {
        type: Number, // Assuming rating will be a number
        required: true,
        min: 1, // Minimum rating value
        max: 5, // Maximum rating value
    },
    review: {
        type: String,
        required: true,
    }

})

const book = new Schema({
    timeslot: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
});


// create a pipeline
const pastbooks = new Schema({
    
    bookingid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    },
},
    {
        timestamps: true,
    }
);

const serviceInfo = new Schema({

    providername: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
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

    adharno: {
        type: String,
        required: true,
        trim: true,
    },

    birthday: {
        type: Date,
        required: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    category: {
        type: String,
        required: true,
    },

    charges: {
        type: Number,
        required: true,
        trim: true,
    },

    // create a pipe line for that
    // or edit it when anyone rates the provider
    rating: {
        type: Number, // Assuming rating will be a number
        default: 0,
        max: 5, // Maximum rating value
    },

    availability: {
        type: Boolean,
        required: true,
    },

    city: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },

    reviewers: {
        type: [review],
    },

    pincodes: {
        type: [String],
        required: true,
    },

    slot: {
        type: [book],
        required: true,
        default: [
            { timeslot: "Morning", status: true },
            { timeslot: "Afternoon", status: true },
            { timeslot: "Evening", status: true },
            { timeslot: "Night", status: true }
        ]
    },

    pastBooking: {
        type: [pastbooks],
    }

}, {
    timestamps: true,
})

export const ServiceInfo = mongoose.model('serviceinfo', serviceInfo);