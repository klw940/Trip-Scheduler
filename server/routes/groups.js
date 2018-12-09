var express = require('express');
var bodyparser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
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
    MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true },
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
router.post('/addmember', (req, res) => {
    const group = JSON.parse(req.body.user);
    console.log(group)
    var memberCheck = async () => {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
        const db = await client.db('Trip_Scheduler').collection('loginMember');
        const result = await db.find({ id: group.newMemberid }).toArray();
        client.close();
        return result;
    }
    var addMember = async (rlt) => {
        if (!rlt[0]) res.end("errrrrrr");
        else {
            console.log(rlt);
            rlt = rlt[0];
            const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
            const db = await client.db('Trip_Scheduler').collection('User_Group');
            const result = await db.findOneAndUpdate(
                { _id: ObjectId(group.groupid) },
                { $push: { "Member_ID": rlt.id, "Member_name": rlt.name } },
                {returnOriginal:false}
            )
            console.log(result);
            res.send(result);
            client.close();
        }
    }
    memberCheck().then(result => addMember(result));

})


module.exports = router;
