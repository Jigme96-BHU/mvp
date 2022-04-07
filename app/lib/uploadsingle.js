const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads")
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: multer.memoryStorage()});
var singlefile = upload.single('myfile');

const uploadsingle = (req, res, next) => {
    singlefile(req, res, (err) => {
    if (req.fileValidationError) {
      req.uploadError = req.fileValidationError
    } else if (!req.file) {
      req.uploadError = 'file not found'
    } else if (err instanceof multer.MulterError) {
      req.uploadError = err.message
    } else if (err) {
      req.uploadError = err.message || err
    }
    next()
  })
}

module.exports = uploadsingle
