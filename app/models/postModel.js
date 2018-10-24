const db = require('../config/database')
const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const autoIncrement = require('mongoose-auto-increment');

var postSchema = new Schema({
    tieude: {
        type: String, 
    
        },
    noidung: {
        type: String, 
     
        },
    
    
    theloai:
    {
        type:String,
      
    }
    ,
    menu :{
        type: String, 
        
    } , 
    thumb:  { 
        type: String, 
        
      
        },
    ngaytao : { type: Date, default: Date.now },
    ngaysua : { type: Date, default: Date.now },
    path :{
        type : String
    }
})
postSchema.plugin(mongoosePaginate);
var post = mongoose.model('post', postSchema);


module.exports = {
    post:post

};