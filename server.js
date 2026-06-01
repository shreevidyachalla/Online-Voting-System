const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Vote = require("./models/vote");
const User = require("./models/user");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Voting Backend Running");
});


// ADD THIS PART HERE
app.post("/vote", async (req, res) => {

    const { voterId, candidate } = req.body;

    try {

        const existingVote = await Vote.findOne({ voterId });

        if(existingVote)
        {
            return res.send("You already voted!");
        }

        const newVote = new Vote({
            voterId,
            candidate
        });

        await newVote.save();

        res.send("Vote Submitted Successfully");

    }
    catch(error)
    {
        console.log(error);
        res.send("Error submitting vote");
    }
});

app.get("/results", async (req, res) => {

    const votes = await Vote.find();

    let modi = 0;
    let murmu = 0;
    let pawankalyan = 0;

    votes.forEach((vote) => {

        if(vote.candidate === "modi")
            modi++;

        else if(vote.candidate === "murmu")
            murmu++;

        else if(vote.candidate === "pawankalyan")
            pawankalyan++;
    });

    res.json({
        modi,
        murmu,
        pawankalyan
    });
});

app.get("/winner", async (req, res) => {

    const votes = await Vote.find();

    let modi = 0;
    let murmu = 0;
    let pawankalyan = 0;

    votes.forEach(vote => {

        if(vote.candidate === "modi")
            modi++;

        else if(vote.candidate === "murmu")
            murmu++;

        else if(vote.candidate === "pawankalyan")
            pawankalyan++;
    });

    let winner = "No Votes Yet";

    let max = Math.max(modi, murmu, pawankalyan);

    if(max > 0)
    {
        if(modi === max)
            winner = "Modi";

        else if(murmu === max)
            winner = "Murmu";

        else
            winner = "PawanKalyan";
    }

    res.json({ winner });
});

app.post("/register", async (req, res) => {

    const { name, voterId, password } = req.body;

    try
    {
        const existingUser =
            await User.findOne({ voterId });

        if(existingUser)
        {
            return res.send(
                "Voter ID already exists"
            );
        }

        const newUser =
            new User({
                name,
                voterId,
                password
            });

        await newUser.save();

        res.send(
            "Registration Successful"
        );
    }
    catch(error)
    {
        console.log(error);

        res.send(
            "Registration Failed"
        );
    }
});

app.post("/login", async (req, res) => {

    const { voterId, password } = req.body;

    try
    {
        const user =
            await User.findOne({
                voterId,
                password
            });

        if(!user)
        {
            return res.send(
                "Invalid Credentials"
            );
        }

        res.send(
            "Login Successful"
        );
    }
    catch(error)
    {
        console.log(error);

        res.send(
            "Login Failed"
        );
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});