var express = require('express');
var router = express.Router();

const multer = require("multer"); 
const uuid = require("uuid").v4;

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

module.exports = router;
