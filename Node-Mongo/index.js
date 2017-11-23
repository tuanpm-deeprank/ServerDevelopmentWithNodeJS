const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');
const url = "mongodb://localhost:27017/conFusion";

/*
MongoClient.connect(url, (err, db) => {
    assert.equal(err, null);

    console.log("Connected correctly to server");
    
    const collection = db.collection("dishes");
    
    collection.insertOne({"name":"Pizza", "description":"Test"}, 
    (err, result) => {
        assert.equal(err, null);

        console.log("After Insert:\n");
        console.log(result.ops);

        collection.find({}).toArray( (err, docs) => {
            assert.equal(err, null);

            console.log("Found:\n");
            console.log(docs);

            db.dropCollection("dishes", (err, result) => {
                assert.equal(err, null);

                db.close();
            });
        });
    }); 
    */
    /*
    dboper.insertDocument(db, {name : "Vadonut", description : "Test"}, 
        "dishes", (result) => {
            console.log("Inserted Document: \n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found  Documents:\n", docs);
                console.log("***");

                dboper.updateDocument(db, {name : "Vadonut"}, {description : "Updated Test"}, "dishes",
                (result) => {
                    console.log("Updated Document:\n", result.result);
                    console.log("***");

                    dboper.findDocuments(db, "dishes", (docs) => {
                        console.log("Found Updated Documents:\n", docs);
                        console.log("*+*");

                        db.dropCollection("dishes", (result) => {
                            console.log("Dropped Collection: ", result);
                            console.log("***");

                            db.close();
                        });
                    });
                });
            });
        }); 
    */
MongoClient.connect(url).then( (db) => {
    console.log("Connected correctly to server");
    dboper.insertDocument(db, {name : "Vadonut", description : "Test"}, 
        "dishes")
        .then( (result) => {
            console.log("Inserted Document: \n", result.ops);
            console.log("\n\n");

            return dboper.findDocuments(db, "dishes");
         })
        .then( (docs) => {
            console.log("Found  Documents:\n", docs);
            console.log("\n\n");
            
            return dboper.updateDocument(db, {name : "Vadonut"}, {description : "Updated Test"}, "dishes");
        })
        .then ( (result) => {
            console.log("Updated Document:\n", result.result);
            console.log("\n\n");

            return dboper.findDocuments(db, "dishes");
        })
        .then( (docs) => {
            console.log("Found Updated Documents:\n", docs);
            console.log("\n\n");

            return db.dropCollection("dishes");
        })
        .then( (result) => {
            console.log("Dropped Collection: ", result);

            db.close();
        })
        .catch( (err) => console.log(err) );
}).catch( (err) => console.log(err));
