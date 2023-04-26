import { Router } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";

const router = Router();

//Settings Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/img"),
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
  },
});

const upload = multer({
  storage: storage,
  dest: path.join(__dirname, "../public/img"),
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: El archivo debe ser una imagen valida");
  },
}).single("image");

router.post("/upload", upload, (req, res) => {
  console.log(req.file);
  res.send("Upload");
});

export default router;
