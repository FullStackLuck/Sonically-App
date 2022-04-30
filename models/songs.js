const mongoose = require("mongoose"); //Connects to the Database
const Schema = mongoose.Schema

const songSchema = new mongoose.Schema({
    title: "String",
    artist: "String",
    genre:"String",
    rank: Number,
},{timestamps: true})

const song = mongoose.model('Song', songSchema)

module.exports = song;