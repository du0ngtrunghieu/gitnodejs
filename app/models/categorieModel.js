const db = require('../config/database')
const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;



var theloai = new Schema({
   
    nameTheLoai:{
        type: String , 
        
        unique : true
    },
    path :{
        type: String,
      
        unique : true
    },
    mota :{
        type: String,
      
        unique : true
    },
    
    ngaytao : { type: Date, default: Date.now },
    ngaysua : { type: Date, default: Date.now }
    
})
theloai.plugin(mongoosePaginate);
var theloai = mongoose.model('Categorie', theloai);

module.exports = {
    theloai:theloai

};