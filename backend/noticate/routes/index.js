var express = require('express');
var router = express.Router();
const db = require('./../db/db.js');

const multer = require("multer"); 
const uuid = require("uuid").v4;

const AWS = require('aws-sdk');
const fs = require('fs');

// The name of the bucket that you have created
const BUCKET_NAME = 'noticate';

var mongodb = require('mongodb');
var filenameorg;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
      const { originalname } = file;
	filenameorg = originalname;
      cb(null, originalname); 
  }
})

const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'cat.jpg', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const upload = multer({storage})
const app = express();
router.use(express.static('public'));

router.post("/upload", upload.single('avatar'), (req, res) => {
	uploadFile(`uploads/${filenameorg}`);
    	console.log(filenameorg);
	return res.json({status: "OK"});
});

router.get('/thelist', function(req, res) {
	res.set({
		"Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "http://ec2-18-189-16-11.us-east-2.compute.amazonaws.com:3000",
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
