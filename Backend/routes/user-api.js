const express = require("express");
const router = express.Router();
const User = require("../models/users");
const mongo = require("mongodb");

// GET request
router.get("/", (req,res) => {
    User.find({}).then((user) => {
        res.json(user);
        console.log("mobile requested");
    });
});

// GET request to get all the accepted rides of a particular user
router.get("/:id",(req,res) => {
    User.findById(req.params.id).then(user => {
        if(!user)
            return res.status(404).end();
        res.json(user.acceptedRides).status(200);
        console.log("sending accepted rides list");
    });
});

//GET request to get details of a particular user
router.get("/info/:id",(req,res) => {
    User.findById(req.params.id).then(user => {
        if(!user)
            return res.status(404).end();
        res.json(user).status(200);
        console.log("sending specific user details");
    }).catch((err) => console.log(err));
})

// POST request -- add user to database
router.post("/", (req,res) => {
    console.log(req.body);
    User.create(req.body).then((user) => {
        res.send(user);
        console.log("user has been added to database");
        console.log(user);
    }).catch((err) => console.log(err));
});


// DELETE user -- ADMIN only !!!!
router.delete("/:id",(req,res) => {
    var id = req.params.id;
    User.deleteOne({ _id: mongo.ObjectID(id) },(err,results) => {
        res.send(results.result);
    })
});

module.exports = router;

