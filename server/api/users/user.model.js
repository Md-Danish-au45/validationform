const mongoose = require("mongoose");

const usersSchema  = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: { type: String,enum: ['Turky', 'USA', 'india'], required: true },
    state: { type: String,enum: ['Bangalore', 'Delhi', 'Mumbai'], required: true },
    city: { type: String,enum: ['dwarka', 'najafgarh', 'pritampura'], required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: Date, required: true },
    age: { type: Number, required: true },
    
    createdOn: { type: Date, default: Date.now() },
    updatedOn: { type: Date, default: Date.now() },

},
    { minimize: false  }

)

module.exports =  mongoose.model("validation", usersSchema)