const mongoose = require ("mongoose");

const NoteSchema = new mongoose.Schema({
    title :{
        type:String,
        required:true,
        trim:true,
        maxlength:50,
        },
        description:{
            type:String,
            required:true,
            trim:true,
            minlength:3,
            maxlength:50,
            },
            completed:{
                type:Boolean,
                default:false,
                },},
                { timestamps: true }
);

module.exports = mongoose.model("Notes", NoteSchema);