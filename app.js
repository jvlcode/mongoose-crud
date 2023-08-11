const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const exhbs = require('express-handlebars');
const dbo = require('./db');
dbo.getDatabase();
const Book = require('./models/bookModel')
// const ObjectID = dbo.ObjectID;

app.engine('hbs',exhbs.engine({
    layoutsDir:'views/',
    defaultLayout:"main",
    extname:"hbs",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))
app.set('view engine','hbs');
app.set('views','views');
app.use(bodyparser.urlencoded({extended:true}));
app.get('/',async (req,res)=>{
    // let database = await dbo.getDatabase();
   
    // const collection = database.collection('books');
    // const cursor = collection.find({})
    // let books = await cursor.toArray();
    let books = await Book.find({});
    console.log(books);

    let message = '';
    let edit_id, edit_book;

    if(req.query.edit_id){
        edit_id = req.query.edit_id;
        // edit_book = await collection.findOne({_id:ObjectID(edit_id)})
        edit_book = await Book.findOne({_id:edit_id})
    }

    if (req.query.delete_id) {
        // await collection.deleteOne({_id:ObjectID(req.query.delete_id)})
        edit_book = await Book.deleteOne({_id:req.query.delete_id})
        return res.redirect('/?status=3');
    }
    
    switch (req.query.status) {
        case '1':
            message = 'Inserted Succesfully!';
            break;

        case '2':
            message = 'Updated Succesfully!';
            break;

        case '3':
            message = 'Deleted Succesfully!';
            break;
    
        default:
            break;
    }


    res.render('main',{message,books,edit_id,edit_book})
})

app.post('/store_book',async (req,res)=>{
    // let database = await dbo.getDatabase();
    // const collection = database.collection('books');
    // let book = { title: req.body.title, author: req.body.author  };
    const book = new Book({ title: req.body.title, author: req.body.author  });
    // await collection.insertOne(book);
    await book.save();
    return res.redirect('/?status=1');
})

app.post('/update_book/:edit_id',async (req,res)=>{
    // let database = await dbo.getDatabase();
    // const collection = database.collection('books');
    // let book = { title: req.body.title, author: req.body.author  };
    let edit_id = req.params.edit_id;

    // await collection.updateOne({_id:ObjectID(edit_id)},{$set:book});
    await Book.findOneAndUpdate({_id: edit_id},{ title: req.body.title, author: req.body.author  })
    return res.redirect('/?status=2');
})

app.listen(8000,()=>{console.log('Listening to 8000 port');})
