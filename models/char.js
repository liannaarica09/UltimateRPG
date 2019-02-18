const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const charSchema = new Schema({
    name: { type: String, required: true },
    attributes: { type: Array, required: true },
    skills: { type: Array, required: true },
    traits: { type: Array, required: true },
    stuff: { type: Array },
    goal: { type: String, required: true },
    personality: { type: String, required: true },
    background: { type: String, required: true },
    gameSystem: { type: String, required: true },
    user: { type: String, required: true },
    gMaster: { type: String }
});

const Char = mongoose.model("Char", charSchema);

module.exports = Char;