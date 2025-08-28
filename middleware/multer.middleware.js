import multer from "multer";
import path from 'path';
import { ApiError } from "../utils/ApiError.js"

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|tiff|bmp|webp|pdf|doc|docx|txt/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else { 
    return cb({error:`Only ${allowedTypes} image files are allowed!`}, false);   
  }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      const now=new Date()
      
      cb(null, file.originalname+"_"+Number(now))
    }
  })
  
export const upload = multer({ 
    storage, 
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter 
})



const  uploadSingle=(file)=> (req, res,next) => {
  
  upload.single(file)(req, res, (err) => {
    if (err) {
      console.log("single image error---->",err)
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json(new ApiError( 400, 'File size exceeds the 1MB limit!' ));
      }
      if (err.error === 'Only /jpeg|jpg|png|gif|tiff|bmp|webp/ image files are allowed!') {
        return res.status(400).json(new ApiError( 400, 'Only jpeg, jpg, png, gif, tiff, bmp, webp image files are allowed!'));
      }
      console.log("error in multer single upload", err)
      return res.status(400).json(new ApiError(400,'An error occurred during file upload.'));
    }
   next()
  });
}

const uploadMultiple=(file)=> (req, res,next) => {

  upload.array(file)(req, res, (err) => {
    if (err) {
      console.log("multipal image error---->",err)
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json(new ApiError( 400, 'File size exceeds the 1MB limit!'));
      }
      if (err.error === 'Only /jpeg|jpg|png|gif|tiff|bmp|webp/ image files are allowed!') {
        return res.status(400).json(new ApiError( 400, 'Only jpeg, jpg, png, gif, tiff, bmp, webp image files are allowed!' ));
      }
      console.log("error in multer multiple upload", err)
      return res.status(400).json(new ApiError(400,'An error occurred during file upload.'));
    }
    next()
  });
}

const uploadFields=(files)=> (req, res,next) => {
  
  console.log("file-----",files);
  upload.fields(files)(req, res, (err) => {
    if (err) {
      console.log("multipal field image error---->",err)
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json(new ApiError( 400, 'File size exceeds the 1MB limit!'));
      }
      if (err.error === 'Only /jpeg|jpg|png|gif|tiff|bmp|webp|pdf|doc|docx|txt/  files are allowed!') {
        return res.status(400).json(new ApiError( 400, 'Only jpeg, jpg, png, gif, tiff, bmp, webp pdf doc docx txt files are allowed!' ));
      }
      console.log("error in multiple field image upload", err)
      return res.status(400).json(new ApiError(400,'An error occurred during file upload.'));
    }
    next()
  });
}


const uploadAny = () => (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      console.log("any file upload error ---->", err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json(new ApiError(400, 'File size exceeds the 1MB limit!'));
      }
      return res.status(400).json(new ApiError(400, 'An error occurred during file upload.'));
    }
    next();
  });
};




export default {uploadSingle,uploadMultiple,uploadFields,uploadAny}