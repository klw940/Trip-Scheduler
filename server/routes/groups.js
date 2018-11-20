var express = require('express');
var bodyparser = require('body-parser');
const { MongoClient } = require('mongodb');
var router = express.Router();

/* GET users listing. */
router.use(bodyparser.json());

router.post('/', function(req, res, next) {

  const group = JSON.parse(req.body.user);
  MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true },
        (err, client) => {
            async function getList()
            {
                const db = client.db('Trip_Scheduler')
                const collection = db.collection('Group_Member')
                collection.find({}, { Group_id : group.id }).toArray(function (err, result) {
                    if (err) throw err;
                    res.send(result);
                    client.close();
                })
            }
            getList().then()

        }
    );    
});
//그룹맴버로 추가
router.post('/create',(req,res)=>{
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
