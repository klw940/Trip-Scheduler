var express = require('express');
var bodyparser = require('body-parser');
const { MongoClient } = require('mongodb');
var router = express.Router();

/* GET users listing. */
router.use(bodyparser.json());

router.post('/', function (req, res, next) {
    const group = JSON.parse(req.body.user);
    var getList = async () => {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
        const db = await client.db('Trip_Scheduler').collection('Group_Member');
        const result = await db.find({ Group_ID: group.id }).toArray();
        res.send(result);
        client.close();
    }
    getList();
});
//그룹맴버로 추가
router.post('/create', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true },
        (err, client) => {
            const db = client.db("Trip_Scheduler")
            const collection = db.collection('Group_Member')
            collection.insertOne({ name: req.body.name, Contact: req.body.contact }, (err, result) => {
                console.log("inserted one document")
                client.close();
            })
        }
    );
    res.redirect('/');
})
module.exports = router;
