const express = require("express");
const router = express.Router();
const Request = require("../models/requests");
const User = require("../models/users");
const mongo = require("mongodb");


// POST request(from Users) - adds the requests from users to Request collection
router.post("/", (req,res) => {
    Request.create(req.body).then((request) => {
        res.send(request);
        console.log("Succesfully added request", req.body);
    });
});

// GET request(to Drivers) - sends all request to drivers
router.get("/", (req,res) => {
    Request.find({}).then((request) => {
        res.send(request);
        console.log("requests have been sent to driver");
    });
});


// PUT request - accepted driver requests are added to "acceptedRides" field in User collection
router.put("/:id", (req,res) => {
    User.updateOne({_id:req.params.id}, {$push: {"acceptedRides":req.body}})
    .then((ride) => {
        console.log("ride offer is added to accepted Rides list");
        res.send(ride);
    }).catch((err) => console.log(err));
});


// DELETE request -- ADMIN only!!!
router.delete("/:id",(req,res) => {
    var id = req.params.id;
    Request.deleteOne({ _id: mongo.ObjectID(id) },(err,results) => {
        res.send(results.result);
        console.log("deleted");
    })
});

module.exports = router;