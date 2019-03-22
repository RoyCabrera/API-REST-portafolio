var moongose = require('mongoose');
var Schema = moongose.Schema;

var ProjectSchema = Schema({
    name:String,
    description:String,
    category:String,
    langs:String,
    year:String,
    image:String
});

module.exports = moongose.model('project',ProjectSchema);
