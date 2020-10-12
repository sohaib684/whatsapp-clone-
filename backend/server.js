const Message = require("./dbMessages.js");
const express = require("express");//importing
const mongoose = require("mongoose");

const body_parser = require("body-parser")

const app = express() //app config
const port = process.env.PORT || 9000
const connection_url = "mongodb://localhost:27017/mongo_database"; //db config 

const messageContent = require("./dbMessages");

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedToplogy: true
});
const db = mongoose.connection;
db.once("open",()=>{
    console.log("Db connected");
})

//app.use(body_parser());
app.use(express.json());

app.get('/', (req, res) => res.status(200).send("something")) //api routes
app.post('/message/new', (req, res) => {
    const dbMessaage = req.body;

    Message.create(dbMessaage, (err, data) => {
            if (err) 
                res.status(500).send(err)
            else 
                res.status(201).send(data)
    })
})
app.listen(port, () => console.log('listening on localhost:' + port));//listen