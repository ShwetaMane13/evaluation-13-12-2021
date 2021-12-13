const express = require("express");
const router = express.Router();
const Show = require('../models/shows.model');

router.get("/", async (req, res) =>{
    try{
        const shows = await  Show.create(req.body);
        console.log("Got all the shows for you!");
        return res.status(201).send( {shows} );
    }
    catch(e){
        return res.status(500).json({message: e.message, status: "failed"});
    }
})