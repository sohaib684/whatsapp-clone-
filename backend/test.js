const express = require("express");
const body_parser = require("body-parser")

const app = express();

app.use(body_parser());
app.use(express.json());

const port = 8000;

app.post("/", (req, res) => {
    const hungry = req.body.hungry;

    if(hungry) res.send("Yes you are hungry");

    // res.send(hungry);
})

app.listen(port, err => { if(err) throw err; })