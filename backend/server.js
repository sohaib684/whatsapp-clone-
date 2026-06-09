const Message = require("./dbMessages.js");
const express = require("express"); //importing
const mongoose = require("mongoose");
const Pusher = require("pusher");
const cors = require('cors');
const app = express() //app config
const port = process.env.PORT || 9000
const connection_url = process.env.MONGODB_URI ||
    "mongodb+srv://alam1:Welfare%40123@cluster0.8bttnyn.mongodb.net/whatsappdb?retryWrites=true&w=majority";

const pusher = new Pusher({
    appId: '1087028',
    key: '092a44cb9ee81bb0c1c4',
    secret: '9ac60b8d16368a96090d',
    cluster: 'ap2',
    useTLS: true
});

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err) => {
    console.error("MongoDB connection failed:", err.message);
});

const db = mongoose.connection;
db.on("error", (err) => {
    console.error("MongoDB error:", err.message);
});

db.once("open", () => {
    console.log("DB connected");
    const msgCollections = db.collection("messagecontents");
    const changeStream = msgCollections.watch();
    changeStream.on("change", (change) => {
        console.log("change occured", change);
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                _id: messageDetails._id,
                name: messageDetails.name,
                message: messageDetails.message,
                contact: messageDetails.contact,
                timestamp: messageDetails.timestamp,
                recieved: messageDetails.recieved,
            });
        } else {
            console.log('Error triggering Pusher')
        }
    });
});

app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => res.status(200).send("something")) //api routes
app.get('/health', (req, res) => {
    res.status(200).send({
        server: "running",
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
        databaseState: mongoose.connection.readyState
    });
});

app.post('/message/new', (req, res) => {
    const dbMessaage = req.body;

    Message.create(dbMessaage, (err, data) => {
        if (err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
    })
})

app.delete('/message/clear/:contact', (req, res) => {
    const contact = req.params.contact;
    const deleteFilters = [{ contact: contact }];

    if (req.query.includeLegacy === "true") {
        deleteFilters.push(
            { contact: { $exists: false } },
            { contact: "" },
            { contact: null }
        );
    }

    Message.deleteMany({
        $or: deleteFilters
    }, (err, data) => {
        if (err)
            res.status(500).send(err)
        else
            res.status(200).send(data)
    })
})

app.get("/message/sync", (req, res) => {
    Message.find({}, (err, data) => {
        if (err) throw err;

        res.send(data);
    });
})
app.listen(port, () => console.log('listening on localhost:' + port)); //listen
