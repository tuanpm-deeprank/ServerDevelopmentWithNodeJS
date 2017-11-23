const mongoose = require('mongoose');
// Mongoose will use bluebird ad third-lib for Promise
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, {
    useMongoClient: true
});

connect.then( (db) => {
    console.log("Connected correctly to server");

    /*db.collection("dishes").drop( (result) => {
        console.log("Droped: ", result);
    });*/

    /*var newDish = Dishes( {
        name : "Pizza", 
        description: "Test"
    });

    newDish.save()
    */
    Dishes.create({
        name : "Pizza", 
        description: "Test"
    })
    .then ( (dish) => {
        console.log("\n***\n");
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {
                description : "Updated Test"
            }
        }, {
            new : true
        }).exec();
    })
    .then ( (dish) => {
        console.log("\n***\n");
        console.log(dish);

        dish.comments.push({
            rating: 5, 
            comment: 'Nice!!!',
            author: 'TuanPM'
        });

        return dish.save();
    })
    .then( (dish) => {
        console.log(dish);
        return db.collection("dishes").drop();
    })
    .then ( () => {
        console.log("\n***\n");
        return db.close();
    })
    .catch ( (err) =>  console.log(err));
});

