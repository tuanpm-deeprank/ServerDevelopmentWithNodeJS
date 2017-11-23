const assert = require('assert');

/*
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(document, (err, result) => {
        assert.equal(err, null);

        console.log("Inserted " + result.result.n 
            + " documents into the collection " + collection); // how many document are inserted
        callback(result);
    });

};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray( (err, docs) => {
        assert.equal(err, null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log("Removed the document ", document); // Test with case +
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, {$set :update}, null, (err, result) => {
        assert.equal(err, null);
        console.log("Updated document with ", update);
        callback(result);
    });
};
*/


exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.insert(document);
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, {$set :update}, null);
};