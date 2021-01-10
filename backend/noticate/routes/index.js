var express = require('express');
var router = express.Router();
const db = require('./../db/db.js');
const User = db.User;

const multer = require("multer"); 
const uuid = require("uuid").v4;

const AWS = require('aws-sdk');
const fs = require('fs');

// The name of the bucket that you have created
const BUCKET_NAME = 'noticate';

// Enter copied or downloaded access ID and secret key here
const ID = 'AKIAIFRZMM5F55JW2HOQ';
const SECRET = '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';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

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

var url;
const uploadFile = async (fileName) => {
	console.log("TRYING TO UPLOAD FILE");
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: filenameorg, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    await s3.upload(params, async function(err, data) {
        if (err) {
            throw err;
        }
        
	console.log(`File uploaded successfully. ${data.Location}`);
	url = data.Location;
	return;
    });

    return;
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const upload = multer({storage})
const app = express();
router.use(express.static('public'));

router.post("/upload", upload.single('avatar'), async (req, res) => {

	await uploadFile(`uploads/${filenameorg}`);
	await new Promise(r => setTimeout(r, 1000));
	console.log("Trying to upload");
	JSON.stringify(req.body);
	console.log(req.body);

	//var params = {Bucket: BUCKET_NAME, Key: filenameorg};
	//s3.getSignedUrl('putObject', params, function (err, url) {
  	//	console.log('The URL is', url);
	//});

	try {
		console.log(req.body.userId);
		console.log("url = ", url);
		let user = await User.findOne({ userId: req.body.userId }); 
		if (user === null)
			throw 'User Not Found';

		var files = user.files;
		files.push({filename: filenameorg, url: url, tags: req.body.tags});	
		//console.log("filename = ", filenameorg);
		console.log("files = ", files);
		
		console.log(user.userId);
		console.log(user.friends);
		await User.replaceOne({userId: user.userId}, { userId: user.userId, friends: user.friends, files: files});
		console.log(user);

		console.log("Pushed file");
		return res.json({status: "OK"});
	}
	catch (error) {
		console.log("Could not add file to database");
	}
		
	return res.json({status: "OK"});
});

router.get('/files', async function(req, res) {
	res.set({
		"Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "http://ec2-18-189-16-11.us-east-2.compute.amazonaws.com:3000",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
	});
	
	console.log("Trying to get user's files");
	console.log(req.body);
	try {
		let user = await User.findOne({userId: req.body.userId});
		console.log(user);
		let files = user.files;
		let links = files.map(a=>a.url);
		res.json({files: links, msg: "Success"});	
	}	
	catch(error) {
		console.log("Could Not get user's files");
	}
	
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
