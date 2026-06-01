const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    voterId: {
        type: String,
        required: true,
        unique: true
    },

    candidate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Vote", voteSchema);