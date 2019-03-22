const mongoose = require('mongoose');
const app = require('./app');
const cron = require('node-cron');

cron.schedule("00 48 21 7 3 *", function() {
    console.log("Esta es una tarea que se ejecutara a las 9:48:00");
  });

mongoose.Promise = global.Promise;
var mongodb = "mongodb://localhost/portafolio";


mongoose.connect(mongodb,{useNewUrlParser:true})
    .then(()=>{
        app.listen(3000,()=>{
            console.log("listening in port 3000");
            
        });
       
    })
    .catch((err)=>{
        console.log(err);
    });

