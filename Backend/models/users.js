const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Create a schema for an instance in user collection
const UserSchema = new schema({
    name : {
        type : String,
        required : true
    },
    branch : {
        type : String,
        required : true
    },
    year : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    acceptedRides : {
        type : Array,
        "default" : [],
        required : false
    }
});


// Creating a collection
const User = mongoose.model("user",UserSchema);
module.exports = User;