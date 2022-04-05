const multer = require('multer')
const path = require('path')
const express = require('express')
const app = express()
// const publicDirectory = path.join(__dirname, './public');
// app.use(express.static(publicDirectory));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads")
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// const imageFilter = function (req, file, cb) {
//   // Accept images only
//   if (!file.originalname.match(/\.(pdf)$/)) { //jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF
//     req.fileValidationError = 'Only JPEG images are allowed!'
//     return cb(new Error('Only JPEG images are allowed!'), false)
//   }
//   cb(null, true)
// }

// const singleImage = multer({
// //   fileFilter: imageFilter,
//   storage: multer.memoryStorage(),
// }).single('image')

var uploads = multer({ storage: multer.memoryStorage() });

var uploadMultiple = uploads.fields([{ name: 'file1', maxCount: 10 }, { name: 'file2', maxCount: 10 },{ name: 'file3', maxCount: 10 },{ name: 'file4', maxCount: 10 },{ name: 'file5', maxCount: 10 }])

const upload = (req, res, next) => {
  uploadMultiple(req, res, (err) => {
    if (req.fileValidationError) {
      req.uploadError = req.fileValidationError
    } else if (!req.files) {
      req.uploadError = 'file not found'
    } else if (err instanceof multer.MulterError) {
      req.uploadError = err.message
    } else if (err) {
      req.uploadError = err.message || err
    }
    next()
  })
}

module.exports = upload
