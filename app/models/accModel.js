const db = require('../config/database')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autoIncrement = require('mongoose-auto-increment');

var accSchema = new Schema({
    userID: {
        type: Number, 
        required: true, 
        unique: true},
    email: {
        type: String, 
        required: true, 
        unique: true},
    
    
    image:
    {
        type:String,
        required: true
    }
    ,
    displayName :{
        type: String, 
        required: true
    } , 
    role:  { 
        type: String, 
        required: true,
        default : 'user'
        },
	dateAdded : { type: Date, default: Date.now },
})

var accouts = mongoose.model('accouts', accSchema);


module.exports = {
    accouts:accouts

};