var express = require('express');
var bodyparser = require('body-parser');
const { MongoClient } = require('mongodb');
var router = express.Router();

/* GET users listing. */
router.use(bodyparser.json());

router.post('/', function(req, res, next) {
  const user = JSON.parse(req.body.user);
  MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true },
        (err, client) => {
            async function getList()
            {
                const db = client.db('Trip_Scheduler')
                const collection = db.collection('User_Group') ///group member들도 한번에 가져올 것
                collection.find({}, { User_ID : user.email }).toArray(function (err, result) {
                    if (err) throw err;
                    res.send(result);    
                    client.close();
                })
            }
            getList().then()

        }
    );    
});
//그룹 생성
router.post('/create',(req,res)=>{
const user = JSON.parse(req.body.user);
  MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true },
      (err, client) => {
          const db = client.db("Trip_Scheduler")
          const collection = db.collection('User_Group')
          collection.insertOne({ User_ID : user.email, Group_Name:user.group }, (err, result) => {
              client.close();

              ///그룹멤버도 추가해주기
              res.send(result);
          })
      }
  );
})
module.exports = router;
