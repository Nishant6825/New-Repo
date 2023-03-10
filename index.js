const mongoose = require('mongoose');
const Dishes = require('./models/dishes')

const url = 'mongodb://127.0.0.1:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("Connected to server");
    Dishes.create({
        name: "Nishant",
        description: 'Test'
    })
    .then((dish)=>{
        console.log(dish)
        return Dishes.find({}).exec();

    })
    .then((dishes)=>{
        console.log(dishes)
        return Dishes.remove({})
    }) 
    .then(()=>{
        return mongoose.connection.close();
    }).catch((err)=>{
        console.log(err)
    })
})