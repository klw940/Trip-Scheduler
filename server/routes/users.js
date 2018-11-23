var express = require('express');
var bodyparser = require('body-parser');
const { MongoClient } = require('mongodb');
var router = express.Router();

/* GET users listing. */
router.use(bodyparser.json());

router.post('/', function(req, res, next) {
    const user = JSON.parse(req.body.user);
    var getGroipList = async () => {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
        const db = await client.db('Trip_Scheduler')
        const User_Group = await db.collection('User_Group');
        const result = await User_Group.find({ User_ID: user.email }).toArray();
        // req.session['Group_List'] = result;
        res.send(result);
        client.close();
        }
    getGroipList();

});

router.post('/create',(req,res)=>{
    const user = JSON.parse(req.body.user);
    var CreateGroup = async() => {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
        const db = await client.db('Trip_Scheduler').collection('User_Group')
        const result = await db.insertOne({ Group_Name:user.group, User_ID : user.email, Member : [user.name] })
        res.send(result);
        client.close();
    }
    CreateGroup();
});
module.exports = router;
