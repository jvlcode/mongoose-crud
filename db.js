const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;
const mongoose = require('mongoose');





// let database;

async function getDatabase(){
//     const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
//     database = client.db('library');

//     if (!database) {
//             console.log('Database not connected');
//     }

//     return database;
    mongoose.connect('mongodb+srv://logesh:'+encodeURIComponent('Test@123')+'@cluster0.ny557rk.mongodb.net/?retryWrites=true&w=majority').then(() => {
        console.log('Database connected')
    }).catch((err) => {
        console.log('Connection error!', err)
    })
}



module.exports = {
    getDatabase,
    // ObjectID
}