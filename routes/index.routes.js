const express = require('express');
const upload = require('../config/multer.js');
const router = express.Router();
const fileModel = require('../models/files.models');
const authMiddleWare = require('../middlewares/auth');
const cloudinary = require('../config/cloudinary')

router.get('/home',  authMiddleWare , async(req,res)=>{
    // res.send("hello");

    const userFiles = await fileModel.find({user:req.user.userID});
    res.render('home',{files:userFiles});

   
})

router.post('/upload', authMiddleWare,upload.single('file'),async (req,res)=>{
    console.log("file of user",req.file);
    
    const newFile = await fileModel.create({
        path:req.file.path,
        originalname:req.file.originalname,
        user:req.user.userID,    
        publicId: req.file.filename
    })

    // console.log("public_id of ffile",newFile.public_id);
    res.json({newFile});
})

// router.get('/download/:path', authMiddleWare, async(req,res)=>{

//     const loggedInUser = req.user.userID;
//     const path = req.params.path;

//     const file = await fileModel.findOne({
//     user: req.user.userID,
//     path:path,
//   });

//   if (!file) return res.status(404).json({ message: 'File not found' });

//   const publicId = file.publicId;

//    const downloadUrl = cloudinary.url(publicId, {
//        resource_type: 'image', // since you're uploading images
//         secure: true,
//         flags: 'attachment'

//      });

    //  res.redirect(downloadUrl); // Redirect to the generated download URL

//   res.redirect(file.path); // now this should be a working Cloudinary URL  
// });

module.exports = router;