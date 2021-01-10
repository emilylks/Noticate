var express = require('express');
var router = express.Router();
const db = require('./../db/db.js');

const multer = require("multer"); 
const uuid = require("uuid").v4;

var mongodb = require('mongodb');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
      const { originalname } = file;
      cb(null, originalname); 
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const upload = multer({storage})
const app = express();
router.use(express.static('public'));

router.post("/upload", upload.single('avatar'), (req, res) => {
    return res.json({status: "OK"});
});

router.get('/thelist', function(req, res) {
	res.set({
		"Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
	});
	res.json({body: "Testing get request"});
});

/*
router.get('/thelist', function(req, res){
	MongoClient.connect(url, function(err, db){
		if(err){
			console.log("unable to connect", err);
		}
		else{
			console.log("connection established");
			var collection = db.collection('students');
			collection.find({}).toArray(function(err, result){
				if(err){
					res.send(err);
				}
				else if(result.length){
					console.log(collection.find());
					res.send({"success":"SUCCESS!!!", "data":result});
				}
				else
					res.send("no documents found");
			db.close();
			});
		}
	});
});
*/

module.exports = router;
