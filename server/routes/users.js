var express = require('express');
var bodyparser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
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
    loginCheck();
    getGroipList();
});

router.post('/create',(req,res)=>{
    const user = JSON.parse(req.body.user);
    var CreateGroup = async() => {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
        const db = await client.db('Trip_Scheduler').collection('User_Group')
        const result = await db.insertOne({ Group_Name:user.group, Member_ID : [user.email], Member_name : [user.name]  })
        res.send(result.ops);
        client.close();
        return result.ops[0];
    }
    var CreateEvents = async(rlt) => {
        const groupid = rlt._id.toString();
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
        const db = await client.db('Trip_Scheduler').collection('Events');
        await db.insertOne({ channel:groupid, events : []});
        client.close();
        return groupid;
    }
    var CreateCards = async(rlt) => {
        const groupid = rlt;
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
        const db = await client.db('Trip_Scheduler').collection('Cards');
        await db.insertOne({ channel:groupid, events : []});
        client.close();
    }
    CreateGroup()
    .then(result => CreateEvents(result))
    .then(result => CreateCards(result))
});

router.post('/delete', (req, res)=>{
    const user = JSON.parse(req.body.user);
    var indexOfEmail = async() => {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
        const db = await client.db('Trip_Scheduler')
        const User_Group = await db.collection('User_Group');
        const result = await User_Group.aggregate([
            { $project:{ index: { $indexOfArray: [ "$Member_ID", user.email ]}} }, 
            { $match: { _id:ObjectId(user._id)}}
        ]).toArray()
        client.close();
        return result;
    }
    var DeleteUser = async(indexOfEmail) => {
        const idindex = `Member_ID.${indexOfEmail.index}`;
        const nameindex = `Member_name.${indexOfEmail.index}`;
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
        const db = await client.db('Trip_Scheduler')
        const User_Group = await db.collection('User_Group');
        const result1 = await User_Group.findOneAndUpdate(
            { _id: ObjectId(user._id)},
            { $set: { [idindex] : null, [nameindex]: null }},
            {returnOriginal:false}
        );
        const result2 = await User_Group.update({_id: ObjectId(user._id)}, {$pull : { "Member_ID" : null, "Member_name" : null}});
        res.send(result1);
        client.close();
    }
    indexOfEmail()
    .then(result => DeleteUser(result[0]));
})
module.exports = router;
