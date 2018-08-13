const multer = require('multer');
const fs = require('fs');
const dir = 'uploads/';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(".", Date.now() + "."));
  }
});

module.exports = {
  storage: storage
};
