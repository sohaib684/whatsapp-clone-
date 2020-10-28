const Message = require("./dbMessages.js");
const express = require("express");//importing
const mongoose = require("mongoose");
 const Pusher =require("pusher");
const body_parser = require("body-parser")
const cors = require('cors');
const app = express() //app config
const port = process.env.PORT || 9000

 const pusher = new Pusher({
     appId: '1087028',
     key: '092a44cb9ee81bb0c1c4',
     secret: '9ac60b8d16368a96090d',
     cluster: 'ap2',
     encrypted: true
   });
 const connection_url = "mongodb+srv://root:gT9GFoquvxCBUjDL@cluster0.7fgmm.mongodb.net/whatsappdb?retryWrites=true&w=majority";; //db config 

const messageContent = require("./dbMessages");

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db =mongoose.connection;
db.once("open",()=> {
    console.log("DB connected");
    const msgCollections =db.collection("messagecontents");
    const changeStream =msgCollections.watch();
    changeStream.on("change", (change) => {
        console.log("change occured",change);
        if(change.operationType === 'insert') {
            const messageDetails =change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                name : messageDetails.name,
                message :messageDetails.message,
                timestamp : messageDetails.timestamp,
                recieved :messageDetails.recieved,
            }
            );
        } else {
            console.log('Error triggering Pusher')
        }
    });
});

app.use(body_parser());
app.use(express.json());//middleware
app.use(cors());

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

app.get("/message/sync", (req, res) => {
    Message.find({}, (err, data) => {
        if(err) throw err;

        res.send(data);
    });
})
app.listen(port, () => console.log('listening on localhost:' + port));//listen