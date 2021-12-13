const express = require("express");
const router = express.Router();
const Movie = require('../models/movies.model');

router.post("/", async (req, res) =>{
    try{
        const movie = await  Movie.create(req.body);
        console.log("Added a new Movie!");
        return res.status(201).send(movie);
    }
    catch(e){
        return res.status(500).json({message: e.message, status: "failed"});
    }
})