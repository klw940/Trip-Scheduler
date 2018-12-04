var express = require('express');
var bodyparser = require('body-parser');
const { MongoClient } = require('mongodb');
var router = express.Router();

/* GET users listing. */
router.use(bodyparser.json());

router.post('/', function(req, res, next) {
    const user = JSON.parse(req.body.user);
    var loginCheck = async () => {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
        const db = await client.db('Trip_Scheduler')
        const loginMember = await db.collection('loginMember');
        const result = await loginMember.updateOne(
            { id: user.email },
            { $set: { id: user.email, name: user.name }},
            { upsert: true }
        );
        client.close();
    }
    var getGroipList = async () => {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
        const db = await client.db('Trip_Scheduler')
        const User_Group = await db.collection('User_Group');
        const result = await User_Group.find({Member_ID: {$elemMatch:{$eq:user.email}} }).toArray();
        res.send(result);
        client.close();
    }
    loginCheck().then();
    getGroipList();
});

router.post('/create',(req,res)=>{
    const user = JSON.parse(req.body.user);
    var CreateGroup = async() => {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
        const db = await client.db('Trip_Scheduler').collection('User_Group')
        const result = await db.insertOne({ Group_Name:user.group, Member_ID : [user.email], Member_name : [user.name]  })
        console.log(result.ops);
        res.send(result.ops);
        client.close();
    }
    CreateGroup();
});
module.exports = router;
