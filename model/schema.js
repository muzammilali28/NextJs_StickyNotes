const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Please add a title"], unique: true },
    description: {type: String, required: [true, "Please add some description"]}
});

module.exports = mongoose.models.Notes || mongoose.model("Notes",NotesSchema);