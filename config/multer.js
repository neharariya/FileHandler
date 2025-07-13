const cloudinary = require('./cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');
 
const app = express();
 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Drive',
    public_id: (req, file) => `file-${Date.now()}`,
  },
});
 
const upload = multer({ storage: storage });

module.exports = upload;