
////Dependencies//

require("dotenv").config(); //retrieves variables in the .env folder
const path = require('path');
const express = require ("express"); // Web Framework
// const morgan = require("morgan");//Logging
const mongoose = require('mongoose')
const methodOverride = require("method-override");// Overide the request method
const song = require("./Models/songs")
//const songsSeedData = require("./Models/songsSeed");
/////////////////////////////////////////////////////////////////////////////
const app = express();
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'app/views'))
/////Middleware////////////////////////////////
// app.use(morgan("tiny"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use("/static", express.static("static"))
///////////////////////////////////////////////


//Mongoose Connection////////////////////////
const DATABASE_URL= process.env.DATABASE_URL

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err.message + " is mongo not running?"));
db.on('connected', ()=> console.log('mongoose connected'));
db.on('disconnected', () => console.log("mongo disconnected"));
///////////////////////////////////////////////////////////////////////

////Routes Index, New, Delete, Update, Create, Show

///Index Route
/// First route is the home page of the app.

/// Home Route
app.get("/", (req, res)=>{
        res.render("home.ejs")
    })


//////Index Route//

app.get("/songs", (req,res)=>{
    song.find({}, (err, allSongs) =>{
        res.render("index.ejs", {songs: allSongs})

    })
})

    
// /////// Seed Data Route
// app.get("/songs/seed",(req,res)=>{
//     song.deleteMany({},(err, deletedSongs)=>{
//         song.create(songsSeedData, (err, data) =>{
//             res.redirect("/songs")
//         })
//     })
// })

//////////New Route
app.get("/songs/new", (req, res)=>{
    res.render("new.ejs", {song})
})


/////////Delete Route
app.delete("/songs/:id", (req, res) =>{
    song.findByIdAndDelete(req.params.id, (err, deletedSong) => {
        console.log(err)
        res.redirect("/songs")
    })
})

//////////////Update//////////////
app.put("/songs/:id", (req, res) =>{
    song.findByIdAndUpdate(req.params.id, req.body,(err, updatedSong)=>{
        res.redirect(`/songs ${req.params.id}`)
    })
})

////////Create Route
app.post("/songs", (req,res)=>{
    song.create(req.body, (err, newSong) =>{
        console.log(newSong)
        res.redirect("/songs")
});
});

///////Edit Route/////
app.get("/songs/:id/edit", (req,res) =>{
    song.findById(req.params.id, (err, song) =>{
        res.render("edit.ejs",{song})
    })
})

///Show Route
app.get("/songs/:id", (req,res)=>{  
    song.findById(req.params.id, (err,song) =>{
    res.render("show.ejs",{song} )
    })
})

////Listen//////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('PORT Listening'))