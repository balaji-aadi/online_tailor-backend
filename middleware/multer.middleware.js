// multer.middleware.js
import multer from "multer";
import path from "path";
import { ApiError } from "../utils/ApiError.js";

const allowedTypes = /jpeg|jpg|png|gif|tiff|bmp|webp|pdf|doc|docx|txt/;

const fileFilter = (req, file, cb) => {
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb({ error: `Only ${allowedTypes} files are allowed!` }, false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const now = Date.now();
    cb(null, `${file.fieldname}_${now}_${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB limit
  fileFilter,
});

// ---------- Helpers ----------
const uploadSingle = (file) => (req, res, next) => {
  console.log("single file upload middleware",req.body);
  upload.single(file)(req, res, (err) => handleError(err, res, next, "single"));
};

const uploadMultiple = (file) => (req, res, next) => {
  upload.array(file)(req, res, (err) => handleError(err, res, next, "multiple"));
};

const uploadFields = (files) => (req, res, next) => {
  upload.fields(files)(req, res, (err) => handleError(err, res, next, "fields"));
};

const uploadAny = () => (req, res, next) => {
  upload.any()(req, res, (err) => handleError(err, res, next, "any"));
};

// ---------- Custom for User Registration ----------
const uploadUserFiles = () =>
  upload.fields([
    { name: "profilePicture", maxCount: 1 }, 
    { name: "emiratesId", maxCount: 5 },
    { name: "tradeLicense", maxCount: 5 },
    { name: "certificates", maxCount: 10 },
    { name: "portfolioImages", maxCount: 20 },
  ]);



// ---------- Error handler ----------
function handleError(err, res, next, type) {
  if (err) {
    console.log(`${type} upload error ---->`, err);
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json(new ApiError(400, "File size exceeds the 1MB limit!"));
    }
    if (err.error) {
      return res.status(400).json(new ApiError(400, err.error));
    }
    return res
      .status(400)
      .json(new ApiError(400, "An error occurred during file upload."));
  }
  next();
}

export default { uploadSingle, uploadMultiple, uploadFields, uploadAny, uploadUserFiles };
